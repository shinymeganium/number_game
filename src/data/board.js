export const SQUARE_ROWS = 4;
export const SQUARE_COLS = 5;

export const cellSize = 80;
export const outerMargin = 20;

export const makeSlotId = (type, r, c) => `${type}-${r}-${c}`;

export function getSlotList() {
  const slots = [];

  // horizontal gaps: between columns (left-right edges between squares)
  for (let row = 0; row < SQUARE_ROWS; row += 1) {
    for (let col = 0; col < SQUARE_COLS - 1; col += 1) {
      slots.push({ id: makeSlotId("h", row, col), type: "h", row, col });
    }
  }

  // vertical gaps: between rows (top-bottom edges between squares)
  for (let row = 0; row < SQUARE_ROWS - 1; row += 1) {
    for (let col = 0; col < SQUARE_COLS; col += 1) {
      slots.push({ id: makeSlotId("v", row, col), type: "v", row, col });
    }
  }

  // outer edges
  for (let col = 0; col < SQUARE_COLS; col += 1) {
    slots.push({ id: `ot-${col}`, type: "ot", row: 0, col });
    slots.push({ id: `ob-${col}`, type: "ob", row: SQUARE_ROWS - 1, col });
  }
  for (let row = 0; row < SQUARE_ROWS; row += 1) {
    slots.push({ id: `ol-${row}`, type: "ol", row, col: 0 });
    slots.push({ id: `or-${row}`, type: "or", row, col: SQUARE_COLS - 1 });
  }

  return slots;
}

export function getSlotPosition(slot) {
  const half = cellSize / 2;
  const outerOffset = 10;

  if (slot.type === "h") {
    const x = slot.col * cellSize + cellSize;
    const y = slot.row * cellSize + half;
    return { left: x + outerMargin - 10, top: y + outerMargin - 10 };
  }

  if (slot.type === "v") {
    const x = slot.col * cellSize + half;
    const y = slot.row * cellSize + cellSize;
    return { left: x + outerMargin - 10, top: y + outerMargin - 10 };
  }

  if (slot.type === "ot") {
    const x = slot.col * cellSize + half;
    const y = 0;
    return { left: x + outerMargin - 10, top: y + outerMargin - 10 };
  }

  if (slot.type === "ob") {
    const x = slot.col * cellSize + half;
    const y = SQUARE_ROWS * cellSize;
    return { left: x + outerMargin - 10, top: y + outerMargin - 10 };
  }

  if (slot.type === "ol") {
    const x = 0;
    const y = slot.row * cellSize + half;
    return { left: x + outerMargin - 10, top: y + outerMargin - 10 };
  }

  if (slot.type === "or") {
    const x = SQUARE_COLS * cellSize;
    const y = slot.row * cellSize + half;
    return { left: x + outerMargin - 10, top: y + outerMargin - 10 };
  }

  return { left: 0, top: 0 };
}

export function getAdjacentSlotId(baseSlot, rotation) {
  const [kind, a, b] = baseSlot.split("-");
  const row = parseInt(a, 10);
  const col = parseInt(b, 10);

  const isHorizontalSlot = kind === "h" || kind === "ot" || kind === "ob";
  const isVerticalSlot = kind === "v" || kind === "ol" || kind === "or";

  // rotation: 0=down, 1=right, 2=up, 3=left
  if (isVerticalSlot) {
    if (rotation === 0 && row < SQUARE_ROWS - 2) {
      // row range 0..2 for v slots; second row+1 should exist
      return `${kind === "ol" || kind === "or" ? "v" : kind}-${row + 1}-${col}`;
    }
    if (rotation === 2 && row > 0) {
      return `${kind === "ol" || kind === "or" ? "v" : kind}-${row - 1}-${col}`;
    }
    return null;
  }

  if (isHorizontalSlot) {
    if (rotation === 1 && col < SQUARE_COLS - 2) {
      return `${kind === "ot" || kind === "ob" ? "h" : kind}-${row}-${col + 1}`;
    }
    if (rotation === 3 && col > 0) {
      return `${kind === "ot" || kind === "ob" ? "h" : kind}-${row}-${col - 1}`;
    }
    return null;
  }

  return null;
}

export function getSquareSideSlotId(row, col, side) {
  // side: 'top'|'bottom'|'left'|'right'
  if (side === "top") {
    if (row === 0) return `ot-${col}`;
    return `h-${row - 1}-${col}`;
  }
  if (side === "bottom") {
    if (row === SQUARE_ROWS - 1) return `ob-${col}`;
    return `h-${row}-${col}`;
  }
  if (side === "left") {
    if (col === 0) return `ol-${row}`;
    return `v-${row}-${col - 1}`;
  }
  if (side === "right") {
    if (col === SQUARE_COLS - 1) return `or-${row}`;
    return `v-${row}-${col}`;
  }
  return null;
}

export function countExposedSides(placedSet) {
  let count = 0;

  for (let row = 0; row < SQUARE_ROWS; row += 1) {
    for (let col = 0; col < SQUARE_COLS; col += 1) {
      const sides = ["top", "right", "bottom", "left"];
      sides.forEach((side) => {
        const slotId = getSquareSideSlotId(row, col, side);
        if (!placedSet.has(slotId)) count += 1;
      });
    }
  }

  return count;
}
