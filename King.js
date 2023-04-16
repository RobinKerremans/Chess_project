class King {
  constructor(color) {
    this.color = color;
    this.hasMoved = false;
    this.element = document.createElement('div');
    this.element.classList.add('square', 'king',`${color}-enemy`);
    this.element.piece = this;
    this.element.style.backgroundImage = `url('./king-${color}.png')`;
  }

  isValidMove(piece, square) {
    // Check if target square is threatened by an enemy

    let enemyPieces;
    if(piece.piece.color == 'white'){
      if(square.classList.contains('black-enemy')){
        return false;
      }
      enemyPieces = document.querySelectorAll('.black-bishop');
    }
    if(piece.piece.color == 'black'){
      if(square.classList.contains('white-enemy')){
        return false;
      }
      enemyPieces = document.querySelectorAll('.white-knight');
    }
    const threatenedSquares = new Set();

    for (const enemy of enemyPieces) {
      const enemyPiece = enemy.piece;
      const attackSquares = enemyPiece.getAttackSquares();

      for (const square of attackSquares) {
        threatenedSquares.add(square);
      }
    }
    if (threatenedSquares.has(square)) {
      return false;
    }

    // Check if target square is within one square of the king
    const currentRow = parseInt(piece.parentNode.dataset.row);
    const currentCol = parseInt(piece.parentNode.dataset.col);
    const targetRow = parseInt(square.dataset.row);
    const targetCol = parseInt(square.dataset.col);
    const rowDiff = Math.abs(targetRow - currentRow);
    const colDiff = Math.abs(targetCol - currentCol);

    if (rowDiff > 1 || colDiff > 1) {
      return false;
    }
    return true;
  }

  isValidCapture(selectedPiece, targetPiece) {

    const currentCol = parseInt(selectedPiece.parentNode.dataset.col);
    const currentRow = parseInt(selectedPiece.parentNode.dataset.row);
    const targetCol = parseInt(targetPiece.parentNode.dataset.col);
    const targetRow = parseInt(targetPiece.parentNode.dataset.row);

    const rowDiff = Math.abs(targetRow - currentRow);
    const colDiff = Math.abs(targetCol - currentCol);

    if (rowDiff > 1 || colDiff > 1) {
      return false;
    }

    return true;

  }
}
