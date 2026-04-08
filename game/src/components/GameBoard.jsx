import Square from "./Square";
import Edge from "./Edge";

function GameBoard({
  board,
  setBoard,
  selectedPiece,
  setSelectedPiece,
  inventory,
  setInventory,
}) {
  // Generate 5x4 grid of squares
  const squares = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      squares.push(<Square key={`${row}-${col}`} row={row} col={col} />);
    }
  }

  // Generate shared edges
  const edges = [];
  // Inner horizontal edges: between rows (3 gaps), each with 5 segments
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      edges.push(
        <Edge
          key={`h-${row}-${col}`}
          edgeId={`h-${row}-${col}`}
          type="horizontal"
          row={row}
          col={col}
          board={board}
          setBoard={setBoard}
          selectedPiece={selectedPiece}
          setSelectedPiece={setSelectedPiece}
          inventory={inventory}
          setInventory={setInventory}
        />,
      );
    }
  }
  // Inner vertical edges: between columns (4 gaps), each with 4 segments
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      edges.push(
        <Edge
          key={`v-${col}-${row}`}
          edgeId={`v-${col}-${row}`}
          type="vertical"
          row={row}
          col={col}
          board={board}
          setBoard={setBoard}
          selectedPiece={selectedPiece}
          setSelectedPiece={setSelectedPiece}
          inventory={inventory}
          setInventory={setInventory}
        />,
      );
    }
  }

  // Outer horizontal edges: top and bottom
  for (let col = 0; col < 5; col++) {
    // Top outer
    edges.push(
      <Edge
        key={`h-top-${col}`}
        edgeId={`h-top-${col}`}
        type="horizontal"
        row={-1}
        col={col}
        board={board}
        setBoard={setBoard}
        selectedPiece={selectedPiece}
        setSelectedPiece={setSelectedPiece}
        inventory={inventory}
        setInventory={setInventory}
      />,
    );
    // Bottom outer
    edges.push(
      <Edge
        key={`h-bottom-${col}`}
        edgeId={`h-bottom-${col}`}
        type="horizontal"
        row={3}
        col={col}
        board={board}
        setBoard={setBoard}
        selectedPiece={selectedPiece}
        setSelectedPiece={setSelectedPiece}
        inventory={inventory}
        setInventory={setInventory}
      />,
    );
  }

  // Outer vertical edges: left and right
  for (let row = 0; row < 4; row++) {
    // Left outer
    edges.push(
      <Edge
        key={`v-left-${row}`}
        edgeId={`v-left-${row}`}
        type="vertical"
        row={row}
        col={-1}
        board={board}
        setBoard={setBoard}
        selectedPiece={selectedPiece}
        setSelectedPiece={setSelectedPiece}
        inventory={inventory}
        setInventory={setInventory}
      />,
    );
    // Right outer
    edges.push(
      <Edge
        key={`v-right-${row}`}
        edgeId={`v-right-${row}`}
        type="vertical"
        row={row}
        col={4}
        board={board}
        setBoard={setBoard}
        selectedPiece={selectedPiece}
        setSelectedPiece={setSelectedPiece}
        inventory={inventory}
        setInventory={setInventory}
      />,
    );
  }

  return (
    <div className="game-board">
      {squares}
      {edges}
    </div>
  );
}

export default GameBoard;
