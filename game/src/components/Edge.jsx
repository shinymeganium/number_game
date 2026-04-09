import { getPlacementEdges, pieceColors } from "../pieceDefinitions";

function Edge({
  edgeId,
  type,
  row,
  col,
  board,
  setBoard,
  selectedPiece,
  setSelectedPiece,
  inventory,
  setInventory,
}) {
  const edgeData = board.edges.get(edgeId);
  const isOccupied = edgeData?.occupied || false;

  const handleClick = () => {
    if (!selectedPiece || isOccupied) return;

    const placementEdges = getPlacementEdges(selectedPiece, type, row, col);
    if (!placementEdges) return;

    const occupiedConflict = placementEdges.some(
      (id) => board.edges.get(id)?.occupied,
    );
    if (occupiedConflict) return;

    setBoard((prev) => {
      const nextEdges = new Map(prev.edges);
      const color = pieceColors[selectedPiece] || "#000";

      placementEdges.forEach((id) => {
        nextEdges.set(id, {
          occupied: true,
          pieceId: selectedPiece,
          color,
        });
      });

      return {
        ...prev,
        edges: nextEdges,
        placedPieces: new Set([...prev.placedPieces, selectedPiece]),
      };
    });

    setInventory((prev) => prev.filter((p) => p !== selectedPiece));
    setSelectedPiece(null);
  };

  const style =
    type === "horizontal"
      ? {
          top:
            row === -1 ? "0px" : row === 3 ? "600px" : `${(row + 1) * 150}px`,
          left: `${col * 150}px`,
          width: "150px",
          height: "10px",
        }
      : {
          top: `${row * 150}px`,
          left:
            col === -1 ? "0px" : col === 4 ? "750px" : `${(col + 1) * 150}px`,
          width: "10px",
          height: "150px",
        };

  return (
    <div
      className={`edge ${type} ${isOccupied ? "occupied" : ""}`}
      style={{
        position: "absolute",
        ...style,
        background: edgeData?.color || "#000",
      }}
      onClick={handleClick}
    />
  );
}

export default Edge;
