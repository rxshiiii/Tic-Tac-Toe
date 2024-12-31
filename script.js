const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];

//LETS CREATE A FUNCTION TO INITIALIZE A GAME

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"
        box.classList = `box box${index+1}`;
    });
    document.querySelector(".tic-tac-toe").classList.remove("tie");
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function checkGameOver(){
    let ans = "";
    winningPos.forEach((position)=>{
        if((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" 
            ||gameGrid[position[0]] != "") && (gameGrid[position[0]] === gameGrid[position[1]]) 
            && (gameGrid[position[1]] === gameGrid[position[2]]))
            {
                if(gameGrid[position[0]] === "X"){
                    ans = "X";
                }else{
                    ans = "O";
                }

                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none"
                })

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

            }
    });

    //if we have a winner
    if(ans != ""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    //lets check weather it is tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    //board is filled , game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game is Tie !";
        newGameBtn.classList.add("active");
        document.querySelector(".tic-tac-toe").classList.add("tie");
    }

}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"

        swapTurn();

        checkGameOver();

    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);

