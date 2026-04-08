function Edge({ edgeId, direction, board, setBoard, selectedPiece, setSelectedPiece, inventory, setInventory }) {
  const isOccupied = board.edges.get(edgeId)?.occupied || false;

  const handleClick = () => {
    if (selectedPiece && !isOccupied) {
      // Place the piece (simplified: mark edge as occupied, remove from inventory)
      setBoard(prev => ({
        ...prev,
        edges: new Map(prev.edges).set(edgeId, { occupied: true, segmentId: selectedPiece, rotation: 0 }),
        placedPieces: new Set([...prev.placedPieces, selectedPiece])
      }));
      setInventory(prev => prev.filter(p => p !== selectedPiece));
      setSelectedPiece(null);
    }
  };

  return (
    <div 
      className={`edge ${direction} ${isOccupied ? 'occupied' : ''}`} 
      onClick={handleClick}
    />
  );
}

export default Edge;