import { useDrop } from "react-dnd";

export function Slot({ slot, occupied, onDrop }) {
  const [{ isOver, canDrop, item }, drop] = useDrop(
    () => ({
      accept: "NUMBER_PIECE",
      drop: (dropped) => onDrop(dropped.pieceId, slot.id, dropped.rotation),
      canDrop: () => !occupied,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
        item: monitor.getItem(),
      }),
    }),
    [slot, occupied, onDrop],
  );

  const outlineClass = occupied
    ? "border-emerald-300"
    : isOver && canDrop
      ? "border-blue-300"
      : "border-slate-300";

  const detail = isOver && canDrop && item ? item.pieceId : null;

  // Size based on slot type
  let width = 16; // gap width
  let height = 80; // square height
  if (
    slot.type.startsWith("v") ||
    slot.type.startsWith("ol") ||
    slot.type.startsWith("or")
  ) {
    width = 80;
    height = 16;
  }

  return (
    <div
      ref={drop}
      className={`absolute flex items-center justify-center ${outlineClass} border-2 rounded-lg bg-slate-800/40`}
      style={{
        left: slot.left - width / 2 + 8, // adjust to center
        top: slot.top - height / 2 + 8,
        width,
        height,
      }}
      title={slot.id}
    >
      {detail && (
        <span
          className="text-xs text-white font-bold"
          style={{ transform: `rotate(${item.rotation * 90}deg)` }}
        >
          {detail}
        </span>
      )}
    </div>
  );
}
