import { useDrag } from "react-dnd";
import { NumberPiece } from "./NumberPiece.jsx";

export function PieceCard({ piece, count, rotation, onRotate }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "NUMBER_PIECE",
      item: { pieceId: piece.id, rotation },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [piece, rotation],
  );

  if (count <= 0) return null;

  return (
    <div
      ref={drag}
      className={`rounded-lg border p-2 m-1 cursor-pointer select-none bg-slate-700 ${isDragging ? "opacity-40" : "opacity-100"}`}
      style={{ width: 80, height: 80 }}
      onClick={() => onRotate(piece.id)}
      title="Drag to board. Click to rotate"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <NumberPiece pieceId={piece.id} rotation={rotation} size={50} />
        <div className="text-xs text-white/80 mt-1">x{count}</div>
      </div>
    </div>
  );
}
