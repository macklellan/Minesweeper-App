var sqrId, user, SIZE = 8, BOMBS = 10;
const ARR_LENGTH = 9;

function PrintArray(A){
        console.log(A);
}

function Create2DArray() {
    var arr = [];

    for (var i=0;i<SIZE;i++) {
        arr[i] = [];
        for (var j=0;j<SIZE;j++) {
            arr[i][j] = 0;
        }
    }

    return arr;
}

function GetIndex(num){
    var n1 = num%SIZE;
    var n2 = num%SIZE;
    return [n1, n2];
}

function clear(n1,n2,id){

}

function flag(n1,n2,id){

}

function PlaceBombs(){
    var i=0;
    var n1, n2;
    while(i<BOMBS){
        n1 = Math.floor((Math.random() * 8));
        n2 = Math.floor((Math.random() * 8));
        if(board[n1][n2]== 0){
            board[n1][n2] = 1;
            i++;
        }
    }

    console.log(board)
}

var board = Create2DArray(SIZE);
var guess = Create2DArray(SIZE);

PlaceBombs();

$(document).ready(function() {
    //1 checkbox event listener
    $(".checkBox").click(function() {
        if($(this).is(":checked")) {
            user = $(this).val();
        }
    });

    //2 square even listener
    $(".square").click(function() {
        //console.log(board[0]);
        sqrID = $(this).attr("id");

        var codes = GetIndex(sqrID);
        var row = codes[0];
        var col = codes[1];

        if(user=="X"){
            clear(row,col,sqrID);
        }
        else{
            flag(row,col,sqrID);
        }

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