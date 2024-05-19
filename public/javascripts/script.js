const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = document.querySelector(".quit");
const contBtn = document.querySelector(".cont");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

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
};

resultBox.onclick=()=>{
  resultBox.classList.remove("show")
}



let queCount = 0;
