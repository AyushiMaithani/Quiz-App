const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = document.querySelector(".quit");
const contBtn = document.querySelector(".cont");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
let queCount = 0;

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
};

resultBox.onclick = () => {
  resultBox.classList.remove("show");
};

function showQues(index) {
  const ques = document.querySelector(".ques");
  const option_list = document.querySelector(".option-list");
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
}

const nextBtn = document.querySelector(".next-btn");
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    showQues(queCount);
  } else {
    console.log("questions completed");
  }
};
