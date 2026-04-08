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
  const isOccupied = board.edges.get(edgeId)?.occupied || false;

  const handleClick = () => {
    if (selectedPiece && !isOccupied) {
      // Place the piece (simplified: mark edge as occupied, remove from inventory)
      setBoard((prev) => ({
        ...prev,
        edges: new Map(prev.edges).set(edgeId, {
          occupied: true,
          segmentId: selectedPiece,
          rotation: 0,
        }),
        placedPieces: new Set([...prev.placedPieces, selectedPiece]),
      }));
      setInventory((prev) => prev.filter((p) => p !== selectedPiece));
      setSelectedPiece(null);
    }
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
      style={{ position: "absolute", ...style }}
      onClick={handleClick}
    />
  );
}

export default Edge;
