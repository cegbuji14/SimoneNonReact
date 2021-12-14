//Color array for random colors to be added
var colors = [];
//How many colors in array have been highlighted
var colorHighlightCount = 0;
//How long will it take to highlight those colors
var colorHighlightLength = 0;
//How long the highlight should last (depending on difficulty)
var highlightedTime;
//Timeout variables for timer
var timeOut;
var textTimeOut;
//Time left on timer
var countdownTimeLeft;
//Turn user is currently on i.e. score
var turn = 0;
//Which color in array does user have to guess
var colorNumber = 0;
//Difficulty (initially on easy)
var difficulty = 2;
//Scores from easy-scores.csv/hard-scores.csv
var hardScores;
var easyScores;
var sound0 = new Audio();
sound0.src = "http://s1download-universal-soundbank.com/mp3/sounds/20839.mp3";
var sound1 = new Audio();
sound1.src = "http://s1download-universal-soundbank.com/mp3/sounds/20844.mp3";
var sound2 = new Audio();
sound2.src = "http://s1download-universal-soundbank.com/mp3/sounds/20842.mp3";
var sound3 = new Audio();
sound3.src = "http://s1download-universal-soundbank.com/mp3/sounds/20841.mp3";
var leaderboardSound = new Audio();
leaderboardSound.src = "http://s1download-universal-soundbank.com/mp3/sounds/20843.mp3";
var gameOverSound = new Audio();
gameOverSound.src = "http://s1download-universal-soundbank.com/mp3/sounds/20853.mp3";
var sounds = [sound0, sound1, sound2, sound3];


//Load leaderboard scores on load

//Load hard scores for leaderboard
function loadHardScores() {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "assets/scores/hard-scores.csv");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            hardScores = JSON.parse(this.responseText);
            hardScores.sort(function(a, b) {
                return b.score - a.score;
            });
            return hardScores;
        }
    };
}

//Load easy scores for leaderboard
function loadEasyScores() {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "assets/scores/easy-scores.csv");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            easyScores = JSON.parse(this.responseText);
            easyScores.sort(function(a, b) {
                return b.score - a.score;
            });
            return easyScores;
        }
    };
}


loadHardScores();
loadEasyScores();


//Start game by resetting all values to their initial point, resetting all HTML to
//their initial point and running functions to start game
function gameInit() {
    resetVariables();
    deactivateMenuBar();
    //If hard difficulty is selected
    if (difficulty === 1) {
        highlightedTime = 700;
        randomColor(4);
        setTimeout(timer, 700 * 4);
        setTimeout(activateColors, 700 * 4);
        highlightColors();
    }
    //If easy difficulty is selected
    else {
        highlightedTime = 900;
        randomColor(2);
        highlightColors();
        setTimeout(timer, highlightedTime * 2);
        setTimeout(activateColors, highlightedTime * 2);
    }
}

//Highlight colors at beginning of round
function highlightColors() {
    //colorHighlightCount tracks color currently highlighting in colors array
    //If there are no more colors left to hightlight, function completes
    if (colorHighlightCount < colors.length) {
        $(".start-game").html('')
        if ($("#" + colors[colorHighlightCount]).hasClass("blue")) {
            setTimeout(function() {
                $("#" + colors[colorHighlightCount]).addClass("blue-highlighted");
            }, 300);
            setTimeout(function() {
                sounds[colors[colorHighlightCount]].play();
            }, 500);
        }
        else if ($("#" + colors[colorHighlightCount]).hasClass("red")) {
            setTimeout(function() {
                $("#" + colors[colorHighlightCount]).addClass("red-highlighted");
            }, 300);
            setTimeout(function() {
                sounds[colors[colorHighlightCount]].play();
            }, 500);
        }
        else if ($("#" + colors[colorHighlightCount]).hasClass("green")) {
            setTimeout(function() {
                $("#" + colors[colorHighlightCount]).addClass("green-highlighted");
            }, 300);
            setTimeout(function() {
                sounds[colors[colorHighlightCount]].play();
            }, 500);
        }
        else if ($("#" + colors[colorHighlightCount]).hasClass("yellow")) {
            setTimeout(function() {
                $("#" + colors[colorHighlightCount]).addClass("yellow-highlighted");
            }, 300);
            setTimeout(function() {
                sounds[colors[colorHighlightCount]].play();
            }, 500);
        }

        setTimeout(function() {
            colorHighlightCount++;
            highlightColors();
            $("div").removeClass("blue-highlighted");
            $("div").removeClass("red-highlighted");
            $("div").removeClass("yellow-highlighted");
            $("div").removeClass("green-highlighted");
        }, highlightedTime);
    }
}

//Make menu bar button unselectable
function deactivateMenuBar() {
    $(".easy").removeClass("active-button");
    $(".hard").removeClass("active-button");
    $(".show-scores").removeClass("active-button");
}

//Push a random color to colors a certain number of times
function randomColor(numOfTimes) {
    for (i = 0; i < numOfTimes; i++) {
        var newColor = Math.floor(Math.random() * 4);
        colors.push(newColor);
    }
    return colors;
}

//Reset all variables to initial point
function resetVariables() {
    turn = 0;
    colorNumber = 0;
    colorHighlightCount = 0;
    colorHighlightLength = 0;
    colors = [];
    $(".table").html("");
    $(".leaderboard-title").css("display", "none");
}

//Reset timer to initial point (based on difficulty) and run countdownAsText
function countdownReset() {
    countdownTimeLeft = 3 * difficulty;
    countdownAsText();
}

//Update the display with the amount of time left on timer
function countdownAsText() {
    if (countdownTimeLeft > 0) {
        countdownTimeLeft--;

        $(".start-game").html(`TIME LEFT: ${countdownTimeLeft + 1}`);

        if (countdownTimeLeft > 0) {
            textTimeOut = setTimeout('countdownAsText()', 1000);
        }
    }
}

// Timer which ends game at completion
function timer() {
    countdownReset();
    timeOut = setTimeout(function() {
        gameOver();
    }, 3000 * difficulty);
}

//On game over, reset all game functions and HTML to intiial point, and show leaderboard form
function gameOver() {
    $(".countdown-text").html("");
    showScoresForm();
    deactivateColors();
    clearTimeout(timeOut);
    clearTimeout(textTimeOut);
    $(".counter").html("0");
    $(".easy").addClass("active-button");
    $(".hard").addClass("active-button");
    $(".start-game").addClass("active-start");
    $(".show-scores").addClass("active-button");
    $(".start-game").css("visibility", "visible");
    $(".start-game").html("PLAY AGAIN");
}

//Check if color clicked on was correct
function checkColor(e) {
    //If last color in the array
    if (colorNumber == colors.length - 1) {
        //If color is correct
        if (e.target.id == colors[colorNumber]) {
            newRoundInit();
            clearTimeout(timeOut);
            clearTimeout(textTimeOut);
            sounds[e.target.id].play();
        }
        //If color is wrong
        else {
            //Need to put all below in game over function
            gameOver();
        }
    }
    //If not last color in the array
    else {
        //If color is correct
        if (e.target.id == colors[colorNumber]) {
            clearTimeout(timeOut);
            clearTimeout(textTimeOut);
            timer();
            sounds[e.target.id].play();
            //Tracks which color in an array the user has to guess next
            colorNumber++;
        }
        //If color is wrong
        else {
            gameOver();
        }
    }
}

//Make colors active and clickable in game
function activateColors() {
    $(".selector").addClass("active");
}

//Make colors inactive and not clickable
function deactivateColors() {
    $(".selector").removeClass("active");
}

//Start next round
function newRoundInit() {
    clearTimeout(timeOut);
    //Makes colors not selectable during highlightColors
    deactivateColors();
    //Resets how many colors have been highlighted to 0
    colorHighlightCount = 0;
    //Adds one to the turn the user is currently on
    turn++;
    //Resets the color the user has to guess to the first in array
    colorNumber = 0;
    randomColor(1);
    highlightColors();
    //How long hightlightColors will take depending on how many colors in array
    colorHighlightLength = (colors.length) * highlightedTime;
    //Starts timer and allows colors to be selectable after highlightColors completed
    setTimeout(timer, colorHighlightLength);
    setTimeout(activateColors, colorHighlightLength);
    $(".counter").html(turn);
}


//Click on active tiles, checkColor runs to check if correct colour is clicked
$(document).on('click', '.active', function(e) {
    checkColor(e);
});


//When start button clicked (if not currently playing game), starts game
$(".start-game").on('click', function() {
    if ($(this).hasClass('active-start')) {
        resetVariables();
        gameInit();
        $(this).removeClass("active-start");
    }
});

//On clicking easy button (and game is not playing) updates difficulty to 2 and relevant HTML
$(".easy").on("click", function() {
    if ($(this).hasClass("active-button")) {
        $(".easy").removeClass("not-selected-difficulty").addClass("selected-difficulty");
        $(".hard").removeClass("selected-difficulty").addClass("not-selected-difficulty");
        difficulty = 2;
        $(".table").html("");
        $(".leaderboard-title").css("display", "none");
    }
});

//On clicking easy button (and game is not playing) updates difficulty to 1 and relevant HTML
$(".hard").on("click", function() {
    if ($(this).hasClass("active-button")) {
        $(".easy").addClass("not-selected-difficulty").removeClass("selected-difficulty");
        $(".hard").addClass("selected-difficulty").removeClass("not-selected-difficulty");
        difficulty = 1;
        $(".table").html("");
        $(".leaderboard-title").css("display", "none");
    }
});

//Leaderboard functionality

//Show enter score form on game ending
function showScoresForm() {
    //Sorts scores in order for leaderboard
    hardScores.sort(function(a, b) {
        return b.score - a.score;
    });
    easyScores.sort(function(a, b) {
        return b.score - a.score;
    });
    //If the score the user has gained is more than the lowest score in leaderboard, form appears
    //If hard
    if (difficulty == 1) {
        if (turn > hardScores[9].score) {
            $(".modal").css("display", "block");
            leaderboardSound.play();
        }
        else {
            gameOverSound.play();
        }
    }
    //If easy
    else {
        if (turn > easyScores[9].score) {
            $(".modal").css("display", "block");
            leaderboardSound.play();
        }
        else {
            gameOverSound.play();
        }
    }
}

//Users name and score is added to leaderboard (locally, not hardscores.csv or easyscores.csv)
function submitScores(event) {

    var tempScore = { "score": turn, "name": ($(this).serializeArray())[0].value.toUpperCase()}
    //If hard
    if (difficulty === 1) {
        //pushes new score into hardScores for leaderboard
        hardScores.push(tempScore);
        hardScores.sort(function(a, b) {
            return b.score - a.score;
        });
        showTable();
        //If easy
    }
    else {
        //pushes new score into easyScores for leaderboard
        easyScores.push(tempScore);
        easyScores.sort(function(a, b) {
            return b.score - a.score;
        });
        showTable();
    }
    $(".submit-score").css("display", "none")
    //Prevents page from reloading as score is stored locally
    event.preventDefault();
}

//Populates leaderboard with data from easy/hard scores
function showTable() {
    var tablerow = [];

    //If hard
    $(".leaderboard-title").css("display", "block")
    $(".leaderboard-title").html(`<h2>HARD<br>LEADERBOARD</h2>`)
    if (difficulty === 1) {
        tablerow.push(`<tr><th></th><th>Name</th><th>Score</th></tr>`);
        for (var i = 0; i < hardScores.length; i++) {
            if (i === 10) {
                break;
            }
            tablerow.push(`<tr><td>${i + 1}</td><td>${hardScores[i].name.toUpperCase()}</td><td>${hardScores[i].score}</td></tr>`);
        }

    }
    //If easy
    else {
        $(".leaderboard-title").css("display", "block");
        $(".leaderboard-title").html(`<h2>EASY<br>LEADERBOARD</h2>`);
        tablerow.push(`<tr><th></th><th>Name</th><th>Score</th></tr>`);
        for (var i = 0; i < easyScores.length; i++) {
            if (i === 10) {
                break;
            }
            tablerow.push(`<tr><td>${i + 1}</td><td>${easyScores[i].name.toUpperCase()}</td><td>${easyScores[i].score}</td></tr>`);
        }
    }

    $(".table").html(tablerow);
}

//On clicking leaderboard (not during game) leaderboard is shown
$(".show-scores").on("click", function() {
    if ($(this).hasClass("active-button")) {
        $(".modal").css("display", "block");
        $(".submit-score").css("display", "none");
        $(".leaderboard-title").css("display", "none");
        $(".table").html("");
        showTable();
    }
});


//On clicking submit, users name and score is added to leaderboard (locally, not hardscores.csv or easyscores.csv)
$(".submit-score").submit(submitScores);

//Assistance on pop up provided by https://www.w3schools.com/howto/howto_css_modals.asp
//Click close button, pop up closes
$(".close").on("click", function() {
    $(".modal").css("display", "none");
    $(".submit-score").css("display", "block");
});

//Click outside pop up, it closes
$(window).on("click", function(e) {
    if ($(event.target).hasClass('modal')) {
        $(".modal").css("display", "none");
        $(".submit-score").css("display", "block");
    }
});
