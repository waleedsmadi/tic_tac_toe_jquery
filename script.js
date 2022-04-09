$(document).ready(function(){
    "use strict";

    // selectors
    const result = $(".result"),
          playerText = $("#player"),
          resetBtn = $(".btn"),
          cells = $(".cell");

    // setting
    let currentPlayer = "X";
    let isGameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];
    const odds = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    cells.each(function(index ,cell){
        $(this).click(function(){
            
            // if the cell is empty or the game not active >> return
            if($(this).text() !== "" || !isGameActive) return

            // showing up X/O on screen
            $(this).text(currentPlayer).addClass(`player-${currentPlayer}`);


            // update the board
            updateBoard(index);

            // handling the result
            handleResult();

            // change current player
            changePlayer();

        });
    });



    // updating the board
    function updateBoard(index){
        board[index] = currentPlayer;
    }



    function handleResult(){
        let roundWin = false;

        // compate between board's elements
        // and odds elements to check 
        // if there a winner or not
        for(let i=0; i<=7; i++){
            const winCondition = odds[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            if(a === '' || b === '' || c === '') continue;

            // there is a winner
            if(a == c && c == b){
                roundWin = true;
                isGameActive = false;
                break;
            }
        }

        // check whoe is the winner
        // and display it
        if(roundWin){
            result.removeClass("hidden");
            if(currentPlayer === "X"){
                result.html(`Player <span class="player-X">X</span> won.`);
            }else{
                result.html(`Player <span class="player-O">O</span> won.`);
            }
        }

        // a drawing condition
        if(!board.includes('')) $(".result").text("A Draw");
    }




    // to change the current player
    function changePlayer(){
        playerText.removeClass(`player-${currentPlayer}`);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerText.text(currentPlayer);
        playerText.addClass(`player-${currentPlayer}`);
    }


    // reset button
    resetBtn.click(function(){
        // reset the board
        board = ['', '', '', '', '', '', '', '', ''];

        // clear classes 'player-X and player-O' from cells
        cells.each(function(){
            $(this).removeClass("player-O");
            $(this).removeClass("player-X");
            $(this).text('');
        });

        // hide the result
        result.addClass("hidden");

        // reset the current player to X
        if(currentPlayer === "O") changePlayer();

        // make the game active again
        isGameActive = true;
    });

});