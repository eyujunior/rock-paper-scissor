const imgItem = document.querySelectorAll(".img-item");
const winner = document.querySelector(".winner");
const scoreHtml = document.querySelector(".score");
const imgContainer = document.querySelector(".img-container");
const playContainer = document.querySelector(".play-container");
const modalBg = document.querySelector(".modal-bg");
const modalExit = document.querySelector(".modal span");
const btn = document.querySelector(".btn-white");
const btnGhost = document.querySelector(".btn-ghost");
const items = ["rock", "paper", "scissors"];
let userPicked = "";
let housePicked;
let score = 0;

const playItem1 = document.querySelector(".img-items-1");
const playItem2 = document.querySelector(".img-items-2");

// initializes the game
const init = () => {
  scoreHtml.innerHTML = score;
};
init();

// play again function
const playAgain = () => {
  displayNone(playContainer, imgContainer);
};

// house picks function
const housePicks = () => {
  let pick = Math.floor(Math.random() * 3);
  housePicked = items[pick];
  playItem2.src = `./images/${housePicked}.svg`;
  borderadder(userPicked, housePicked);
};

// select ui function
const selectUI = (target) => {
  displayNone(imgContainer, playContainer);
  playItem1.src = target.src;
};

// border adder
const borderadder = (user, house) => {
  if (user == "paper") {
    playItem1.classList.add("border-paper");
    playItem1.classList.remove("border-scissors");
    playItem1.classList.remove("border-rock");
  } else if (user == "rock") {
    playItem1.classList.add("border-rock");
    playItem1.classList.remove("border-scissors");
    playItem1.classList.remove("border-paper");
  } else {
    playItem1.classList.add("border-scissors");
    playItem1.classList.remove("border-paper");
    playItem1.classList.remove("border-rock");
  }

  if (house == "paper") {
    playItem2.classList.add("border-paper");
    playItem2.classList.remove("border-scissors");
    playItem2.classList.remove("border-rock");
  } else if (house == "rock") {
    playItem2.classList.add("border-rock");
    playItem2.classList.remove("border-scissors");
    playItem2.classList.remove("border-paper");
  } else {
    playItem2.classList.add("border-scissors");
    playItem2.classList.remove("border-paper");
    playItem2.classList.remove("border-rock");
  }
};

// display none function
const displayNone = (el1, el2) => {
  el1.classList.toggle("none");
  el2.classList.toggle("none");
};
let round = score;
// check winner function
const whoWins = () => {
  if (userPicked == "paper") {
    if (housePicked == "scissors") {
      --round;
      console.log(round);
    } else if (housePicked == "rock") {
      ++round;
      console.log(round);
    }
  } else if (userPicked == "scissors") {
    if (housePicked == "paper") {
      ++round;
      console.log(round);
    } else if (housePicked == "rock") {
      --round;
      console.log(round);
    }
  } else if (userPicked == "rock") {
    if (housePicked == "paper") {
      --round;
      console.log(round);
    } else if (housePicked == "scissors") {
      ++round;
      console.log(round);
    }
  }

  updateScore(round);
  round = 0;
};

// update score
const updateScore = (scored) => {
  score += scored;
  scoreHtml.innerHTML = score;

  if (scored > 0) {
    winner.innerHTML = "You won";
    winner.style.color = "#41cf78";
  } else if (scored < 0) {
    winner.innerHTML = "You lost";
    winner.style.color = "red";
  } else {
    winner.innerHTML = "Draw";
    winner.style.color = "hsl(230, 89%, 62%)";
  }
};

//event listeners

imgItem.forEach((item) =>
  item.addEventListener("click", (item) => {
    if (item.target.classList.contains("img-item-1")) {
      userPicked = items[0];
    } else if (item.target.classList.contains("img-item-2")) {
      userPicked = items[1];
    } else if (item.target.classList.contains("img-item-3")) {
      userPicked = items[2];
    }

    console.log(userPicked);
    selectUI(item.target);
    housePicks(item.target);
    whoWins();
  })
);

// button event listeners
btn.addEventListener("click", playAgain);
btnGhost.addEventListener("click", () => {
  modalBg.classList.add("bg-active");
});
modalExit.addEventListener("click", () => {
  modalBg.classList.remove("bg-active");
});
