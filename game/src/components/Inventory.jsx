function Inventory({ inventory, setSelectedPiece }) {
  return (
    <div className="inventory">
      {inventory.map(piece => (
        <div 
          key={piece} 
          className="piece-item" 
          onClick={() => setSelectedPiece(piece)}
        >
          {piece}
        </div>
      ))}
    </div>
  );
}

export default Inventory;