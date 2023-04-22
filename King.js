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
        return false; //this line to be modified
      }
      enemyPieces = document.querySelectorAll('.black-enemy');
    }
    if(piece.piece.color == 'black'){
      if(square.classList.contains('white-enemy')){
        return false;
      }
      enemyPieces = document.querySelectorAll('.white-enemy');
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
    this.hasMoved = true;
    return true;
  }

  isValidCapture(selectedPiece, targetPiece) {

    const currentCol = parseInt(selectedPiece.parentNode.dataset.col);
    const currentRow = parseInt(selectedPiece.parentNode.dataset.row);
    const targetCol = parseInt(targetPiece.parentNode.dataset.col);
    const targetRow = parseInt(targetPiece.parentNode.dataset.row);

    const rowDiff = Math.abs(targetRow - currentRow);
    const colDiff = Math.abs(targetCol - currentCol);

    const square = targetPiece.parentNode;

    if (rowDiff > 1 || colDiff > 1) {
      return false;
    }

    let enemyPieces;
    if(selectedPiece.piece.color == 'white'){
      enemyPieces = document.querySelectorAll('.black-enemy');
    }
    if(selectedPiece.piece.color == 'black'){
      enemyPieces = document.querySelectorAll('.white-enemy');
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
    this.hasMoved = true;
    return true;

  }

  isValidCastle(square) {
    const col = parseInt(this.element.parentNode.dataset.col);
    const targetCol = parseInt(square.dataset.col);
    const targetRow = parseInt(square.dataset.row);
    let leftRook;
    let rightRook;
    //already know king hasn't moved, just have to check:
    if(this.color == 'white'){
      leftRook = document.querySelectorAll('.rook.white-enemy.left')[0];
      rightRook = document.querySelectorAll('.rook.white-enemy.right')[0];
      //1. rook next to the square hasn't moved
      if(targetCol == 1 && targetRow == 0 && !rightRook.piece.hasMoved){
          const square1 = document.querySelector(`[data-row="${0}"][data-col="${3}"]`);
          const square2 = document.querySelector(`[data-row="${0}"][data-col="${2}"]`);
          const square3 = document.querySelector(`[data-row="${0}"][data-col="${1}"]`);
          // 2. are in between squares occupied?
          if(!square2.children.length==0 || !square3.children.length==0 ){
            return false;
          }
          // 3. are king-moved squares attacked?
          let enemyPieces;
          enemyPieces = document.querySelectorAll('.black-enemy');

          const threatenedSquares = new Set();
          for (const enemy of enemyPieces) {
            const enemyPiece = enemy.piece;
            const attackSquares = enemyPiece.getAttackSquares();

            for (const square of attackSquares) {
              threatenedSquares.add(square);
            }
          }
          //check each square
          if (threatenedSquares.has(square1) || threatenedSquares.has(square2) || threatenedSquares.has(square3)) {
            return false;
          }
          else {
            this.hasMoved = true;
            return true;
          }
        }

      else if(targetCol == 5 && targetRow == 0 && !leftRook.piece.hasMoved){
        const square1 = document.querySelector(`[data-row="${0}"][data-col="${3}"]`);
        const square2 = document.querySelector(`[data-row="${0}"][data-col="${4}"]`);
        const square3 = document.querySelector(`[data-row="${0}"][data-col="${5}"]`);
        const square4R = document.querySelector(`[data-row="${0}"][data-col="${6}"]`);
        // 2. are in between squares occupied?
        if(!square2.children.length==0 || !square3.children.length==0 || !square4R.children.length==0){
          return false;
        }
        // 3. are king-moved squares attacked?
        let enemyPieces;
        enemyPieces = document.querySelectorAll('.black-enemy');

        const threatenedSquares = new Set();
        for (const enemy of enemyPieces) {
          const enemyPiece = enemy.piece;
          const attackSquares = enemyPiece.getAttackSquares();

          for (const square of attackSquares) {
            threatenedSquares.add(square);
          }
        }
        //check each square
        if (threatenedSquares.has(square1) || threatenedSquares.has(square2) || threatenedSquares.has(square3)) {
          return false;
        }
        else {
          this.hasMoved = true;
          return true;
        }
      }
    }

    //BLACK CASTLING
    if(this.color == 'black'){
      leftRook = document.querySelectorAll('.rook.black-enemy.left')[0];
      rightRook = document.querySelectorAll('.rook.black-enemy.right')[0];
      //1. rook next to the square hasn't moved
      if(targetCol == 1 && targetRow == 7 && !rightRook.piece.hasMoved){
          const square1 = document.querySelector(`[data-row="${7}"][data-col="${3}"]`);
          const square2 = document.querySelector(`[data-row="${7}"][data-col="${2}"]`);
          const square3 = document.querySelector(`[data-row="${7}"][data-col="${1}"]`);
          // 2. are in between squares occupied?
          if(!square2.children.length==0 || !square3.children.length==0 ){
            return false;
          }
          // 3. are king-moved squares attacked?
          let enemyPieces;
          enemyPieces = document.querySelectorAll('.white-enemy');

          const threatenedSquares = new Set();
          for (const enemy of enemyPieces) {
            const enemyPiece = enemy.piece;
            const attackSquares = enemyPiece.getAttackSquares();

            for (const square of attackSquares) {
              threatenedSquares.add(square);
            }
          }
          //check each square
          if (threatenedSquares.has(square1) || threatenedSquares.has(square2) || threatenedSquares.has(square3)) {
            return false;
          }
          else {
            this.hasMoved = true;
            return true;
          }
        }

      else if(targetCol == 5 && targetRow == 7 && !leftRook.piece.hasMoved){
        const square1 = document.querySelector(`[data-row="${7}"][data-col="${3}"]`);
        const square2 = document.querySelector(`[data-row="${7}"][data-col="${4}"]`);
        const square3 = document.querySelector(`[data-row="${7}"][data-col="${5}"]`);
        const square4R = document.querySelector(`[data-row="${7}"][data-col="${6}"]`);
        // 2. are in between squares occupied?
        if(!square2.children.length==0 || !square3.children.length==0 || !square4R.children.length==0){
          return false;
        }
        // 3. are king-moved squares attacked?
        let enemyPieces;
        enemyPieces = document.querySelectorAll('.white-enemy');

        const threatenedSquares = new Set();
        for (const enemy of enemyPieces) {
          const enemyPiece = enemy.piece;
          const attackSquares = enemyPiece.getAttackSquares();

          for (const square of attackSquares) {
            threatenedSquares.add(square);
          }
        }
        //check each square
        if (threatenedSquares.has(square1) || threatenedSquares.has(square2) || threatenedSquares.has(square3)) {
          return false;
        }
        else {
          this.hasMoved = true;
          return true;
        }
      }
    }


    return false;

  }

  getAttackSquares() {

    const row = parseInt(this.element.parentNode.dataset.row);
    const col = parseInt(this.element.parentNode.dataset.col);
    const possibleMoves = [
      [0, 1], [1, 0], [-1, 0], [0, -1],
      [1, 1], [-1, -1], [-1, 1], [1, -1]
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
