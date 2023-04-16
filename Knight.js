class Knight {
  constructor(color) {
    this.color = color;
    this.hasMoved = false;
    this.element = document.createElement('div');
    this.element.classList.add('square', 'knight', `${color}-knight`);
    this.element.piece = this;
    this.element.style.backgroundImage = `url('./knight-${color}.png')`;
  }

  isValidMove(selectedPiece, targetSquare) {
    const currentCol = parseInt(selectedPiece.parentNode.dataset.col);
    const currentRow = parseInt(selectedPiece.parentNode.dataset.row);
    const targetCol = parseInt(targetSquare.dataset.col);
    const targetRow = parseInt(targetSquare.dataset.row);

    const rowDiff = Math.abs(currentRow - targetRow);
    const colDiff = Math.abs(currentCol - targetCol);

    // Check if the move is an L-shape: two squares in one direction and one square perpendicular to that direction
    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      // The move is valid
      return true;
    }

    // If the move is not an L-shape, it is not valid
    return false;
  }


  isValidCapture(selectedPiece, targetPiece) {

    const currentCol = parseInt(selectedPiece.parentNode.dataset.col);
    const currentRow = parseInt(selectedPiece.parentNode.dataset.row);
    const targetCol = parseInt(targetPiece.parentNode.dataset.col);
    const targetRow = parseInt(targetPiece.parentNode.dataset.row);

    const rowDiff = Math.abs(currentRow - targetRow);
    const colDiff = Math.abs(currentCol - targetCol);

    // correct color
    if(selectedPiece.piece.color == targetPiece.piece.color){
      return false;
    }

    // Check if the move is an L-shape: two squares in one direction and one square perpendicular to that direction
    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      // The move is valid
      return true;
    }

    // If the move is not an L-shape, it is not valid
    return false;

  }

  getAttackSquares() {

    const row = parseInt(this.element.parentNode.dataset.row);
    const col = parseInt(this.element.parentNode.dataset.col);
    const possibleMoves = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];
    const attackSquares = [];

    possibleMoves.forEach(move => {
      const newRow = row + move[0];
      const newCol = col + move[1];
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const targetSquare = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
        if (targetSquare) {
          attackSquares.push(targetSquare);
        }
      }
    });

    return attackSquares;
  }
}
