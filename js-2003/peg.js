/* 
	Title: peg.js
	Author: Amanda Scott
	Date: 13.10.02
	Description: Javascript functions needed for the peg class.
*/

/* Declare Global Variables */
var colours = new Array('red','yellow','green','blue','white','black'); //array - to hold all the possible peg colours

/* isValidColour - tests whether the given argument is one of the valid/allowable colour */
function isValidColour(colour) { //begin function
	var i; //used to iterate through array indexes
	for (i in colours) { //begin for loop through colours array
		if (colours[i] == colour) { //test if the colour argument is equal to the element with index "i" in the colours array
			return true; //return true if the colour is found in the array
		} //end if
	}; //end for loop
	return false; //otherwise the colour was not found in the array so return false
}; //end function

/* PegBase - the base of the Peg class - creates an object called a Peg with a private colour attribute, and public methods to access the colour attribute */
function PegBase() {	//begin constructor function
	var colour = undefined;	//the colour of our peg (an attribute of the peg object) (initially set to undefined)
	
	/* getColour - provides access to the internal colour variable */
	this.getColour = function() { //an internal function
		return colour; //return the value of the colour attribute 
	}; //end internal function
	
	/* setColor - allows setting of the colour of this peg, if no valid colour is passed as an argument to the function, a random valid colour is chosen */
	this.setColour = function(c) { //begin internal function
		if (isValidColour(c)) { //if "c" is an allowable colour
			colour = c; //set the colour of the peg to the argument passed "c"
		} else { //otherwise is "c" is not a valid colour so set a random colour
				var number = Math.floor(Math.random()*colours.length); //create a random number using the bounds of the array as the range
				colour = colours[number]; //set the colour to a randomly chosen colour in the array of valid colours
		} //end if
	}; //end internal function

	/* copy - creates a copy of the peg that is passed as an argument */
	this.copy = function(p) { //begin internal function
		this.setColour(p.getColour()); //create a copy of the peg "p"'s attributes
		return this; //return this peg
	}; //end internal function

	/* isEqual - compares the colour of two pegs, returns true if the pegs are the same colour, and false if they are not */
	this.isEqual = function(peg) { //begin internal function
		if (this.getColour() == peg.getColour()) { //if this peg's colour is the same as the colour of the argument peg
			return true; //return success
		} else { //otherwise the colour is not the same
			return false; //so return failure
		} //end if
	}; //end internal function

	/* toString - returns a string containing the colour of this peg */
	this.toString = function() { //begin internal function
		if (colour) { //if the colour is defined
			return colour; //return the colour string
		} else { //otherwise return the string "undefined
			return 'undefined';
		} //end if
	}; //end internal function
	
}; //end constructor function

/* Peg - the main Peg class - calls the PegBase constructor function to create the Peg object */
function Peg() { //begin function
	this.PegBase = PegBase; //set an attribute called PegBase
	this.PegBase(); //call the PegBase constructor function
}; //end function