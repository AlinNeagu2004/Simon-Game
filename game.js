// SoundJS

function loadSound() {
  createjs.Sound.registerSound("sounds/blue.mp3", "blue");
  createjs.Sound.registerSound("sounds/green.mp3", "green");
  createjs.Sound.registerSound("sounds/red.mp3", "red");
  createjs.Sound.registerSound("sounds/yellow.mp3", "yellow");
  createjs.Sound.registerSound("sounds/wrong.mp3", "wrong");
}

// Create A New Pattern

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Start the Game

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  $(".btn").css("display", "none");
  setTimeout(function () {
    $("#level-title").text("Game Starts in 3");
  }, 0);
  setTimeout(function () {
    $("#level-title").text("Game Starts in 2");
  }, 1000);

  setTimeout(function () {
    $("#level-title").text("Game Starts in 1");
  }, 2000);

  setTimeout(function () {
    nextSequence();
  }, 3000);
} else {
  $(document).keydown(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}

// Check Which Button is Pressed

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Check the User's Answer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Game Over
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      $("#level-title").text("Game Over, Press Anywhere to Restart");
      $(".btn").css("visibility", "hidden");
    }
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  // For mobile
  $(".btn").css("display", "inline-block");

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Show the Sequence to the User with Animations, Sounds and Levels
  level++;
  $("#level-title").text("Level " + level);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// Sounds

function playSound(name) {
  createjs.Sound.play(name);
}

// Animations to User Clicks

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Restart the Game

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
