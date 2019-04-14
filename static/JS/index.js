var sqrId, user, SIZE = 8, BOMBS = 10, score, time=0;
const ARR_LENGTH = 9;


function PrintArray(A){
    console.log(A);
}

let v = setInterval(myTimer ,1000);
function myTimer() {
  time++;
  document.getElementById("score").innerHTML = "" + time;
}

function Create2DArray() {
    var arr = [];

    for (var i=0;i<SIZE;i++) {
        arr[i] = [];
        for (var j=0;j<SIZE;j++) {
            arr[i][j] = -1;
        }
    }

    return arr;
}

function GetIndex(num){
    var n1 =  Math.floor(num / SIZE);
    var n2 = num % SIZE;
    return [n1, n2];
}

function clear(n1, n2, id){
    if(guess[n1][n2] == -1){
        let adj=0;
        if(board[n1][n2] == 1){
            alert("Your Dead");
            Reset();
        }
        else{
            // Count the adjacent bombs
            let i = Math.max(n1-1,0);
            let iMax = Math.min(n1+1, SIZE-1);
            while(i<=iMax){
                let j = Math.max(n2-1,0);
                let jMax = Math.min(n2+1, SIZE-1);
                while(j<=jMax){
                    if(board[i][j] == 1){
                        adj++;
                    }
                    j++;
                }
                i++;
            }

            if (adj == 0) {
                guess[n1][n2] = adj;
                clearAdj(n1 ,n2 , id);
            } else {
                guess[n1][n2] = adj;
                document.getElementById(id).innerHTML = "" + adj;
            }
        }
    }
}

function clearAdj(n1, n2, id) {
    document.getElementById(id).classList.add("clear");

    // Count the adjacent bombs
    let i = Math.max(n1-1,0);
    let iMax = Math.min(n1+1, SIZE-1);
    while(i<=iMax){
        let j = Math.max(n2-1,0);
        let jMax = Math.min(n2+1, SIZE-1);
        while(j<=jMax){
            if ( i != n1 || j != n2) {
                clear(i, j, SIZE * i + j);
            }
            j++;
        }
        i++;
    }
}

function flag(n1,n2,id){
    if(guess[n1][n2] == -1){
        guess[n1][n2]=0;
        document.getElementById(id).innerHTML = "&#9873;";
    }
    else if(guess[n1][n2] == 0){
        guess[n1][n2]=-1;
        document.getElementById(id).innerHTML = "";
    }
}

function Reset(){
    time+=10000;
    document.getElementById("score").innerHTML = ""+time;
}

function PlaceBombs(){
    var i=0;
    var n1, n2;
    while(i<BOMBS){
        n1 = Math.floor((Math.random() * 8));
        n2 = Math.floor((Math.random() * 8));
        if(board[n1][n2]== -1){
            board[n1][n2] = 1;
            i++;
        }
    }

    console.log(board)
}

function CheckWinner(){
    let c=0;
    for (var i=0;i<SIZE;i++) {
        for (var j=0;j<SIZE;j++) {
            if(guess[i][j] == 0 ){
                console.log(""+i+"\n");
                if (board[i][j] == 1) {
                    c++;
                    console.log(""+j+"\n");
                }
            }
        }
    }

    if(c==BOMBS){
        score=time;
        return true;
    }
    else{return false;}
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

        if(user=="C"){
            clear(row,col,sqrID);
        }
        else if(user=="F"){
            flag(row,col,sqrID);
        }

        if(CheckWinner()){
            alert("t");
            document.getElementById("Final").innerHTML += "" + score;
            $("#Winner").modal("show");
        }
    });

    //reset board
    $(".reset").click(function() {
        resetBoard();
    })

});

function addToLeaderboard(name, score) {
    $.get("/api/add/" + name + '/' + score, function(){
    });
}

function RecordScore(){

    let Name = $('#Name').val();

    addToLeaderboard(Name,score);
}