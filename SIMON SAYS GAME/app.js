let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["yellow", "blue", "green", "red"];

let h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    console.log("Game Sequence:", gameSeq);

    btnflash(randbtn);
}

function checkAns(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!<b>score was ${level}</b><br> Press any key to restart.`;
       
        // Flash effect on game over
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 500);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.classList[1]; // Get color from class (not ID)
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (let btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
