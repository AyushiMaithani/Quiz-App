const startBtn = document.querySelector(".start-btn button");
const profileBox = document.querySelector(".profile");
const infoBox = document.querySelector(".info-box");
const infoBoxPre = document.querySelector(".info-box-pre");
const exitBtn = infoBox.querySelector(".quit");
const contBtn = infoBox.querySelector(".cont");
const exitBtnPre = infoBoxPre.querySelector(".quit");
const contBtnPre = infoBoxPre.querySelector(".cont");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const restartBtn = resultBox.querySelector(".buttons .cont");
const quitBtn = resultBox.querySelector(".buttons .quit");
const quitQuizBtn = quizBox.querySelector("footer .buttons .quit-btn");
const option_list = document.querySelector(".option-list");
const confirmBox = quizBox.querySelector(".confirm-box");
const returnBtn=confirmBox.querySelector(".buttons .return")
const playBtn=confirmBox.querySelector(".buttons .play")
const timeCount = quizBox.querySelector(".timer .time-sec");
const timeLine = quizBox.querySelector(".timer .time-line");
const timeUp = quizBox.querySelector(".timer .time-text");
const quesNumberSelect = infoBoxPre.querySelector(".select.num");
const difficultySelect = infoBoxPre.querySelector(".select.diff");
const categorySelect = infoBoxPre.querySelector(".select.cat");

// Fetch category options from the API
fetch("https://opentdb.com/api_category.php")
  .then((response) => response.json())
  .then((data) => {
    const categories = data.trivia_categories;
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching categories:", error);
  });

  let remainingTime; // Variable to store remaining time
  let remainingWidth; // Variable to store remaining width of timer line
  let answerSelected = false;
let queCount = 0;
let queNum = 1;
let tCounter;
let tCounterLine;
let timeVal = 15;
let widthVal = 0;
let userScore = 0;
let questions;
const difficultyPoints = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};

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

returnBtn.onclick = () => {
  window.location.reload();
};

quitQuizBtn.onclick = () => {
  remainingTime = timeVal - parseInt(timeCount.textContent); // Calculate remaining time
  remainingWidth = parseInt(timeLine.style.width);
  clearInterval(tCounter); // Stop the main timer
  clearInterval(tCounterLine); // Stop the timer line
  confirmBox.classList.add("show");
};

playBtn.onclick = () => {
  console.log(answerSelected)
  if (!answerSelected) { // Check if an answer is selected
    startTimer(15 - remainingTime); // Restart the main timer with remaining time
    startTimerLine(remainingWidth); // Restart the timer line with remaining width
  }
  confirmBox.classList.remove("show");
};

startBtn.onclick = () => {
  infoBoxPre.classList.add("show");
  profileBox.classList.add("hide");
};

exitBtnPre.onclick = () => {
  infoBoxPre.classList.remove("show");
  profileBox.classList.remove("hide");
  quesNumberSelect.value = "";
  difficultySelect.value = "";
  categorySelect.value = "";
  questions = [];
  contBtnPre.classList.remove("show");
};

contBtnPre.onclick = () => {
  infoBoxPre.classList.remove("show");
  infoBox.classList.add("show");
};

exitBtn.onclick = () => {
  infoBox.classList.remove("show");
  profileBox.classList.remove("hide");
};

contBtn.onclick = () => {
  nextBtn.style.display = "none";
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
    answerSelected = false;
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

// Add event listeners to select elements for difficulty and category

difficultySelect.addEventListener("change", updateApiUrl);
categorySelect.addEventListener("change", updateApiUrl);

// Function to update the API URL based on the selected difficulty and category
function updateApiUrl() {
  const selectedDifficulty = difficultySelect.value;
  const selectedCategory = categorySelect.value;
  const selectedQuesNum = parseInt(quesNumberSelect.value);

  if (selectedDifficulty && selectedCategory && selectedQuesNum) {
    const apiUrl = `https://opentdb.com/api.php?amount=${selectedQuesNum}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;

    // Fetch questions with the updated API URL
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched questions
        if (data.response_code === 0) {
          // Process the fetched questions
          questions = data.results.map((question, index) => ({
            num: index + 1,
            question: question.question,
            options: [
              ...question.incorrect_answers,
              question.correct_answer,
            ].sort(() => Math.random() - 0.5),
            answer: decodeHTMLEntities(question.correct_answer),
          }));
          console.log(questions);

          contBtnPre.classList.add("show");
        } else {
          console.log(selectedQuesNum);
          console.error("Failed to fetch questions from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }
}

function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

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
// Define point values for each difficulty level

function optionSelected(answer) {
  answerSelected = true;
  clearInterval(tCounter);
  clearInterval(tCounterLine);
  let userAns = answer.textContent;
  let corrAns = questions[queCount].answer;
  let allOptions = option_list.children.length;

  // Get the selected difficulty
  const selectedDifficulty = difficultySelect.value;
  console.log(selectedDifficulty);

  // Get the point value for the selected difficulty
  const pointsPerQuestion = difficultyPoints[selectedDifficulty];

  console.log(pointsPerQuestion);
  if (userAns == corrAns) {
    userScore += pointsPerQuestion;
    console.log(userScore);
    //Adjust the scoring based on the difficulty
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
  tCounterLine = setInterval(timer, 12);
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
  const totalPoints =
    questions.length * difficultyPoints[difficultySelect.value];
  console.log(totalPoints);
  const scoreText = resultBox.querySelector(".score");
  if (userScore > 3) {
    let scoreTag =
      "<span>Congrats, You got <p>" +
      userScore +
      "</p>out of<p>" +
      totalPoints +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>Nice, You got <p>" +
      userScore +
      "</p>out of<p>" +
      totalPoints +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>Sorry, You got <p>" +
      userScore +
      "</p>out of<p>" +
      totalPoints +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }

  fetch("/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ lastscore: userScore }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Score updated successfully:", data);
    })
    .catch((error) => {
      console.error("Error updating score:", error);
    });
  console.log(userScore);
}
