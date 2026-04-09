export const PIECE_WIDTH = 150;
export const PIECE_HEIGHT = 300;
export const PIECE_HEIGHT_SMALL = 150;
export const SEGMENT_LENGTH = 150;
export const SEGMENT_THICKNESS = 10;

export const pieceColors = {
  0: "#1f77b4",
  1: "#ff7f0e",
  2: "#2ca02c",
  3: "#d62728",
  4: "#9467bd",
  5: "#8c564b",
  6: "#e377c2",
  7: "#7f7f7f",
  8: "#bcbd22",
  9: "#17becf",
};

export const pieceDisplayShapes = {
  0: [
    { orientation: "horizontal", left: 0, top: 0 },
    { orientation: "horizontal", left: 0, top: 140 },
    { orientation: "vertical", left: 0, top: 0 },
    { orientation: "vertical", left: 140, top: 0 },
  ],
  1: [
    { orientation: "vertical", left: 140, top: 0 },
    { orientation: "vertical", left: 140, top: 150 },
  ],
  2: [
    { orientation: "horizontal", left: 0, top: 0 },
    { orientation: "vertical", left: 140, top: 0 },
    { orientation: "horizontal", left: 0, top: 145 },
    { orientation: "vertical", left: 0, top: 150 },
    { orientation: "horizontal", left: 0, top: 290 },
  ],
  3: [
    { orientation: "horizontal", left: 0, top: 0 },
    { orientation: "vertical", left: 140, top: 0 },
    { orientation: "horizontal", left: 0, top: 145 },
    { orientation: "vertical", left: 140, top: 150 },
    { orientation: "horizontal", left: 0, top: 290 },
  ],
  4: [
    { orientation: "vertical", left: 0, top: 0 },
    { orientation: "vertical", left: 140, top: 0 },
    { orientation: "horizontal", left: 0, top: 145 },
    { orientation: "vertical", left: 140, top: 150 },
  ],
  5: [
    { orientation: "horizontal", left: 0, top: 0 },
    { orientation: "vertical", left: 0, top: 0 },
    { orientation: "horizontal", left: 0, top: 145 },
    { orientation: "vertical", left: 140, top: 150 },
    { orientation: "horizontal", left: 0, top: 290 },
  ],
  6: [
    { orientation: "horizontal", left: 0, top: 0 },
    { orientation: "vertical", left: 0, top: 0 },
    { orientation: "horizontal", left: 0, top: 145 },
    { orientation: "vertical", left: 0, top: 150 },
    { orientation: "vertical", left: 140, top: 150 },
    { orientation: "horizontal", left: 0, top: 290 },
  ],
  7: [
    { orientation: "horizontal", left: 0, top: 0 },
    { orientation: "vertical", left: 140, top: 0 },
    { orientation: "vertical", left: 140, top: 150 },
  ],
  8: [
    { orientation: "horizontal", left: 0, top: 0 },
    { orientation: "vertical", left: 0, top: 0 },
    { orientation: "vertical", left: 140, top: 0 },
    { orientation: "horizontal", left: 0, top: 145 },
    { orientation: "vertical", left: 0, top: 150 },
    { orientation: "vertical", left: 140, top: 150 },
    { orientation: "horizontal", left: 0, top: 290 },
  ],
  9: [
    { orientation: "horizontal", left: 0, top: 0 },
    { orientation: "vertical", left: 0, top: 0 },
    { orientation: "vertical", left: 140, top: 0 },
    { orientation: "horizontal", left: 0, top: 145 },
    { orientation: "vertical", left: 140, top: 150 },
    { orientation: "horizontal", left: 0, top: 290 },
  ],
};

export const piecePlacementPatterns = {
  0: [
    { type: "horizontal", row: 0, col: 0 },
    { type: "horizontal", row: 1, col: 0 },
    { type: "vertical", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 1 },
  ],
  1: [
    { type: "vertical", row: 0, col: 0 },
    { type: "vertical", row: 1, col: 0 },
  ],
  2: [
    { type: "horizontal", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 1 },
    { type: "horizontal", row: 1, col: 0 },
    { type: "vertical", row: 1, col: 0 },
    { type: "horizontal", row: 2, col: 0 },
  ],
  3: [
    { type: "horizontal", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 1 },
    { type: "horizontal", row: 1, col: 0 },
    { type: "vertical", row: 1, col: 1 },
    { type: "horizontal", row: 2, col: 0 },
  ],
  4: [
    { type: "vertical", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 1 },
    { type: "horizontal", row: 1, col: 0 },
    { type: "vertical", row: 1, col: 1 },
  ],
  5: [
    { type: "horizontal", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 0 },
    { type: "horizontal", row: 1, col: 0 },
    { type: "vertical", row: 1, col: 1 },
    { type: "horizontal", row: 2, col: 0 },
  ],
  6: [
    { type: "horizontal", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 0 },
    { type: "horizontal", row: 1, col: 0 },
    { type: "vertical", row: 1, col: 0 },
    { type: "vertical", row: 1, col: 1 },
    { type: "horizontal", row: 2, col: 0 },
  ],
  7: [
    { type: "horizontal", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 1 },
    { type: "vertical", row: 1, col: 1 },
  ],
  8: [
    { type: "horizontal", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 1 },
    { type: "horizontal", row: 1, col: 0 },
    { type: "vertical", row: 1, col: 0 },
    { type: "vertical", row: 1, col: 1 },
    { type: "horizontal", row: 2, col: 0 },
  ],
  9: [
    { type: "horizontal", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 0 },
    { type: "vertical", row: 0, col: 1 },
    { type: "horizontal", row: 1, col: 0 },
    { type: "vertical", row: 1, col: 1 },
    { type: "horizontal", row: 2, col: 0 },
  ],
};

export const getEdgeId = (type, row, col) => {
  if (type === "horizontal") {
    if (row === -1) return `h-top-${col}`;
    if (row === 3) return `h-bottom-${col}`;
    if (row >= 0 && row <= 2 && col >= 0 && col <= 4) return `h-${row}-${col}`;
    return null;
  }

  if (type === "vertical") {
    if (col === -1 && row >= 0 && row <= 3) return `v-left-${row}`;
    if (col === 4 && row >= 0 && row <= 3) return `v-right-${row}`;
    if (col >= 0 && col <= 3 && row >= 0 && row <= 3) return `v-${col}-${row}`;
    return null;
  }

  return null;
};

export const getPlacementEdges = (piece, anchorType, anchorRow, anchorCol) => {
  const pattern = piecePlacementPatterns[piece];
  if (!pattern) return null;
  const firstSegment = pattern[0];
  if (firstSegment.type !== anchorType) return null;

  const edgeIds = pattern.map((segment) => {
    const row = anchorRow + segment.row;
    const col = anchorCol + segment.col;
    return getEdgeId(segment.type, row, col);
  });

  if (edgeIds.some((id) => !id)) return null;
  return edgeIds;
};
