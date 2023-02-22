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
var startButton = document.getElementById("start-btn");
var timerDisplay = document.getElementById("timer");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var submitButton = document.getElementById("submit");
var initialsInput = document.getElementById("initials"); // initial name
var feedbackElement = document.getElementById("feedback");

// Variable List for Logic:
var currentQuestionIndex = 0;
var time = questions.length * 25;
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
