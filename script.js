const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("gamepiece")

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let colorChecker = [];
let firstColor;
let secondColor;
let matches = 0;
let scoreboard = 0;
const scoreboardEle = document.querySelector("#scoreboard");

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  // console.log(event.target.style)
  event.target.style.background = event.target.classList[0];

  setTimeout(function () {
    if (colorChecker.length === 0) {
      colorChecker.push(event.target.classList[0]);
      firstColor = event.target;
    } else if (colorChecker.length === 1) {
      secondColor = event.target;
      if (event.target != firstColor) {
        colorChecker.push(event.target.classList[0]);
        scoreboardEle.innerText = scoreboard
        handleColorCheck(colorChecker);
      }
    }
  }, 1000);
}


const handleColorCheck = (colors) => {
  if (colors[1] === colors[0]) {
    scoreboard++;
    colorChecker = [];
    firstColor = "";
    secondColor = "";
    matches++;
    if (matches === 5) {
      alert(`Winner in ${scoreboard - 1} attempts!`);
    }
  } else {
    scoreboard++;
    firstColor.style.backgroundColor = "white";
    secondColor.style.backgroundColor = "white";
    colorChecker = [];
    firstColor = "";
    secondColor = "";
  }
};

// when the DOM loads
createDivsForColors(shuffledColors);

let reset = document.querySelector("#reset")
reset.addEventListener("click", function () {
  let gamepieces = document.querySelectorAll(".gamepiece")
  for (let tile of gamepieces) {
    tile.remove()
  }
  colorChecker = [];
  firstColor = 0
  secondColor = 0
  matches = 0
  scoreboard = 0
  scoreboardEle.innerText = scoreboard
  createDivsForColors(shuffle(COLORS));
})