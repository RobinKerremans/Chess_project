class Pawn {
  constructor(color) {
    this.color = color;
    this.hasMoved = false;
    this.element = document.createElement('div');
    this.element.classList.add('square', 'pawn', `${color}-enemy`);
    this.element.piece = this;
    this.element.style.backgroundImage = `url('./pawn-${color}.png')`;
  }

  isValidMove(currentSquare, targetSquare) {
    const currentCol = currentSquare[0];
    const currentRow = parseInt(currentSquare[1]);

    const targetCol = targetSquare[0];
    const targetRow = parseInt(targetSquare[1]);

    // Check if pawn is moving in the same column
    if (currentCol !== targetCol) {
      return false;
    }

    // Calculate the number of rows the pawn is moving
    const numRowsMoved = targetRow - currentRow;

    if (this.hasMoved) {
      // If the pawn has already moved, it can only move one square
      if (numRowsMoved !== 1) {
        return false;
      }
    } else {
      // If the pawn hasn't moved yet, it can move one or two squares
      if (numRowsMoved !== 1 && numRowsMoved !== 2) {
        return false;
      }
    }

    // Update the hasMoved flag
    this.hasMoved = true;

    return true;
  }
}
