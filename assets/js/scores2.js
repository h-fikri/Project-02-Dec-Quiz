function printHighscores() {
  // Get the highscores from localStorage or set to an empty array
  // Retrieve highscores from localStorage or create a new empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // Sort the highscores by score property in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Get the highscores element on the page
  var highscoresEl = document.getElementById("highscores");

  // Clear any existing highscores
  highscoresEl.innerHTML = "";

  // Iterate over each high score
  for (var i = 0; i < highscores.length; i++) {
    var score = highscores[i];
    var liEl = document.createElement("li");
    liEl.textContent = score.initials + " - " + score.score;
    highscoresEl.appendChild(liEl);
  }
}

document.getElementById("clear").onclick = function () {
  localStorage.clear();
  location.reload();
};

// Display the highscores on page load
printHighscores();
