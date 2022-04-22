window.onload = pageReady;

function pageReady() {
  // DECLARATION OF DOM ELEMENTS
  var clock = document.getElementById("clockdiv");
  clock.style.visibility = "hidden";
  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");

  var dateElement = document.getElementById("datePickerId");
  let currDate = new Date();
  currDate.toISOString().split("T")[0];
  var offset = currDate.getTimezoneOffset();
  currDate = new Date(currDate.getTime() - offset * 60 * 1000);
  var today = currDate.toISOString().split("T")[0];
  dateElement.setAttribute("min", today);
  var endDate;
  function findDays(e) {
    endDate = new Date(e.target.value);

    function getTimeRemaining(endDate) {
      if(Date.parse(endDate) < Date.parse(new Date())){
        daysSpan.innerHTML = "";
        hoursSpan.innerHTML = "";
        minutesSpan.innerHTML = "";
        secondsSpan.innerHTML = "";
        clock.style.display = "visible";
        clock.innerText = "heyy"
      }
      var total = Date.parse(endDate) - Date.parse(new Date());
      var seconds = Math.floor((total / 1000) % 60);
      var minutes = Math.floor((total / 1000 / 60) % 60);
      var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      var days = Math.floor(total / (1000 * 60 * 60 * 24));
      clock.style.visibility = "visible";
      clock.style.display = "flex";
      return {
        total,
        days,
        hours,
        minutes,
        seconds,
      };
    }
    function updateClock() {
      var t = getTimeRemaining(endDate);
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  dateElement.onchange = findDays;
}
