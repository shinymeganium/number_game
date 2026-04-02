import React, { useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { allPieces, initialInventory } from "./data/pieces.js";
import {
  getSlotList,
  getSlotPosition,
  getAdjacentSlotId,
  countExposedSides,
} from "./data/board.js";
import { PieceCard } from "./components/PieceCard.jsx";
import { Slot } from "./components/Slot.jsx";
import { NumberPiece } from "./components/NumberPiece.jsx";

function App() {
  const slots = useMemo(
    () => getSlotList().map((slot) => ({ ...slot, ...getSlotPosition(slot) })),
    [],
  );

  const initialPlacedMap = {
    "v-0-2": { pieceId: "1", rotation: 0, root: true, pairId: "v-1-2" },
    "v-1-2": { pieceId: "1", rotation: 0, root: false, pairId: "v-0-2" },
    "h-2-2": { pieceId: "2", rotation: 1, root: true, pairId: "h-2-3" },
    "h-2-3": { pieceId: "2", rotation: 1, root: false, pairId: "h-2-2" },
  };

  const [inventory, setInventory] = useState({
    ...initialInventory,
    1: (initialInventory[1] || 0) - 1,
    2: (initialInventory[2] || 0) - 1,
  });
  const [placedMap, setPlacedMap] = useState(initialPlacedMap);
  const [rotationByPiece, setRotationByPiece] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  });
  const [message, setMessage] = useState(
    "Drag digit to a slot to place. Double-click piece to rotate.",
  );

  const isAllPiecesPlaced = Object.values(inventory).every(
    (count) => count === 0,
  );
  const exposed = countExposedSides(new Set(Object.keys(placedMap)));
  const hasWon = isAllPiecesPlaced && exposed <= 2;

  function rotatePiece(pieceId) {
    setRotationByPiece((prev) => ({
      ...prev,
      [pieceId]: (prev[pieceId] + 1) % 4,
    }));
  }

  function canPlace(pieceId, slotId, rotation) {
    if (!inventory[pieceId] || inventory[pieceId] <= 0) {
      setMessage("No more pieces of that type available.");
      return false;
    }
    if (placedMap[slotId]) {
      setMessage("Slot already occupied.");
      return false;
    }

    if (pieceId === "0") {
      return true;
    }

    const second = getAdjacentSlotId(slotId, rotation);
    if (!second) {
      setMessage("Invalid placement or edge of board for this rotation.");
      return false;
    }
    if (placedMap[second]) {
      setMessage("Second slot is occupied; cannot place piece here.");
      return false;
    }

    return true;
  }

  function resetGame() {
    setInventory({
      ...initialInventory,
      1: (initialInventory[1] || 0) - 1,
      2: (initialInventory[2] || 0) - 1,
    });
    setPlacedMap(initialPlacedMap);
    setMessage("Game has been reset.");
  }

  function rotatePlacedPiece(slotId) {
    const placement = placedMap[slotId];
    if (!placement || !placement.root) return;

    const newRotation = (placement.rotation + 1) % 4;
    const pieceId = placement.pieceId;

    // Check if new rotation is possible
    const newPlaced = { ...placedMap };
    delete newPlaced[slotId];
    if (placement.pairId) delete newPlaced[placement.pairId];

    // Try to place with new rotation
    if (pieceId === "0") {
      if (!newPlaced[slotId]) {
        newPlaced[slotId] = {
          pieceId,
          rotation: newRotation,
          root: true,
          pairId: null,
        };
        setPlacedMap(newPlaced);
        setMessage(`Rotated ${pieceId} to ${newRotation * 90}°.`);
      } else {
        setMessage("Cannot rotate; slot occupied.");
      }
    } else {
      const second = getAdjacentSlotId(slotId, newRotation);
      if (!second || newPlaced[second]) {
        setMessage("Cannot rotate; invalid position or occupied.");
        return;
      }
      newPlaced[slotId] = {
        pieceId,
        rotation: newRotation,
        root: true,
        pairId: second,
      };
      newPlaced[second] = {
        pieceId,
        rotation: newRotation,
        root: false,
        pairId: slotId,
      };
      setPlacedMap(newPlaced);
      setMessage(`Rotated ${pieceId} to ${newRotation * 90}°.`);
    }
  }

  function removePlacedPiece(slotId) {
    if (!placedMap[slotId]) {
      setMessage("No piece to remove at that slot.");
      return;
    }

    const placement = placedMap[slotId];
    const rootSlot = placement.root ? slotId : placement.pairId;
    const rootPlacement = placedMap[rootSlot];

    if (!rootPlacement) return;

    const newMap = { ...placedMap };
    const releasePieceId = rootPlacement.pieceId;

    if (rootPlacement.pairId) {
      delete newMap[rootPlacement.pairId];
    }
    delete newMap[rootSlot];

    setPlacedMap(newMap);
    setInventory((prev) => ({
      ...prev,
      [releasePieceId]: (prev[releasePieceId] || 0) + 1,
    }));
    setMessage(`Removed ${releasePieceId}; returned to inventory.`);
  }

  function placePiece(pieceId, slotId, rotation) {
    if (!canPlace(pieceId, slotId, rotation)) return;

    const newPlaced = { ...placedMap };

    if (pieceId === "0") {
      newPlaced[slotId] = { pieceId, rotation, root: true, pairId: null };
    } else {
      const s2 = getAdjacentSlotId(slotId, rotation);
      if (!s2) {
        return;
      }
      newPlaced[slotId] = { pieceId, rotation, root: true, pairId: s2 };
      newPlaced[s2] = { pieceId, rotation, root: false, pairId: slotId };
    }

    setPlacedMap(newPlaced);
    setInventory((prev) => ({ ...prev, [pieceId]: (prev[pieceId] || 0) - 1 }));
    setMessage(`Placed ${pieceId} at ${slotId}.`);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-900 text-slate-100 p-4 flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Number Grid Puzzle</h1>
          <div className="space-x-2 flex items-center">
            <div className="text-sm text-slate-300">
              Exposed sides: <strong>{exposed}</strong> | Pieces left:{" "}
              <strong>
                {Object.values(inventory).reduce((a, b) => a + b, 0)}
              </strong>
            </div>
            <button
              type="button"
              onClick={resetGame}
              className="rounded-md bg-slate-700 px-3 py-1 text-sm hover:bg-slate-600"
            >
              Reset
            </button>
          </div>
        </header>

        {hasWon && (
          <div className="rounded-lg bg-emerald-700 px-4 py-3 text-white font-bold">
            Victory! All pieces placed and 2 or fewer sides exposed.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          <aside className="rounded-lg border border-slate-700 p-3 bg-slate-800">
            <h2 className="font-semibold mb-2">Piece Inventory</h2>
            <div className="grid grid-cols-2 gap-2">
              {allPieces.map((piece) => (
                <PieceCard
                  key={piece.id}
                  piece={piece}
                  count={inventory[piece.id] || 0}
                  rotation={rotationByPiece[piece.id] || 0}
                  onRotate={rotatePiece}
                />
              ))}
            </div>
            <div className="mt-3 text-sm text-slate-300">
              Instruction: Drag digit onto a slot around the board. Click a
              palette tile to rotate. Left click placed piece to rotate. Right
              click placed piece to remove.
            </div>
          </aside>

          <main
            className="relative bg-slate-800 p-4 rounded-lg"
            style={{
              width: 5 * 80 + 2 * 20 + 40,
              height: 4 * 80 + 2 * 20 + 40,
            }}
          >
            <div className="absolute inset-4">
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${5}, 80px)`,
                  gridTemplateRows: `repeat(${4}, 80px)`,
                }}
              >
                {Array.from({ length: 4 }).map((_, r) =>
                  Array.from({ length: 5 }).map((_, c) => (
                    <div
                      key={`${r}-${c}`}
                      className="bg-slate-600 border border-slate-500 rounded-sm"
                      style={{ width: 80, height: 80 }}
                    />
                  )),
                )}
              </div>
            </div>

            {slots.map((slot) => (
              <Slot
                key={slot.id}
                slot={slot}
                occupied={!!placedMap[slot.id]}
                onDrop={(pieceId) =>
                  placePiece(pieceId, slot.id, rotationByPiece[pieceId] || 0)
                }
              />
            ))}

            {Object.entries(placedMap)
              .filter(([_, placement]) => placement.root)
              .map(([slotId, placement]) => {
                const slot = slots.find((s) => s.id === slotId);
                if (!slot) return null;

                let width = 40;
                let height = 40;
                let centerX = slot.left + 5;
                let centerY = slot.top + 5;

                if (placement.pieceId !== "0") {
                  const pairId = placement.pairId;
                  const partner = slots.find((s) => s.id === pairId);
                  if (partner) {
                    if (placement.rotation % 2 === 0) {
                      // vertical
                      width = 40;
                      height = 90;
                    } else {
                      // horizontal
                      width = 90;
                      height = 40;
                    }

                    centerX = (slot.left + partner.left) / 2 + 5;
                    centerY = (slot.top + partner.top) / 2 + 5;
                  }
                } else {
                  // 0 is 1x1, ensure square
                  width = 40;
                  height = 40;
                }

                return (
                  <div
                    key={`placed-${slotId}`}
                    className="absolute cursor-pointer"
                    onClick={() => rotatePlacedPiece(slotId)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      removePlacedPiece(slotId);
                    }}
                    style={{
                      left: centerX - width / 2,
                      top: centerY - height / 2,
                      width,
                      height,
                    }}
                    title="Left click to rotate. Right click to remove."
                  >
                    <NumberPiece
                      pieceId={placement.pieceId}
                      rotation={placement.rotation}
                      size={Math.max(width, height)}
                    />
                  </div>
                );
              })}
          </main>
        </div>

        <div className="rounded-lg p-2 bg-slate-800 text-slate-300">
          {message}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
