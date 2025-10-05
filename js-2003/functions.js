/* 
	Title: functions.js
	Author: Amanda Scott
	Date: 13.10.02
	Description: Javascript functions needed for the game of MasterMind.
	References: All artworks are originals by Amanda Scott.
	Note on Javascript employed for this project: An Object-Oriented approach has been taken to implement the various parts of this game.
*/

/* Declare Global Variables */
var clock; //the clock
var browser; //the browser - used for detecting the user's browser version and type
var board; //array - the MasterMind game board
var game; //the mastermind game object
var size = 20; //the size of the images (pegs)
var startTag = '<img height="' + size + '" src="images/'; //beginning of peg image html tag
var endTag = '.gif" width="' + size + '">'; //end of peg image html tag

/* initialise */
function initialise() { //begin function
	browser = broswerDetect(); /* call browserDetect() function and store the result
															in the browser variable */
	if (browser.dom) { // if the browser is DOM compliant
		header(); //call header() function - adds content to document header
		game = new Game(); //create  new game object
		alert('Click on the peg you wish to play first to begin the game!');
		drawPegs(); //give the user some pegs to choose from!
	} else { // else make sure to alert the user that they need a newer browser to view the page
		bodyNoJS(); //call bodyNoJS() function
	} //end if
}; //end function

/* bodyNoJS - writes a message to the user that their browser is too old to view the page */
function bodyNoJS() { //begin function
	var string = 'Your browser needs to be updated to view this page.\nPlease update to the latest version of '; //set the output string
	if (browser.ie) { //if the browser is IE
		string = string + 'Internet Explorer.'; //personalise output string
	} else if (browser.ns4) { // if the browser is NS
		string = string + 'Netscape Navigator.'; //personalise output string
	} else { //else the browser could be Mozilla or Opera or someother obscure browser
		string = string + 'your browser.';// personalise output string
	} //end if
	alert(string); //tell the user the output string by using an alert box
} //end function

/* browserDetect - detect which browser the user has, by version and type */
function broswerDetect() { //begin function
  version = navigator.appVersion; //get the browser version from the navigator object
  this.dom = document.getElementById ? 1 : 0; //check for DOM compliance
  this.ie5 = (version.indexOf("MSIE 5" ) > -1 && this.dom) ? 1 : 0; //check for IE version 5
  this.ie6 = (version.indexOf("MSIE 6") > -1 && this.dom) ? 1 : 0; //check for IE version 6
  this.ie4 = (document.all && !this.dom) ? 1 : 0; //check for IE version 4 and below
  this.ie = (this.ie4 || this.ie5 || this.ie6); //check for browser type IE
  this.ns6 = (this.dom && parseInt(version) >= 5) ? 1 : 0; //check for NS version 6 and above
  this.ns4 = (document.layers && !this.dom) ? 1 : 0; //check for NS version 4 and below
  return this; //return an object with the above properties as a result of calling this function
}; //end function

/* header - puts information in the header element of the HTML page. */
function header() { //begin function
	clock = new Date(); //call the Date object's constructor function
	document.getElementById("header").innerHTML = clock.toLocaleString(); /* get the local string
																								format of the date object (our instance called clock)
																								and put it in the HTML page with the id "header" */
	setTimeout("header()", 1000); /* set the timeout of this document to call the function "header"
																again in 1 second (1000 milliseconds) */
}; //end function

/* drawPegs - to show the user the pegs they can choose to play the game with */
function drawPegs() { //begin function
	tag1 = '<span onclick="pegChoice('; //start tag to add identification to input pegs
	tag2 = ');">'; //middle bit
	tag3 = '</span>'; //end tag to add identification to input pegs
	var pegChooser = ''; //to hold the possible peg colour choices
	for (i in colours) { //cycle thru colours defined as pegs to show to user as peg choices
		pegChooser = pegChooser + tag1 + i + tag2 + startTag + colours[i] + endTag + tag3; //add another image
	} //end for loop
	document.getElementById("pegs").innerHTML = '<table border="0" cellpadding="0" cellspacing="10"><tr><td class="mainOutline"><table border="0" cellpadding="4" cellspacing="1"><tr><td class="normal">Click a peg: </td><td class="normal">' +
			pegChooser +
		'</td></tr><tr><td class="normal" colspan="2">Unfortunately there is a bug - you must click on your 4 pegs, only then the result will display.</td></tr></table></td></tr></table>'; //set the pegs element of the web page to show the pegs that the user can choose from
}; //end function

/* pegChoice - the main checking routine to see if the user has won or not, and if the game is still going to produce the output */
function pegChoice(choice) { //begin function
	if (!game.isOver()) { //while the use has not won nor taken too many guesses
		var guessNumber = game.guessing(); //guess number is the peg we are up to in the current guess - if a guess is in progress
		if ((guessNumber>=0) && (guessNumber<=codeLength-1)) { //if we are currently in the middle of a guess
			game.makeGuess(choice, guessNumber); //add the input to the current guess
		} //end if 
		if ((guessNumber == undefined) || (guessNumber==codeLength-1)) {//if the guess is finished - get the result and display
			game.getResult(); //get the result of the user's guess
		} //end if
		game.displayBoard(size, startTag, endTag); //call the displayBoard function to output the board to the screen
	} //end if
	if (game.isOver()) { //check if the game is over
		if (game.isWon()) { //if the user won the game
			congratulations(); //the game has been won by the user
		} else { //otherwise if the user lost the game
			commiserations(); //the game has been lost by the user
		} //end if
	} //end if
}; //end function

/* showInstructions - opens a new smaller window with instructions on how to play the game */
function showInstructions() { //begin function
	window.open('instructions.html','instructionsWindow','height=420,toolbar=no,width=300'); //open a new window, the contents being instructions.html, 420pixels high 300 pixels wide, and no toolbar
	return false; // so the calling page does not reload itself
}; //end function

/* congratulations - lets the user know they won! */
function congratulations() { //begin function
	document.getElementById("result").innerHTML = '<table border="0" cellpadding="0" cellspacing="10"><tr><td class="mainOutline"><table border="0" cellpadding="4" cellspacing="1"><tr><td class="normal"><span class="result">Congratulations, you win!</span> The last code you entered was correct. Please refresh the page to play again.</td></tr>' +
	'<tr><td class="normal"><form name="details"><span class="normal">Please enter your details for the score table:</span><br><br>Firstname: <input id="firstname" maxlength="30" name="firstname" size="30" type="text" value=""><br><br>Lastname: <input id="lastname" maxlength="30" name="lastname" size="30" type="text" value=""><br><br><input type="button" onclick="checkEntries();" value="Submit"></form></td></tr>' +
'</table></td></tr></table>'; //let them know they can have fun all over again!
}; //end function

/* commiserations - lets the user know they lost :( */
function commiserations() { //begin function
	document.getElementById("result").innerHTML = '<table border="0" cellpadding="0" cellspacing="10"><tr><td class="mainOutline"><table border="0" cellpadding="4" cellspacing="1"><tr><td class="normal"><span class="result">Sorry!</span> The game is over. The secret code was: ' + game.getSecret(startTag, endTag); + '</td></tr></table></td></tr></table>'; //make the secret code known to all.
}; //end function

/* checkEntries - form validation */
function checkEntries() { //begin function
	var form = document.details; //assign the value of the form called "details" to a variable called "form"
	var pattern = /[^a-zA-Z]/; //create a regular expression that will only allow users to enter alphanumeric characters in the name fields of the form.
	if ((form.firstname.value == "") || (form.lastname.value == "")) { //if either of the fields are blank
		alert('Please enter a value in every field.'); //ask for values in the fields
	} else if (pattern.exec(form.firstname.value)) { //check the first name for characters other than letters
		alert('Please only use letters in the First Name field.'); //ask the user to only use letters
	} else if (pattern.exec(form.lastname.value)) { //check the last name for characters other than letters
		alert('Please only use letters in the Last Name field.'); //ask the user to only use letters
	} else { //otherwise
		return false;
	} //end if
} //end function