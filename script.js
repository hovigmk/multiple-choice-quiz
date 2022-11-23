const startquiz = document.getElementById("start_quiz");
const timerheader = document.querySelector(".timertext");

startquiz.addEventListener("click", () => {
  startTimer(); //calling startTimer function
});

var sec = 60;
function startTimer() {
  console.log("timer suppose to go");
  var timer = setInterval(function () {
    sec--;
    document.getElementById("timerDisplay").innerHTML = "00:" + sec;
    if (sec < 0) {
      clearInterval(timer);
      alert("Time is up!");
    }
  }, 1000);
}
document.getElementById("incorrect").addEventListener("click", function () {
  sec -= 5;
  document.getElementById("timerDisplay").innerHTML = "00:" + sec;
});

function showquestions() {}
//startTimer();

// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
