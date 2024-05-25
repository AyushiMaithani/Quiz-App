const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = document.querySelector(".quit");
const contBtn = document.querySelector(".cont");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const restartBtn = resultBox.querySelector(".buttons .cont");
const quitBtn = resultBox.querySelector(".buttons .quit");
const option_list = document.querySelector(".option-list");
const timeCount = quizBox.querySelector(".timer .time-sec");
const timeLine = quizBox.querySelector(".timer .time-line");
const timeUp = quizBox.querySelector(".timer .time-text");
let queCount = 0;
let queNum = 1;
let tCounter;
let tCounterLine;
let timeVal = 15;
let widthVal = 0;
let userScore = 0;

restartBtn.onclick = () => {
  quizBox.classList.add("show");
  resultBox.classList.remove("show");
  queCount = 0;
  queNum = 1;
  timeVal = 15;
  widthVal = 0;
  userScore = 0;
  showQues(queCount);
  queCounter(queNum);
  clearInterval(tCounter);
  startTimer(timeVal);
  clearInterval(tCounterLine);
  startTimerLine(widthVal);
  nextBtn.style.display = "none";
  timeUp.textContent = "Time Left";
};

quitBtn.onclick = () => {
  window.location.reload();
};

startBtn.onclick = () => {
  infoBox.classList.add("show");
  startBtn.classList.add("hide");
};
exitBtn.onclick = () => {
  infoBox.classList.remove("show");
  startBtn.classList.remove("hide");
};
contBtn.onclick = () => {
  infoBox.classList.remove("show");
  quizBox.classList.add("show");
  showQues(queCount);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};

const nextBtn = document.querySelector(".next-btn");
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNum++;
    showQues(queCount);
    queCounter(queNum);
    clearInterval(tCounter);
    startTimer(timeVal);
    clearInterval(tCounterLine);
    startTimerLine(widthVal);
    nextBtn.style.display = "none";
    timeUp.textContent = "Time Left";
  } else {
    clearInterval(tCounter);
    clearInterval(tCounterLine);
    showResultBox();
    console.log("questions completed");
  }
};

function showQues(index) {
  const ques = document.querySelector(".ques");

  let ques_tag =
    "<span>" +
    questions[index].num +
    "." +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";

  ques.innerHTML = ques_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(tCounter);
  clearInterval(tCounterLine);
  let userAns = answer.textContent;
  let corrAns = questions[queCount].answer;
  let allOptions = option_list.children.length;
  if (userAns == corrAns) {
    userScore += 1;
    answer.classList.add("right");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == corrAns) {
        option_list.children[i].setAttribute("class", "option right");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  nextBtn.style.display = "block";
}

function queCounter(index) {
  const quesCounterText = quizBox.querySelector(".total-ques");
  let TotQuesCount_tag =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>Questions</span>";
  quesCounterText.innerHTML = TotQuesCount_tag;
}

function startTimer(time) {
  tCounter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }

    if (time < 0) {
      clearInterval(tCounter);
      timeCount.textContent = "00";
      timeUp.textContent = "Time Up";

      let corrAns = questions[queCount].answer;
      let allOptions = option_list.children.length;
      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == corrAns) {
          option_list.children[i].setAttribute("class", "option right");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }

      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      nextBtn.style.display = "block";
    }
  }
}

function startTimerLine(time) {
  tCounterLine = setInterval(timer, 13);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 1228) {
      clearInterval(tCounterLine);
    }
  }
}

function showResultBox() {
  quizBox.classList.remove("show");
  resultBox.classList.add("show");
  const scoreText = resultBox.querySelector(".score");
  if (userScore > 3) {
    let scoreTag =
      "<span>Congrats, You got <p>" +
      userScore +
      "</p>out of<p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>Nice, You got <p>" +
      userScore +
      "</p>out of<p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>Sorry, You got <p>" +
      userScore +
      "</p>out of<p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}
