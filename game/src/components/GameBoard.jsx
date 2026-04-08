import Square from './Square';

function GameBoard({ board, setBoard, selectedPiece, setSelectedPiece, inventory, setInventory }) {
  // Generate 5x4 grid of squares
  const squares = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      squares.push(
        <Square 
          key={`${row}-${col}`} 
          row={row} 
          col={col} 
          board={board} 
          setBoard={setBoard} 
          selectedPiece={selectedPiece} 
          setSelectedPiece={setSelectedPiece} 
          inventory={inventory} 
          setInventory={setInventory} 
        />
      );
    }
  }

  return (
    <div className="game-board">
      {squares}
    </div>
  );
}

export default GameBoard;