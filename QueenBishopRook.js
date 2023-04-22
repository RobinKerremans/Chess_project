class Rook {
  constructor(color) {
    this.color = color;
    this.hasMoved = false;
    this.element = document.createElement('div');
    this.element.classList.add('square', 'rook', `${color}-enemy`);
    this.element.piece = this;
    this.element.style.backgroundImage = `url('./rook-${color}.png')`;
  }

  isValidMove(selectedPiece, targetSquare) {
    const currentCol = parseInt(selectedPiece.parentNode.dataset.col);
    const currentRow = parseInt(selectedPiece.parentNode.dataset.row);

    const targetCol = parseInt(targetSquare.dataset.col);
    const targetRow = parseInt(targetSquare.dataset.row);

      // Rook can only move along a single row or column
      if (currentRow !== targetRow && currentCol !== targetCol) {
        return false;
      }

      // Check if there are any pieces in the way
      let squaresInBetween = [];
      if (currentRow === targetRow) {
        // Moving horizontally
        let start = Math.min(currentCol, targetCol);
        let end = Math.max(currentCol, targetCol);
        for (let i = start + 1; i < end; i++) {
          squaresInBetween.push(document.querySelector(`[data-row="${currentRow}"][data-col="${i}"]`));
        }
      } else {
        // Moving vertically
        let start = Math.min(currentRow, targetRow);
        let end = Math.max(currentRow, targetRow);
        for (let i = start + 1; i < end; i++) {
          squaresInBetween.push(document.querySelector(`[data-row="${i}"][data-col="${currentCol}"]`));
        }
      }

      // Check if any squares in between have a piece
      for (let square of squaresInBetween) {
        if (square.firstElementChild !== null) {
          return false;
        }
      }

      // Movement is allowed
      this.hasMoved = true;
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

    // Rook can only move along a single row or column
    if (currentRow !== targetRow && currentCol !== targetCol) {
      return false;
    }

    // Check if there are any pieces in the way
    let squaresInBetween = [];
    if (currentRow === targetRow) {
      // Moving horizontally
      let start = Math.min(currentCol, targetCol);
      let end = Math.max(currentCol, targetCol);
      for (let i = start + 1; i < end; i++) {
        squaresInBetween.push(document.querySelector(`[data-row="${currentRow}"][data-col="${i}"]`));
      }
    } else {
      // Moving vertically
      let start = Math.min(currentRow, targetRow);
      let end = Math.max(currentRow, targetRow);
      for (let i = start + 1; i < end; i++) {
        squaresInBetween.push(document.querySelector(`[data-row="${i}"][data-col="${currentCol}"]`));
      }
    }

    // Check if any squares in between have a piece
    for (let square of squaresInBetween) {
      if (square.firstElementChild !== null) {
        return false;
      }
    }

    // Movement is allowed
    this.hasMoved = true;
    return true;
  }

  getAttackSquares() {
    const currentCol = parseInt(this.element.parentNode.dataset.col);
    const currentRow = parseInt(this.element.parentNode.dataset.row);
    const attackSquares = [];

    // check vertically up
    for (let i = 1; i <= 7; i++) {
      const col = currentCol + i;
      if (col > 7) break;
      const square = document.querySelector(`[data-row="${currentRow}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
          // A piece is blocking the diagonal path
          if (square.children[0].piece.color == this.color) attackSquares.push(square);
          //squares beyond king stay attacked
          if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }


    // check vertically down
    for (let i = 1; i <= 7; i++) {
      const col = currentCol - i;
      if (col < 0) break;
      const square = document.querySelector(`[data-row="${currentRow}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    // check horizontally right (left?)
    for (let i = 1; i <= 7; i++) {
      const row = currentRow + i;
      if (row > 7) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${currentCol}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    // check horizontally left
    for (let i = 1; i <= 7; i++) {
      const row = currentRow - i;
      if (row < 0) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${currentCol}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    return attackSquares;
  }

}



// ======================================================================================================
class Bishop {
  constructor(color) {
    this.color = color;
    this.hasMoved = false;
    this.element = document.createElement('div');
    this.element.classList.add('square', 'bishop', `${color}-enemy`);
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

  getAttackSquares() {
    const currentCol = parseInt(this.element.parentNode.dataset.col);
    const currentRow = parseInt(this.element.parentNode.dataset.row);
    const attackSquares = [];

    // check diagonally up-right
    for (let i = 1; i <= 7; i++) {
      const row = currentRow - i;
      const col = currentCol + i;
      if (row < 0 || col > 7) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
          // A piece is blocking the diagonal path
          if (square.children[0].piece.color == this.color) attackSquares.push(square);
          if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }


    // check diagonally up-left
    for (let i = 1; i <= 7; i++) {
      const row = currentRow - i;
      const col = currentCol - i;
      if (row < 0 || col < 0) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    // check diagonally down-right
    for (let i = 1; i <= 7; i++) {
      const row = currentRow + i;
      const col = currentCol + i;
      if (row > 7 || col > 7) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    // check diagonally down-left
    for (let i = 1; i <= 7; i++) {
      const row = currentRow + i;
      const col = currentCol - i;
      if (row > 7 || col < 0) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    return attackSquares;
  }
}

//=========================================================================================================

class Queen {
  constructor(color) {
    this.color = color;
    this.hasMoved = false;
    this.element = document.createElement('div');
    this.element.classList.add('square', 'queen', `${color}-enemy`);
    this.element.piece = this;
    this.element.style.backgroundImage = `url('./queen-${color}.png')`;
  }

  isValidMove(piece, square) {
    const rook = new Rook(this.color);
    const bishop = new Bishop(this.color);
      return (rook.isValidMove(piece, square) || bishop.isValidMove(piece, square));
  }

  isValidCapture(selectedPiece, targetPiece) {
    const rook = new Rook(this.color);
    const bishop = new Bishop(this.color);
      return (rook.isValidCapture(selectedPiece, targetPiece) || bishop.isValidCapture(selectedPiece, targetPiece));
  }

  getAttackSquares() {
    const currentCol = parseInt(this.element.parentNode.dataset.col);
    const currentRow = parseInt(this.element.parentNode.dataset.row);
    const attackSquares = [];

    // check diagonally up-right
    for (let i = 1; i <= 7; i++) {
      const row = currentRow - i;
      const col = currentCol + i;
      if (row < 0 || col > 7) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
          // A piece is blocking the diagonal path
          if (square.children[0].piece.color == this.color) attackSquares.push(square);
          if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }


    // check diagonally up-left
    for (let i = 1; i <= 7; i++) {
      const row = currentRow - i;
      const col = currentCol - i;
      if (row < 0 || col < 0) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    // check diagonally down-right
    for (let i = 1; i <= 7; i++) {
      const row = currentRow + i;
      const col = currentCol + i;
      if (row > 7 || col > 7) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    // check diagonally down-left
    for (let i = 1; i <= 7; i++) {
      const row = currentRow + i;
      const col = currentCol - i;
      if (row > 7 || col < 0) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    // check vertically up
    for (let i = 1; i <= 7; i++) {
      const col = currentCol + i;
      if (col > 7) break;
      const square = document.querySelector(`[data-row="${currentRow}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
          // A piece is blocking the diagonal path
          if (square.children[0].piece.color == this.color) attackSquares.push(square);
          //squares beyond king stay attacked
          if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }


    // check vertically down
    for (let i = 1; i <= 7; i++) {
      const col = currentCol - i;
      if (col < 0) break;
      const square = document.querySelector(`[data-row="${currentRow}"][data-col="${col}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    // check horizontally right (left?)
    for (let i = 1; i <= 7; i++) {
      const row = currentRow + i;
      if (row > 7) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${currentCol}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    // check horizontally left
    for (let i = 1; i <= 7; i++) {
      const row = currentRow - i;
      if (row < 0) break;
      const square = document.querySelector(`[data-row="${row}"][data-col="${currentCol}"]`);
      if (square && square.children.length > 0) {
        if (square.children[0].piece.color == this.color) attackSquares.push(square);
        if (!square.children[0].classList.contains('king')) break;
      }
      attackSquares.push(square);
    }

    return attackSquares;
  }


}
