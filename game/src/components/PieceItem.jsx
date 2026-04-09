import {
  PIECE_WIDTH,
  PIECE_HEIGHT,
  PIECE_HEIGHT_SMALL,
  SEGMENT_LENGTH,
  SEGMENT_THICKNESS,
  pieceColors,
  pieceDisplayShapes,
} from "../pieceDefinitions";

function PieceItem({ piece, onSelect, selected }) {
  const segments = pieceDisplayShapes[piece] || [];
  const figureHeight = piece === "0" ? PIECE_HEIGHT_SMALL : PIECE_HEIGHT;

  return (
    <button
      type="button"
      className={`piece-item ${selected ? "selected" : ""}`}
      onClick={() => onSelect(piece)}
    >
      <div
        className="piece-figure"
        style={{ width: `${PIECE_WIDTH}px`, height: `${figureHeight}px` }}
      >
        {segments.map((segment, index) => {
          const segmentStyle = {
            position: "absolute",
            background: pieceColors[piece] || "#111",
            borderRadius: "4px",
            ...(segment.orientation === "horizontal"
              ? {
                  width: `${SEGMENT_LENGTH}px`,
                  height: `${SEGMENT_THICKNESS}px`,
                }
              : {
                  width: `${SEGMENT_THICKNESS}px`,
                  height: `${SEGMENT_LENGTH}px`,
                }),
            left: `${segment.left}px`,
            top: `${segment.top}px`,
          };

          return <div key={index} style={segmentStyle} />;
        })}
      </div>
    </button>
  );
}

export default PieceItem;
