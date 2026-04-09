import PieceItem from "./PieceItem";

function Inventory({ inventory, selectedPiece, setSelectedPiece }) {
  return (
    <div className="inventory">
      {inventory.map((piece) => (
        <PieceItem
          key={piece}
          piece={piece}
          selected={selectedPiece === piece}
          onSelect={setSelectedPiece}
        />
      ))}
    </div>
  );
}

export default Inventory;
