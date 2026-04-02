const SEGMENTS = {
  0: ["A", "B", "C", "D", "E", "F"],
  1: ["B", "C"],
  2: ["A", "B", "G", "E", "D"],
  3: ["A", "B", "G", "C", "D"],
  4: ["F", "G", "B", "C"],
  5: ["A", "F", "G", "C", "D"],
  6: ["A", "F", "G", "E", "C", "D"],
  7: ["A", "B", "C"],
  8: ["A", "B", "C", "D", "E", "F", "G"],
  9: ["A", "B", "C", "D", "F", "G"],
};

const segmentDefs = {
  A: { x: 14, y: 6, w: 72, h: 14, rx: 7 },
  B: { x: 86, y: 18, w: 14, h: 72, rx: 7 },
  C: { x: 86, y: 98, w: 14, h: 72, rx: 7 },
  D: { x: 14, y: 170, w: 72, h: 14, rx: 7 },
  E: { x: 6, y: 98, w: 14, h: 72, rx: 7 },
  F: { x: 6, y: 18, w: 14, h: 72, rx: 7 },
  G: { x: 14, y: 90, w: 72, h: 14, rx: 7 },
};

export function NumberPiece({ pieceId, rotation = 0, size = 90 }) {
  const onSegments = SEGMENTS[pieceId] || [];
  const angle = rotation * 90;

  return (
    <svg
      viewBox="0 0 106 186"
      width={size}
      height={(size * 186) / 106}
      style={{ transform: `rotate(${angle}deg)`, transformOrigin: "center" }}
    >
      <rect
        x="0"
        y="0"
        width="106"
        height="186"
        rx="12"
        fill="rgba(0,0,0,0.25)"
      />
      <g opacity="0.75">
        {Object.entries(segmentDefs).map(([seg, { x, y, w, h, rx }]) => (
          <rect
            key={seg}
            x={x}
            y={y}
            width={w}
            height={h}
            rx={rx}
            fill={onSegments.includes(seg) ? "#0ea5e9" : "#1e293b"}
            stroke="#93c5fd"
            strokeWidth="2"
          />
        ))}
      </g>
    </svg>
  );
}
