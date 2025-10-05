/* 
	Title: game.js
	Author: Amanda Scott
	Date: 13.10.02
	Description: Javascript functions needed for the game class.
*/

/* Declare Global Variables */
var maxGuesses = 16; //the maximum number of allowable guesses, over this limit means the game is lost!

/* GameBase - the base of the Game class - will hold details about the game board, which consists of "maxGuesses" rows of guesses and results */
function GameBase() {	//begin constructor function
	var i = 0; //used for loop iterations
	var secret = new Code(); //array - to hold the pegs in the secret code
	secret.makeCode(); //create a new secret code
	var countGuesses = 0; //the user has not made any guesses yet
	var board = new Array(maxGuesses); //the use will be allowed to make "maxGuesses" guesses of the secret code
	for (i=0; i<maxGuesses; i++) { //for loop to initialise the board array
		board[i] = new Row(); //create a new blank row
	} //end loop

	/* isOver -  tests whether the game is won or lost or neither yet */
	this.isOver = function() { //begin internal function
		if (this.isWon() || (countGuesses >= maxGuesses)) { //if the game has been won by the user because they guessed the code, or if they have lost because they have taken too many guesses
			return true; //return success! the game is over
		} else { //otherwise
			return false; //return failure! the game is over
		} //end if
	}; //end internal function
	
	/* isWon - returns true if the user won the game, returns false if the computer won the game */	
	this.isWon = function() { //begin internal function
		if (countGuesses == 0) { //if the user has not had a turn yet
			return false; //the user has not had a go yet so return false
		} else { //otherwise check to see if the user has won
			if (board[countGuesses - 1].getGuess().isEqual(secret)) { //if the last users guess was right
				return true; //return success
			} else { //otherwise the user did not guess right last time
				return false; //return faliure
			} //end if
		} //end if
	}; //end internal function

	/* guessing - return whether we are in the middle of a guess or not */
	this.guessing = function() { //begin internal function
		var temp = new Code(); //a temporary variable holder for the current guess code
		temp = board[countGuesses].getGuess(); //set the temporary holder to the current guess on the board
		var number = temp.position(); //the peg we are up to in the guess - if the guess is not completed
		if ((number>=0) && (number<=codeLength)) { //if the guess is not completed yet
			return number; //return success - the guess is not completed yet
		} else { //otherwise the guess is full
			return undefined; //return faliure - the guess is over
		} //end if
	}; //end internal function

	/* makeGuess - get the user's next guess */
	this.makeGuess = function(choice, position) { //begin internal function
		var temp = new Code(); //a temporary variable holder for the current guess code
		temp = board[countGuesses].getGuess(); //set the temporary holder to the current guess on the board
		temp.readIn(choice, position); //read the latest guess
		board[countGuesses].setGuess(temp); //set the guess in the current spot on the board to the temp variable that was just read in
	}; //end internal function
	
	/* getResult - get the result of the latest user guess */
	this.getResult = function() { //begin internal function
		var guess = new Code(); //to hold the current guess
		var result = new Code(); //to hold the current result
		guess = board[countGuesses].getGuess(); //get the latest guess
		result = guess.compare(secret); //compare the latest guess to the solution, and compute the result
		board[countGuesses].setResult(result); //set the result of the latest guess, on the board, to the result
		countGuesses++; //time for the next guess
	}; //end internal function
	
	/* getSecret -  to return the secret code */
	this.getSecret = function(startTag, endTag) { //begin internal function
		return secret.display(startTag, endTag); //return the value of the colour attribute 
	}; //end internal function

	/* displayBoard - to output the state of the board to the screen */
	this.displayBoard = function(size, startTag, endTag) { //begin internal function
		var i; //counting variable for the loop
		var html = '<table border="0" cellpadding="0" cellspacing="10"><tr><td class="mainOutline"><table border="0" cellpadding="4" cellspacing="1">'; //to hold the html code for the board
		var blank = "blank"; //what to use for the blank spots
		var pos; //to hold the position we are up to in the board
		for (i=countGuesses-1; i>=0; i--) { //for loop to go through the board array - outer loop
			html = html + '<tr><td class="normal">'; //insert the code for the guess cell
			html = html + board[i].getGuess().display(startTag, endTag); //insert the contents of this row's guess in the board
			html = html + '</td><td class="normal">'; //insert the code for the result cell
			html = html + board[i].getResult().display(startTag, endTag); //insert the contents of this row's result in the board
			html = html + '</td></tr>'; //insert the code for the board into html variable string
		} //end for - outer
		html = html + '</table></td></tr></table>'; //insert the code for the board into html variable string
		document.getElementById("board").innerHTML = html; //insert the code for the board onto page
	} //end function

}; //end constructor function

/* Game - the main Game class - calls the GameBase constructor function to create the Game object */
function Game() { //begin function
	this.GameBase = GameBase; //set an attribute called GameBase
	this.GameBase(); //call the GameBase constructor function
}; //end function

/* RowBase - rows consist of guesses and results, where a guess is 4 pegs long and a result can also be 4 pegs long */
function RowBase() {	//begin constructor function
	var guess = new Code(); //array - to hold the pegs in a guess
	var result = new Code(); //array - to hold the pegs in a result
	/* getGuess - returns the Guess for this row */
	this.getGuess = function() { //begin internal function
		return guess; //return the guess for this row
	}; //end internal function

	/* setGuess - sets the Guess for this row */
	this.setGuess = function(c) { //begin internal function
		guess = c; //set the guess for this row
	}; //end internal function

	/* getResult - returns the Result for this row */
	this.getResult = function() { //begin internal function
		return result; //return the Result for this row
	}; //end internal function

	/* setResult - sets the Result for this row */
	this.setResult = function(c) { //begin internal function
		result = c; //set the Result for this row
	}; //end internal function

}; //end constructor function

/* Row - rows make up the game board - calls the RowBase constructor function to create the Row object */
function Row() { //begin function
	this.RowBase = RowBase; //set an attribute called RowBase
	this.RowBase(); //call the RowBase constructor function
}; //end function