var questionindex = 0;
var time = questions.length * 15;
var timerid;

var questionsEl = document.getElementById("quizquestions");
var timer = document.getElementById("timerdisplay");
var optionsEl = document.getElementById("options");
var submit = document.getElementById("submit");
var start = document.getElementById("start_btn");
var initial = document.getElementById("initials");
var scoreEl = document.getElementById("score");
var resultEL = document.getElementById("result");
var scoreslistEL = document.getElementById("scoreslist");
var scoresinitialsEL = document.getElementById("scoresinitials");
var playagainel = document.getElementById("playAgain");
var clearhighscoreEl = document.getElementById("clearHighscore");
var endgameoptionsEl = document.getElementById("endgameoptions");
var gameoverEl = document.getElementById("gameover");
var quizrulesEl = document.getElementById("quiz-rules");
playagainel.addEventListener("click", playagain);
clearhighscoreEl.addEventListener("click", clearScore);
start.addEventListener("click", startquiz);
submit.addEventListener("click", submitscore);

// starts the quiz and sets the time
function startquiz() {
  start.classList.add("hide");
  questionsEl.classList.remove("hide");
  timer.classList.remove("hide");
  quizrulesEl.classList.add("hide");

  timerid = setInterval(clockTick, 1000);

  timer.textContent = time;

  getQuestion();
}

// links with the questions.js file and sets the index and loops over and creates button for options
function getQuestion() {
  var currentQuestion = questions[questionindex];
  var headerEL = document.getElementById("questionsheader");
  headerEL.textContent = currentQuestion.question;

  optionsEl.innerHTML = " ";

  for (var i = 0; i < currentQuestion.options.length; i++) {
    var choice = currentQuestion.options[i];
    var choicedecision = document.createElement("button");
    choicedecision.addEventListener("click", questionclick);
    choicedecision.setAttribute("class", "choice");
    choicedecision.setAttribute("value", choice);
    choicedecision.textContent = i + 1 + ". " + choice;
    optionsEl.appendChild(choicedecision);
  }
}

// checks if the user chose the right answer from the multiple choice
function questionclick(event) {
  var buttonEl = event.target;
  if (!buttonEl.matches(".choice")) {
    return;
  }

  if (buttonEl.value !== questions[questionindex].correct) {
    time -= 15;
    isQuestionCorrect("wrong");
  } else {
    isQuestionCorrect("correct");
  }

  if (time < 0) {
    time = 0;
  }

  questionindex++;

  // if the questions are done or the time runs out then it lets the user answer the last question
  // and takes them to the final screen
  if (time <= 0 || questionindex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// sets the screen for the final phase of the quiz which is saving the score
function quizEnd() {
  clearInterval(timerid);
  var gameoverEl = document.getElementById("gameover");
  var initial = document.getElementById("initials");
  var score = document.getElementById("score");

  start.classList.add("hide");
  questionsEl.classList.add("hide");
  timer.classList.add("hide");
  gameoverEl.classList.remove("hide");
  resultEL.classList.add("hide");
}

function clockTick() {
  time--;
  timer.textContent = time;
  if (time < 0) {
    clearInterval(timerid);
    alert("Time is up!");
  }
}

//take user's input and the score and saves them in the local storage
function submitscore() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  var score = {
    initials: initial.value,
    score: time,
  };
  console.log(score);
  highscores.push(score);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  scoreEl.innerHTML = score.score;
  generateHighscores();
}

// displays the scores to the user
function generateHighscores() {
  scoresinitials.innerHTML = "";
  scoreslist.innerHTML = "";
  var savedhighscores = JSON.parse(localStorage.getItem("highscores")) || [];
  for (i = 0; i < savedhighscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = savedhighscores[i].initials;
    newScoreSpan.textContent = savedhighscores[i].score;
    scoresinitialsEL.appendChild(newNameSpan);
    scoreslistEL.appendChild(newScoreSpan);
  }
}

// lets the user know if their choice was right or wrong on each question
function isQuestionCorrect(answer) {
  if (answer == "correct") {
    resultEL.innerHTML = answer;
  } else if (answer == "wrong") {
    resultEL.innerHTML = answer;
  }
}

// this function clears the list of the saved scores
function clearScore() {
  window.localStorage.clear();
  scoresinitialsEL.textContent = "";
  scoreslistEL.textContent = "";
}

// this function gives user the option to play again
function playagain() {
  gameoverEl.classList.add("hide");
  endgameoptionsEl.classList.add("hide");
  questionindex = 0;
  time = questions.length * 15;
  startquiz();
}
