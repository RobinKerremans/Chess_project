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

  getAttackSquares() {

    const row = parseInt(this.element.parentNode.dataset.row);
    const col = parseInt(this.element.parentNode.dataset.col);
    const attackSquares = [];

    if(this.color == 'white'){
      const possibleMoves = [
        [1, 1], [1, -1]
      ];
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
    } else{
      const possibleMoves = [
        [-1, 1], [-1, -1]
      ];
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
    }


    return attackSquares;
  }

}
