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
var clearhighscoreEl = document.getElementById("cleatHighscore");
playagainel.addEventListener("click", startquiz);
clearhighscoreEl.addEventListener("click", clearScore);
start.addEventListener("click", startquiz);
submit.addEventListener("click", submitscore);

function startquiz() {
  start.classList.add("hide");
  questionsEl.classList.remove("hide");
  timer.classList.remove("hide");

  timerid = setInterval(clockTick, 1000);

  timer.textContent = time;

  getQuestion();
}

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
  if (time <= 0 || questionindex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

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
// }
// function showHighscore() {
//   startQuizDiv.style.display = "none";
//   gameoverDiv.style.display = "none";
//   highscoreContainer.style.display = "flex";
//   highscoreDiv.style.display = "block";
//   endGameBtns.style.display = "flex";

//   generateHighscores();
// }

function isQuestionCorrect(answer) {
  if (answer == "correct") {
    resultEL.innerHTML = answer;
  } else if (answer == "wrong") {
    resultEL.innerHTML = answer;
  }
}

function clearScore() {
  window.localStorage.clear();
  scoresinitialsEL.textContent = "";
  scoreslistEL.textContent = "";
}

function playagain() {
  startquiz();
}
