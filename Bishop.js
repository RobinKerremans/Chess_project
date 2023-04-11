class Bishop {
  constructor(color) {
    this.color = color;
    this.hasMoved = false;
    this.element = document.createElement('div');
    this.element.classList.add('square', 'bishop');
    this.element.piece = this;
    this.element.style.backgroundImage = `url('./bishop-${color}.png')`;
  }

  isValidMove(selectedPiece, targetSquare) {
    const currentCol = parseInt(selectedPiece.parentNode.dataset.col);
    const currentRow = parseInt(selectedPiece.parentNode.dataset.row);

    const targetCol = parseInt(targetSquare.dataset.col);
    const targetRow = parseInt(targetSquare.dataset.row);

    // Check if bishop is moving diagonally
    if (Math.abs(currentCol-targetCol) !== Math.abs(currentRow-targetRow)) {
      return false;
    }

    // Check if a piece is in the way

      // Determine the direction of the diagonal path
      const rowDir = targetRow > currentRow ? 1 : -1;
      const colDir = targetCol > currentCol ? 1 : -1;

      // Check all squares diagonally between the current and target squares
      let row = currentRow + rowDir;
      let col = currentCol + colDir;
      while (row !== targetRow && col !== targetCol) {
        const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (square && square.children.length > 0) {
          // A piece is blocking the diagonal path
          return false;
        }
        row += rowDir;
        col += colDir;
      }
      // No piece is blocking the diagonal path
    return true;
  }

  isValidCapture(selectedPiece, targetPiece) {

    const currentCol = parseInt(selectedPiece.parentNode.dataset.col);
    const currentRow = parseInt(selectedPiece.parentNode.dataset.row);

    const targetCol = parseInt(targetPiece.parentNode.dataset.col);
    const targetRow = parseInt(targetPiece.parentNode.dataset.row);

    // correct color
    if(selectedPiece.piece.color == targetPiece.piece.color){
      return false;
    }

    // Check if bishop is moving diagonally
    if (Math.abs(currentCol-targetCol) !== Math.abs(currentRow-targetRow)) {
      return false;
    }
    // Check if a piece is in the way

      // Determine the direction of the diagonal path
      const rowDir = targetRow > currentRow ? 1 : -1;
      const colDir = targetCol > currentCol ? 1 : -1;

      // Check all squares diagonally between the current and target squares
      let row = currentRow + rowDir;
      let col = currentCol + colDir;
      while (row !== targetRow && col !== targetCol) {
        const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (square && square.children.length > 0) {
          // A piece is blocking the diagonal path
          return false;
        }
        row += rowDir;
        col += colDir;
      }
      // No piece is blocking the diagonal path
    return true;
  }
}
