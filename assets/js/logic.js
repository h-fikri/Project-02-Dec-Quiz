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
var questionElement = document.getElementById("question"); // question
var choicesElement = document.getElementById("choices"); // choices
var submitButton = document.getElementById("submit"); // submit button
var initialsInput = document.getElementById("initials"); // initial name
var feedbackElement = document.getElementById("feedback"); // feedback

// Variable List for Logic:
var currentQuestionIndex = 0;
var time = questions.length * 50;
var timerId;
var score = 0;

// Function List:
// there are a number of function we need to do:
// 1. Start Quiz
// 2. Get Question
// 3. Question Click
// 4. Quiz End
// 5. Clock Tick
// 6. Save Highscore
// 7. Check Highscore

// 1. Start Quiz:
function startQuiz() {
  // hide start screen by adding class hide
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // un-hide questions section by removing class
  questionElement.removeAttribute("class");

  // start milisecond timer by calling clockTick function that we will do later.
  timerId = setInterval(clockTick, 1000);

  // show starting time on page by setting textContent of timerDisplay
  timerDisplay.textContent = time;

  getQuestion();
}

// console.log(startQuiz());

/* The code above does the following:
1. hides the start screen by adding the class hide
2. unhides the questions section by removing the class hide
3. starts the timer by calling clockTick function
4. shows the timer on the page by setting the textContent of timerDisplay
5. calls the function getQuestion */

// 2. Get Question
function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices by setting innerHTML to empty string
  choicesElement.innerHTML = "";

  // using forEach to loop the choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesElement.appendChild(choiceNode);
  });
}

console.log(getQuestion());
// 3.1 Playing sound effect
const sfxRight = new Audio("assets/sfx/right.mp3");
sfxRight.load();

const sfxWrong = new Audio("assets/sfx/wrong.mp3");
sfxWrong.load();

// 3. Question Click
function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerDisplay.textContent = time;

    // play "wrong" sound effect
    sfxWrong.play();

    feedbackElement.textContent = "Wrong!";
    feedbackElement.style.color = "red";
  } else {
    // play "right" sound effect
    sfxRight.play();

    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "green";
  }

  // flash right/wrong feedback on page for half a second
  feedbackElement.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackElement.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
// 4. Quiz End
// 5. Clock Tick
// 6. Save Highscore
// 7. Check Highscore
