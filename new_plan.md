# Number Puzzle Game Plan – React Implementation

## Game Description

The game is a number puzzle game where players place 7-segment digit pieces (0-9) onto a game board. The game board is a 5×4 grid of equal-sized squares. Players place pieces on the edges (sides) shared between adjacent squares. A game is won when 2 or fewer square edges remain unoccupied.

## Board Model

- **Grid**: 5 columns × 4 rows = 20 squares
- **Edges**: Adjacent squares share edges
  - Horizontal shared edges: 5 cols × 3 inter-row gaps = 15 edges
  - Vertical shared edges: 4 inter-col gaps × 4 rows = 16 edges
  - Boundary edges: Outer perimeter of the grid
  - Total: ~60+ placeable edge slots
- **Edge state**: Each edge can be empty or occupied by one piece segment

## Game Pieces

- **Total**: 10 pieces (digits 0–9)
- **Shape**: 7-segment display format
  - Digits 1–9: 1×2 segments (occupy 2 adjacent edge slots when oriented)
  - Digit 0: 1×1 segment (single edge slot)
- **Rotations**: 4 rotations allowed (0°, 90°, 180°, 270°); no flipping

## Game Rules

1. 10 pieces total, one of each digit (0–9)
2. Players place pieces on square edges by dragging them onto the board
3. Pieces cannot overlap (each edge slot holds at most one segment)
4. Placed pieces are removed from the player inventory
5. Win condition: ≤2 unoccupied edges globally across the board
6. Players can undo placements and reset the current level

## Visual Presentation (React Components)

### Layout Structure
- **Header**: Title, undo button, reset button
- **Game Board Area**: Interactive grid displaying:
  - 20 squares (outlined or filled lightly)
  - All edge slots (highlighted when valid for placement)
  - Placed piece segments with visual feedback
- **Inventory/Footer**: 
  - List of remaining pieces (0–9)
  - Drag-from-inventory or click-to-select interaction
  - Piece rotation control (rotate button or keyboard shortcut)

### React Component Structure (Suggested)
- `<App />` — Main app state and layout
- `<Header />` — Title, undo/reset buttons
- `<GameBoard />` — Board grid and edge rendering
- `<Square />` — Individual square component (container for edges)
- `<Edge />` — Individual edge slot (handles drop/placement)
- `<PieceSegment />` — Visual representation of a placed segment
- `<Inventory />` — List of available pieces
- `<PieceItem />` — Draggable piece in inventory

## Data Model

### Board State
board = [
edges: Map<edgeId, { occupied: boolean, segmentId: null | string, rotation: 0-3 }>,
squares: Array<{ id, position: [row, col], edges: [top, right, bottom, left] }>,
placedPieces: Set<pieceId>
]


### Piece State

piece = {
id: "0" | "1" | ... | "9",
segments: Array<segmentCoord>, // relative coordinates of 7-segment parts
rotation: 0 | 90 | 180 | 270,
position: edgeId | null // null if in inventory
}


### Edge Occupancy
- Each edge is a unique slot between two squares (or on the boundary)
- One piece segment occupies exactly one edge
- Overlapping segments are invalid

## Implementation Phases

### Phase 1: Foundation (React Setup & Board Rendering)
1. **Set up React project** with component structure
2. **Define board data model**: Create square and edge coordinate system
3. **Render board**: Display 20 squares and visualize all edge slots
   - *Parallel: Define piece geometry (7-segment shapes, rotations)*
4. **Render inventory**: Display all 10 pieces as draggable items
   - *Depends on: step 3*

### Phase 2: Interaction & Placement Logic
5. **Implement drag-and-drop**:
   - Drag piece from inventory onto edge
   - Snap to nearest valid edge
   - Preview placement with rotation preview
6. **Add collision detection**: Prevent overlapping segments
7. **Add rotation control**: Rotate piece before/after placement (keyboard or UI button)
8. **Track placed pieces**: Update board state and inventory when a piece is placed
9. **Calculate edge occupancy**: After each placement, count unoccupied edges and check win condition

### Phase 3: Game Flow & UX
10. **Implement undo**: Restore previous board state and inventory
11. **Implement reset**: Clear board and restore all pieces to inventory
12. **Add win/loss modal**: Display when ≤2 edges unoccupied
13. **Add visual feedback**: Highlight valid drop zones, show error states, animations on placement

## Verification Steps

1. **Board rendering**: Verify all 20 squares display correctly with visible edges
2. **Piece dragging**: Drag a piece from inventory and drop it on an edge; verify it snaps correctly
3. **Collision detection**: Try placing overlapping pieces; verify rejection with visual feedback
4. **Rotation**: Rotate a piece before/after placement; verify orientation changes
5. **Win condition**: Fill edges until ≤2 remain unoccupied; verify win modal appears
6. **Undo/reset**: Place pieces, undo, reset; verify board and inventory restore correctly

## Scope & Decisions

- **Included**: Single-puzzle mode with undo/reset, dragging, rotating, collision detection, win detection
- **Tech stack**: React 19, custom CSS (no CSS-in-JS or tailwind for now)
- **Edge model**: Edges are the primary game mechanic, not the squares themselves
- **Piece representation**: 7-segment digits stored as coordinate arrays, rendered as SVG or div-based shapes

## Critical Questions

1. **Visual style**: Should edges be visualized as lines, thin rectangles, or cells? 
   - *Recommendation*: Thin rectangles between squares, colored when occupied
2. **Piece rendering**: SVG paths for 7-segment or div-based blocks?
   - *Recommendation*: SVG for scalability and rotation ease
3. **Drag interaction**: Click-to-select + click-to-place, or true drag-and-drop?
   - *Recommendation*: True drag-and-drop for intuitive gameplay

## Answers

1. The edges should be visualized as lines. The width of the lines
should not be < 1 px.
2. Render the pieces as SVG paths. Only render the needed segments;
do not render "empty" segments, only the segments that form the number.
This should make it easier to check which edges are occupied.
3. For the first implementation let's use click-to-select. When a number is clicked
it sticks with the mouse pointer. Place mouse over edges and click an edge to place
number. Check if placing there is allowed. Implement rotating later.