Simone Game 
=============
A milestone project displaying capabilities in HMTL, CSS, Javascript, jQuery and Jasmine.
The project is a playable memory game similar to the popular Simon toy. 
The game offers users the chance to play, memorizing a series of colors and attempting to recreate the pattern. The game makes use of a difficulty level and leaderboard for scores.

UX
---------------
The main intended user is someone who wishes to play the Simon memory game. Alterations on this user include:
* for users who are not wholly familiar with the game, the easy mode offers a way to play with reduced difficulty - catering to the user type
* similarly, for users who are familiar with the game and welcome a challenge, the hard mode offers a way to play with increased difficulty
* for users who enjoy the competitive side of the game, the leaderboard caters to this preference. As this leaderboard is only saved locally (explained in detail later on), this user type may not be fully catered for.
* users who wish to play the game on mobile or desktop, the site is fully responsive - catering to both user types

Wireframes can be found [here](https://github.com/mdenoronha/milestone-project-2/tree/master/assets/wireframes)

The following alterations were made after the mock-up phase:
* The timer/start game button design was changed to resemble a neon text display
* Some alterations on colors
* The addition of a grey header bar across the top of the screen

Features
---------------
### Existing Features ###
*Functionality of the game*
* Users can click 'start game' to begin the Simone memory game. This creates a random list of colors which are presented to the user
* After colors are highlighted, users are able to input their guess by clicking on one of the color selectors
* The game tracks users' guesses and ends the game when an incorrect guess is made. For correct guesses the game continues.
* At the end of each turn, another random color is added to the list and the next turn commences.
* The counter display informs the user of their current score/the turn they are on
* If the user does not make a guess in the allotted time, the game is concluded
* The allotted time is displayed to the user, with a countdown to inform how much time is left
* A 'Memorise' message is displayed to inform the user when they are not required to make an input but instead need only memorise the pattern
* On game over, users are able to play the game again - by clicking the newly updated 'play again' button
*Other features*
* On game over, if the user's score makes the leaderboard, the user is informed with a 'you've made the leaderboard' pop-up modal
* Users are able to input their name onto the leaderboard if they reach an appropriate score. This (and their score) is added to the leaderboard and shown to the user
* Users are able to see the leaderboard at any time, by clicking the 'leaderboard' button
* Users are able to change the difficulty of the game at any time by clicking the 'easy' or 'hard' difficulty options
* The easy difficulty option adds the following effects:
	* Time limit set to 6 seconds 
	* Color highlight time set to 900 milliseconds
	* 2 random colors to guess on first round
* The hard difficulty option adds the following effects:
	* Time limit set to 3 seconds
	* Color highlight time set to 700 milliseconds
	* 4 random colors to guess on first round

### Features Left to Implement ###
* A possible third difficulty option can be added; resulting in easy, medium and hard options - which is standard
* As the game makes use of only front end developing languages, it is not possible for a user to update the score leaderboards saved on the server. Scores are only stored locally and reset to the original list once the user refreshes. A feature to implement is one that allows the user to post their score to the leaderboard documents - so that it will be saved after refreshes and visible to other users.

Technologies Used
---------------
* jQuery was used to aid selecting and updating the DOM, the functionality of the game, etc.
* Jasmine was used to creating a testing document allow for a number of key functionalities to be tested
* Jasmine-jQuery framework was used to allow the testing document to test DOM changes

Functionality
---------------
* The game starts with the Gameinit() function, which is run when user clicks the relevant button. This function resets a number of variables (the colors to be guessed, the turn of the user, etc.) and depending on the difficulty runs randomColor() and highlightColors()
* randomColor() pushes a number of random numbers between 0 and 3 (which relate to a color) to the colors array. HighlightColors() highlights each of these colors in order
* After that is completed gameInit() runs timer() and activateColors()
* timer() starts a timer based on difficulty, which when completed runs gameOver() (which updates all elements as though the game is not playing). It also functions that update the timer display.
* activateColors() adds the class 'active' to all color selectors. If a color selector is clicked on when it has the class 'active', the checkColor() function is run.
* The checkColor() function checks if the color selected is a correct guess. If it is their first guess of the turn, it must match the first color in the colors array. If the guess is correct, the timer is reset. If the guess is wrong gameOver() is run. If the guess is correct and it is the last color of the color array, newRoundInit() is run.
* newRoundInit() removes the 'active' classes from the selectors, runs randomColor() and highlightColors() first then timer() and activateColors() once highlightColors() is completed. The function also adds one to turn - a variable which tracks how many turns the user has completed (i.e. their score).
* The user can again click on the color selectors to play the next round
* On page load, the leaderboard scores from easy-scores.csv and hard-scores.csv are loaded
* Once gameOver() is run, if the users score is in the top ten of users scores (for the respective difficulty), the showScoresForm() is run. This shows a form to the user for them to enter their name. On submitting the form submitSocres() adds the score to an array of leaderboard scores, which is printed on a table (using showTable()).
* When the game is not running, a user can select the 'easy' or 'hard' buttons, when doing so a global difficulty variable is updated. A number of functions run differently depending on the difficulty variable (e.g. 4 colors are added on game start by randomColors(), showTable() displays hardScores or easyScores, etc.)

Testing
---------------
Jasmine testing document can be found [here](https://mdenoronha.github.io/milestone-project-2/test.html)

### Testing through Jasmine ###
Test  | Status
------------- | -------------
Running function randomColor with input of 3 creates an array with length 3 | Successful
Each variable in the array is a random number between 0 and 3 | Successful
Appropriate Functions Should Run Based on Guess |
If the user has correctly guessed the last color in the series clearTimeout should be called with textTimeOut | Successful
If the user has correctly guessed the last color in the series clearTimeout should be called with timeout | Successful
If the user has correctly guessed the last color in the series newRoundInit should be called | Successful
If the user has incorrectly guessed the last color in the series gameOver should be called | Successful
If the user has incorrectly guessed the last color in the series newRoundInit should not be called | Successful
If the user has correctly guessed a color (exc. last) timer should be called | Successful
If the user has correctly guessed a color (exc. last) clearTimeout should be called with textTimeOut | Successful
If the user has correctly guessed a color (exc. last) clearTimeout should be called with timeout | Successful
If the user has correctly guessed a color (exc. last) newRoundInit should not be called | Successful
If the user has incorrectly guessed a color (exc. last) gameOver should be called | Successful
If the user has incorrectly guessed a color (exc. last) newRoundInit should not be called | Successful
When highlightColors is called, the corresponding color should not have a 'highlighted' class for 299 milliseconds | Successful
When highlightColors is called, the corresponding color should have a 'highlighted' class for 300-899 milliseconds (on easy) | Successful
When highlightColors is called, the corresponding color should not have a 'highlighted' class after 900 milliseconds (on easy) | Successful
On easy, if the user does not guess the color after 6 seconds, gameOver is called | Successful
On hard, if the user does not guess the color after 3 seconds, gameOver is called | Successful
If the user scores in the top 10 leaderboard, submit score modal should have display block | Successful
If the user did not score in the top 10 leaderboard, submit score modal should not have display block | Successful


### Manual Testing ###
Test  | Status
------------- | -------------
Easy Mode Selected |
On clicking 'Start Game', no options (difficulty, leaderboard, start game) are selectable | Successful
On clicking 'Start Game', a series of 2 colors are highlighted | Successful
This series of colors are random (checked by activating start game multiple times) | Successful
When colors are highlighting, display changes to 'Memorise' | Successful
Once colors have completed highlighting, display changes to timer | Successful
Once colors have completed highlighting, timer counts down from 6 | Successful
Once timer completed countdown, selectors can not be selected and option buttons are selectable again | Successful
Once timer completed countdown, display changes to 'Play again' | Successful
Once timer completed countdown, counter display changes back to 0 (requires one successful round to text) | Successful
By clicking colors in previously shown pattern (exc. last), no elements change | Successful
By clicking incorrect color in previously shown pattern, selectors can not be selected and option buttons are selectable again | Successful
By clicking incorrect color in previously shown pattern, display changes to 'Play again' | Successful
By clicking incorrect color in previously shown pattern, counter display changes back to 0 (requires one successful round to text) | Successful
By clicking last color in previously shown pattern, selectors can not be selected | Successful
By clicking last color in previously shown pattern, a series of colors are highlighted (with one more than last turn) | Successful
By clicking last color in previously shown pattern, counter display updates to the current turn the user is on | Successful
When clicking 'leaderboard', the easy leaderboard modal is visible | Successful
Easy leaderboard modal contains a table of scores from easyscores.csv | Successful
Leaderboard is in order from largest to smallest score | Successful
By clicking incorrect color in previously shown pattern, if the users score is more than the score of the tenth largest score in easyscores.csv, then a form is visible | Successful
User cannot exceed 13 characters on the form | Successful
On submitting form, the input is added to the easy leaderboard table | Successful
On submitting form, the users turn/score is added to the easy leaderboard table | Successful
The position for these additions keeps the easy leaderboard's order from largest to smallest score | Successful
By not submitting form, no changes are made to the easy leaderboard | Successful
When clicking on difficulty option, selected background color (green) is displayed on selected option | Successful
When hard is selected |
The time the colors are highlighted for is 700 milliseconds | Successful
On clicking 'Start Game', a series of 4 colors are highlighted | Successful
Once colors have completed highlighting, timer counts down from 3 | Successful
When clicking 'leaderboard', the hard leaderboard modal is visible | Successful
Hard leaderboard modal contains a table of scores from hardscores.csv | Successful
By clicking incorrect color in previously shown pattern, if the users score is more than the score of the tenth largest score in hardscores.csv, then a form is visible | Successful
On submitting form, the input is added to the hard leaderboard table | Successful
On submitting form, the users turn/score is added to the hard leaderboard table | Successful
The position for these additions keeps the hard leaderboard's order from largest to smallest score | Successful
By not submitting form, no changes are made to the hard leaderboard | Successful


Deployment
---------------
Project has been deployed to GitHub Pages and is accessible [here](https://mdenoronha.github.io/milestone-project-2/).
The process for deployment was as follows: 
* Project pushed to GitHub repository
* Navigated to Settings in relevant GitHub repository
* Under GitHub Pages, selected relevant branch (master branch) and saved

Credits
---------------
* Assistance from [here](https://www.w3schools.com/howto/howto_css_modals.asp) for modal usage


Credits
---------------
* Sound effects provided by [http://www.universal-soundbank.com](http://www.universal-soundbank.com)
