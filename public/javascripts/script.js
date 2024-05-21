const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = document.querySelector(".quit");
const contBtn = document.querySelector(".cont");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const option_list = document.querySelector(".option-list");
let queCount = 0;
let queNum = 1;

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
};

resultBox.onclick = () => {
  resultBox.classList.remove("show");
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
  const option=option_list.querySelectorAll('.option')
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick","optionSelected(this)")
    
  }
}

let tickIcon='<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon='<div class="icon cross"><i class="fas fa-times"></i></div>'


function optionSelected(answer){
  let userAns=answer.textContent
 let corrAns=questions[queCount].answer
 let allOptions=option_list.children.length
 if(userAns==corrAns){
  answer.classList.add("right")
answer.insertAdjacentHTML("beforeend",tickIcon)
 }
else{
answer.classList.add("wrong")
answer.insertAdjacentHTML("beforeend",crossIcon)



for (let i = 0; i < allOptions; i++) {
  if(option_list.children[i].textContent==corrAns){
    option_list.children[i].setAttribute("class","option right")
    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon)
}
}
}


for (let i = 0; i < allOptions; i++) {
  option_list.children[i].classList.add("disabled")
}
}

const nextBtn = document.querySelector(".next-btn");
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNum++;
    showQues(queCount);
    queCounter(queNum);
  } else {
    console.log("questions completed");
  }
};

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

  
