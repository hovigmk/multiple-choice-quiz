var questionindex = 0;
var time = questions.length * 15;
var timerid;

var questionsEl = document.getElementById("quizquestions");
var timer = document.getElementById("timerdisplay");
var optionsEl = document.getElementById("options");
var submit = document.getElementById("submit");
var start = document.getElementById("start_btn");
var initial = document.getElementById("initials");
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
  }
  if (time < 0) {
    time = 0;
  }

  // setTimeout(function () {});
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
}

function clockTick() {
  time--;
  timer.textContent = time;
  if (time < 0) {
    clearInterval(timerid);
    alert("Time is up!");
  }
}
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
function submitscore() {
  var score = {
    initials: initial.value,
    score: time,
  };
  console.log(score);
  highscores.push(score);
  localStorage.setItem("highscores", JSON.stringify(highscores));
}
