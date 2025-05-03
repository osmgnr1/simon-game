let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
// let randomChosenColour;
// let randomNumber;
let started = false;
let level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).on("click", function (event) {
  const userChosenColor = event.target.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);

  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};

const nextSequence = function () {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
};

const animatePress = function (currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

const playSound = function (name) {
  switch (name) {
    case "red":
      const red = new Audio("./sounds/red.mp3");
      red.play();
      break;

    case "blue":
      const blue = new Audio("./sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      const green = new Audio("./sounds/green.mp3");
      green.play();
      break;

    case "yellow":
      const yellow = new Audio("./sounds/yellow.mp3");
      yellow.play();
      break;

    default:
      const wrong = new Audio("./sounds/wrong.mp3");
      wrong.play();
      break;
  }
};

const startOver = function () {
  level = 0;
  gamePattern = [];
  started = false;
};
