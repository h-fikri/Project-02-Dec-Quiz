/* Pseudocode:
Creating Multiple-choice Quiz using Web API.
requirement:
===================
Question Technical:
_ Total Question: 4
- Each Question: 4 choice
- Each Question: 10 Seconds
- Wrong choice: -5 seconds
- Total Timer: 40 seconds

===================
Logic Behaviour:
- Start Button clicked:
    - timer start,
    - first question appears
- First - Third Question: 
    - Correct answer: 
        - Show 5ms: Correct! 
        - go to Next Question
    - Wrong Answer: 
        - Show 5ms: Incorrect! 
        - substract 5 seconds
        - go to Next Question
- Fourth Question: 
    - Correct answer: 
        - Show 5ms: Correct! 
        - go to scoring Page.
    - Wrong Answer: 
        - Show 5ms: Incorrect! 
        - substract 5 seconds
        - go to scoring Page.
- Scoring Page:
    - Your Total Score is: (show total score)
    - Enter your name: 
    - Submit button.
    - Go to highscore page
- Highscore Page:
    - Show list of scores
    - Go Back: back to start
    - Clear Highscore:
- Timer ends:
    - Show: Time's Up! and black screen
===============

*/
// Variable List as a reference to HTML elements:
var startButton = document.getElementById("start-btn"); // start button
var timerDisplay = document.getElementById("timer"); // timer
var questionElement = document.getElementById("questions"); // question
var choicesElement = document.getElementById("choices"); // choices
var submitButton = document.getElementById("submit"); // submit button
var initialsInput = document.getElementById("initials"); // initial name
var feedbackElement = document.getElementById("feedback"); // feedback

// Variable List for Logic:
var currentQuestionIndex = 0;
var time = 100;
var timerId;
var score = 0;

// Function List:
// 1. Start Quiz
// 2. Get Question
// 3. Question Click
// 4. Quiz End
// 5. Clock Tick
// 6. Save Highscore
// 7. Check Highscore

// 1. Start Quiz:
function startQuiz() {
  const startScreenEl = document.getElementById("start-screen");
  startScreenEl.classList.add("hide");
  questionElement.classList.remove("hide");
  timerId = setInterval(clockTick, 1000);
  timerDisplay.innerText = time;
  getQuestion();
}

// 2. Get Question
function getQuestion() {
  // get current question object from array
  const currentQuestion = questions[currentQuestionIndex];
  // console.log(currentQuestion);

  // update title with current question
  const titleEl = document.getElementById("question-title");
  titleEl.innerText = currentQuestion.title;

  // clear out any old question choices by setting innerHTML to empty string
  choicesElement.innerHTML = "";

  // loop through choices using a for loop
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    const choiceNode = document.createElement("button");
    choiceNode.classList.add("choice");
    choiceNode.value = currentQuestion.choices[i];

    choiceNode.innerText = `${i + 1}. ${currentQuestion.choices[i]}`;

    // attach click event listener to each choice
    choiceNode.addEventListener("click", questionClick);

    // display on the page
    choicesElement.appendChild(choiceNode);
  }
}

// 3. Question Click
function questionClick() {
  const selectedAnswer = this.value;
  const correctAnswer = questions[currentQuestionIndex].answer;

  const timePenalty = selectedAnswer !== correctAnswer ? 10 : 0;
  time = Math.max(time - timePenalty, 0);

  timerDisplay.innerHTML = time;

  if (selectedAnswer !== correctAnswer) {
    sfxWrong.play();
    feedbackElement.style.color = "red";
    feedbackElement.innerHTML = "Wrong!";
  } else {
    sfxRight.play();
    feedbackElement.style.color = "green";
    feedbackElement.innerHTML = "Correct!";
  }

  feedbackElement.style.display = "block";
  setTimeout(() => (feedbackElement.style.display = "none"), 300);

  // using ternary operator to check if we've run out of questions
  currentQuestionIndex++;
  currentQuestionIndex === questions.length ? quizEnd() : getQuestion();
}

// 3.1 Playing sound effect
const sfxRight = new Audio("assets/sfx/correct.wav");
sfxRight.load();

const sfxWrong = new Audio("assets/sfx/wrong.mp3");
sfxWrong.load();

// 4. Quiz End
function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // calculate the final score as a percentage of the maximum score (100)
  const finalScore = Math.max(Math.floor((time / 100) * 100), 0);

  // show end screen
  const endScreenEl = document.getElementById("end-screen");
  endScreenEl.classList.remove("hide");

  // show final score
  const finalScoreEl = document.getElementById("final-score");
  finalScoreEl.innerText = `${finalScore}%`; // display final score as a percentage of the maximum score (100)

  // hide questions section
  questionElement.classList.add("hide");
}

// 5. Clock Tick
function clockTick() {
  // Reduce time by 1
  time = time - 1;

  // Update time display
  timerDisplay.textContent = time;

  // Check if time is up
  if (time === 0) {
    quizEnd();
  }
}

// 6. Save Highscore
function saveHighscore() {
  var initials = initialsInput.value.trim();

  if (initials !== "") {
    // Retrieve existing highscores from localStorage, or an empty array if none exists
    var highscores = [];
    var storedScores = localStorage.getItem("highscores");

    if (storedScores !== null) {
      highscores = JSON.parse(storedScores);
    }

    // Add new score to highscores array
    var newScore = {
      score: time,
      initials: initials,
    };
    var highscores = [...highscores, newScore];

    // Save updated highscores array to localStorage
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // Navigate to highscores page
    location.href = "highscores.html";
  }
}

// 6.1 Check for enter key
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to start quiz
startButton.onclick = startQuiz;

// user clicks button to submit initials
submitButton.onclick = saveHighscore;

initialsInput.onkeyup = checkForEnter;
