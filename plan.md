## Plan: Digital Clock Number Grid Puzzle Game

**TL;DR**: Web-based puzzle game built with React 19 and Tailwind CSS, where players place 7-segment digital-clock number pieces (1-9: 1×2 vertical with rounded corners; 0: 1×1) in gaps between a 5×4 grid of squares. Goal: ≤2 square sides exposed globally (including outer sides) AND all puzzle pieces placed. Pieces rotate but don't flip; no overlaps or board overflow. Uses React components for UI, hooks for state, and Tailwind for styling.

### Core Components

- **Board**: 5×4 grid of squares with gaps between them (no edge gaps). 31 gap slots total: 16 horizontal (4 per row), 15 vertical (5 per column). Rendered as SVG in a React component.
- **Pieces**: Digits 0-9 as 7-segment shapes with rounded corners. 4 rotations each. Placed in gaps to cover square sides. Defined as React components with SVG paths.
- **Win Condition**: ≤2 square sides exposed globally (across all 20 squares, including outer sides) AND all puzzle pieces must be placed. Sides are tracked internally for logic.
- **Rules**: No piece overlap, no placement beyond board, rotate on click, drag to place (using React DnD or native events).

### Implementation Steps

1. **Set Up React App**: Initialize with React 19, Tailwind CSS, and dependencies (e.g., React DnD for drag-and-drop).
2. **Define Pieces**: Create React components for 7-segment digit shapes (0-9) with rounded corners, store 4 rotations each as SVG.
3. **Build Board**: Render 5×4 squares with 31 gap slots in a React component, map coordinates.
4. **Add Interaction**: Use React hooks for state; click to rotate piece, drag to place in gap, validate no overlap/bounds.
5. **Calculate Sides**: After placement, count exposed sides (uncovered by pieces in adjacent gaps) using state updates.
6. **Win Check**: If ≤2 sides exposed AND all pieces placed, show win message via React state/modal.
7. **Levels**: Create curated levels with pre-placed pieces and available ones, stored in state or JSON.
8. **UI Polish**: Add piece inventory, reset button using Tailwind classes.

### Files to Create (React Structure)

- `src/App.jsx`: Main app component with game state (useState for board, pieces, sides).
- `src/components/Board.jsx`: Renders the 5×4 grid and gaps.
- `src/components/Piece.jsx`: Renders individual digits with rotations.
- `src/components/Game.jsx`: Handles placement, validation, win logic.
- `src/data/levels.js`: Curated level definitions.
- `tailwind.config.js`: Tailwind configuration.
- `index.html`: Basic HTML entry point.

### Dependencies

- React 19
- Tailwind CSS
- React DnD (for drag-and-drop) or native browser events
- (Optional) Vite or Create React App for build setup

### Verification

- Pieces render with rounded corners and rotate correctly in React components.
- Drag-place works in gaps without overlap or overflow (test with React DnD).
- Win triggers only when ≤2 sides exposed AND all pieces are placed.
- All rules (no overlap, no board overflow) are enforced.

Ready to implement once you approve this updated plan?