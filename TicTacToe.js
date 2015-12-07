/*
 * Transform an x,y coordinate into a cell ID.
 */
var CoordToID = function(x,y){
  return 3 * y + x;
}

/*
 * Transform ID into an x, y coordinate.
 */
var IDToCoord = function(id){
  return {
    x : (id % 3),
    y : Math.floor(id / 3),
  };
}

/* Init */

var turn = 0;

//array of all open cells on the board
var openCells = [];
//2D array of the tic tac toe boards. Cells should be null, "X", or "O"
var board = [];
for (var x = 0; x < 3; x++){
  var col = [];
  for(var y = 0; y < 3; y++){
    col.push(null);
    //add cell to openCells
    openCells.push(CoordToID(x,y));
  }
  board.push(col);
}

/* End init */

var getWinner = function(){
  for (var i = 0; i < 3; i++){
    /* check horizontal victories */
    if(board[i][0] != null && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
      return board[i][0];
    }
    /* check vertical victories */
    else if(board[0][i] != null && board[0][i] === board[1][i] && board[1][i] === board[2][i]){
      return board[0][i];
    }
  }
  /* check diagonal victories */
  if (board[0][0] != null && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
    return board[1][1];
  } else if(board[0][2] != null && board[0][2] == board[1][1] && board[1][1] == board[2][0]){
    return board[1][1];
  }
  return "";
}

/*
 * Enable/Disable a cell and set its value.
 *   disabled == boolean
 *   value == "x", "O", null to reset the value, and ""
 *   to not change the value.
 */
var setCellState = function(x, y, value, disabled){
  //get the button element
  var btn = document.getElementById(CoordToID(x,y));

  //modify button html stuff
  if (value != ""){
    btn.innerHTML = value;
  }
  btn.disabled =  disabled;
}

/*
 * set the cell value to X and remove it from the openCells
 */
var setCell = function(x, y, value){
  //set the cell in the board
  board[x][y] = value;
  //remove the cell from the openCells array
  openCells.splice(openCells.indexOf(CoordToID(x,y)), 1);
  //set cell html
  setCellState(x,y,value, true)
};

/*
 * Reset a cell to have no value and be enabled.
 */
var resetCell = function(x, y){
  //set the cell in the board
  board[x][y] = null;
  //add the open cell to the open cells array
  if(openCells.indexOf(CoordToID(x,y)) == -1){
    openCells.push(CoordToID(x,y));
  }
  //set cell html
  setCellState(x,y,null,false);
}


/*
 * Make a random AI move
 */
var AIMove = function(){
  if (openCells.length > 0){
    var i = Math.floor(Math.random() * openCells.length);
    var coord = IDToCoord(openCells[i]);
    setCell(coord.x, coord.y, "O");
  }
}

/*
 * Called when the game is won.
 *  winner = "X", "O", or "".
 */
var onWin = function(winner){
  /* If the game is over show results */
  var results = document.getElementById("results");
  if(winner === "X"){
    results.innerHTML = "You Won!";
  } else if(winner === "O") {
    results.innerHTML = "You Lose :(";
  } else if(winner === ""){
    results.innerHTML = "Tie Game!";
  }
  /* disable all values */
  for(var x = 0; x < 3; x++){
    for(var y = 0; y < 3; y++){
        setCellState(x,y,"",true);
    }
  }
}

/*
 * Called when a button is clicked
 */
var buttonClicked = function(id){
  //set the value in the button to X if the turn is even
  var coord = IDToCoord(id);
  if(turn % 2 === 0){
    setCell(coord.x, coord.y, "X");
  } else {
    setCell(coord.x, coord.y, "O");
  }
  /* process AI move */
  var winner = getWinner();
  console.log(winner);
  if(winner == "" && openCells.length > 0){
    AIMove();
    winner = getWinner();
  } else{
    onWin(winner);
  }

};

/*
 * Resets the board.
 */
var reset = function(){
  for (var x = 0; x < 3; x++){
    for(var y = 0; y < 3; y++){
      resetCell(x,y);
    }
  }
  var results = document.getElementById("results");
  results.innerHTML = "";
}
