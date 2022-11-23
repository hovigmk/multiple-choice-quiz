// const startquiz = document.getElementById("start_quiz");
// const timerheader = document.querySelector(".timertext");

// startquiz.addEventListener("click", () => {
//   startTimer(); //calling startTimer function
// });

// var sec = 60;
// function startTimer() {
//   console.log("timer suppose to go");
//   var timer = setInterval(function () {
//     sec--;
//     document.getElementById("timerDisplay").innerHTML = "00:" + sec;
//     if (sec < 0) {
//       clearInterval(timer);
//       alert("Time is up!");
//     }
//   }, 1000);
// }
// document.getElementById("incorrect").addEventListener("click", function () {
//   sec -= 5;
//   document.getElementById("timerDisplay").innerHTML = "00:" + sec;
// });

// function showquestions() {}

var questionindex = 0;
var time = quizquestions.length * 15;
var timerid;

var questionsEl = document.getElementById("quiz-questions");
var timer = document.getElementById("timerdisplay");
var optionsEl = document.getElementById("options");
var submit = document.getElementById("submit");
var start = document.getElementById("start_btn");
var initial = document.getElementById("initials");

function quizbox() {
  var hidequiz = document.getElementById("quizcontainer");
  hidequiz.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerid = setInterval(clockTick, 1000);

  timer.textContent = time;

  //getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[questionindex];
  var headerEL = document.getElementById("questionsheader");
  headerEL.textContent = currentQuestion.title;

  options.innerHTML = " ";

  for (var i = 0; i < currentQuestion.options.length; i++) {
    var choice = currentQuestion.options[i];
    var choicedecision = document.createElement("button");
    choicedecision.setAttribute("class", "choice");
    choicedecision.setAttribute("value", "choice");
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
  if(time < 0){
    time = 0;
  }
  timer.textContent = time;

  setTimeout(function () {

  });
  questionindex++;
  if(time <= 0 || questionindex === questions.length) {
    quizend();
  } else {
    getQuestion();
  }
}

function quizEnd()
