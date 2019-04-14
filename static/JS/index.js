var board = [64];

var player, sqrId, user, computer, row, col;
const ARR_LENGTH = 9;
$(document).ready(function() {
  //1 checkbox event listener
  $(".checkBox").click(function() {
    if($(this).is(":checked")) {
      user = $(this).val();
      player = user;
      computer = (user == 'X') ? 'O' : 'X';
    }
  });

  //2 square even listener
  $(".square").click(function() {
    console.log(board[0]);
    sqrId = $(this).attr("id");
    playerMove();
    // computerAI();
    minimax(board);
    if(checkWinner(board)) {
      alert(player+" Wins the game!");
      resetBoard();
    }
    if(checkDraw(board)) {
      alert("It's a draw!");
    }
    // player = (player == user) ? computer : user;
  });

  //reset board
  $(".reset").click(function() {
    resetBoard();
  })

});

//player move
function playerMove() {
  if($("#"+sqrId).text() == "") {
      $("#"+sqrId).text(player);
      board[sqrId] = player;
      console.log(board);
    }
    else {
      alert("Wrong move");
    }
}


/* computer AI generate random number between 0 - 8  */
function computerAI() {
  var random;
  var min = 0, max = 8;
  do {
    random = Math.floor(Math.random() * (max + min));
  }while($("#"+random).text() != "")
  $("#"+random).text(computer);
  // row = getRow();
  // col = getCol();
  board[random] = computer;
}

//getting row number
function getRow() {
  return Math.floor(sqrId / ARR_LENGTH);
}

//getting col number
function getCol() {
  return sqrId % ARR_LENGTH;
}

/* checking for winner */
// winning combinations using the board indexies
function checkWinner(board){
 if (
 (board[0] == player && board[1] == player && board[2] == player) ||
 (board[3] == player && board[4] == player && board[5] == player) ||
 (board[6] == player && board[7] == player && board[8] == player) ||
 (board[0] == player && board[3] == player && board[6] == player) ||
 (board[1] == player && board[4] == player && board[7] == player) ||
 (board[2] == player && board[5] == player && board[8] == player) ||
 (board[0] == player && board[4] == player && board[8] == player) ||
 (board[2] == player && board[4] == player && board[6] == player)) {
 return true;
 }
 return false;
}

function checkDraw(board) {
  for(var i = 0; i < board.length; i++) {
    if(board[i] !== 'X' && board[i] !== 'O')
      return false;
  }
  return true;
}

function resetBoard() {
  $(".square").text("");
  $(".checkBox").prop("checked", false);
  user = "";
  turn = "";
  computer = "";
  for(var i = 0; i < ARR_LENGTH; i++) {
    board[i] = "";
  }
}

// the main minimax function
function minimax(board, depth, player) {
  console.log(player+" "+user+" "+computer);
  console.log("board before filter: "+board)
  //making a copy of empty spaces in board
  var newBoard = board.filter(val =>
    val != 'X' && val != 'O'
  );

  console.log("board after filter: "+newBoard);
  //if no winners keep playing
  if(!checkWinner(newBoard)) {
    var values = []; //holding value of plays

    if(player == computer) {
      //looking for available squares and calling minimax
      for(var i = 0; i < newBoard.length; i++) {
        //playing to available spot
        newBoard[i] = computer;
        //calling minimax
        const value = minimax(newBoard, depth+1, player);
        var maxVal = Math.max(maxVal, value);
        return maxVal;
      }
    }


    //return the value if player is computer
    if(player == computer) {
      return Math.max(values)
    }
    else {
      return Math.min(values)
    }

  }
  //if computer return positive number
  else if(checkWinners() && player == computer) {
    return 10;
  }
  //if user return negative number
  else if(checkWinners() && player == user) {
    return -10;
  }
  else if(checkDraw()) {
    return null;
  }
}