import Edge from './Edge';

function Square({ row, col, board, setBoard, selectedPiece, setSelectedPiece, inventory, setInventory }) {
  // Define edges for this square (top, right, bottom, left)
  const edges = [
    { direction: 'top', edgeId: `h-${row}-${col}` }, // Horizontal edge above
    { direction: 'right', edgeId: `v-${row}-${col+1}` }, // Vertical edge to the right
    { direction: 'bottom', edgeId: `h-${row+1}-${col}` }, // Horizontal edge below
    { direction: 'left', edgeId: `v-${row}-${col}` } // Vertical edge to the left
  ];

  return (
    <div className="square">
      {edges.map(edge => (
        <Edge 
          key={edge.edgeId} 
          edgeId={edge.edgeId} 
          direction={edge.direction} 
          board={board} 
          setBoard={setBoard} 
          selectedPiece={selectedPiece} 
          setSelectedPiece={setSelectedPiece} 
          inventory={inventory} 
          setInventory={setInventory} 
        />
      ))}
    </div>
  );
}

export default Square;