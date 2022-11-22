const startquiz = document.querySelector(".start-btn button");
const timerheader = document.querySelector(".timertext");

start_btn.onclick = () => {
  startTimer(); //calling startTimer function
  startTimerLine(0); //calling startTimerLine function
};
(function () {
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
  //startTimer();
})();
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
