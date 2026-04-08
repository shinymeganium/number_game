import { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Inventory from './components/Inventory';
import './App.css'; // Add custom CSS later

function App() {
  // Basic state (expand as per data model in your plan)
  const [board, setBoard] = useState({
    edges: new Map(), // Map<edgeId, { occupied: boolean, segmentId: null, rotation: 0 }>
    squares: [], // Array of square objects
    placedPieces: new Set()
  });
  const [inventory, setInventory] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']); // Available pieces
  const [selectedPiece, setSelectedPiece] = useState(null); // For click-to-select

  return (
    <div className="app">
      <Header />
      <GameBoard 
        board={board} 
        setBoard={setBoard} 
        selectedPiece={selectedPiece} 
        setSelectedPiece={setSelectedPiece} 
        inventory={inventory} 
        setInventory={setInventory} 
      />
      <Inventory 
        inventory={inventory} 
        setSelectedPiece={setSelectedPiece} 
      />
    </div>
  );
}

export default App;