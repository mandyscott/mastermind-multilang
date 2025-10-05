/* 
	Title: code.js
	Author: Amanda Scott
	Date: 13.10.02
	Description: Javascript functions needed for the code class.
*/

/* Declare Global Variables */
var codeLength = 4;

/* CodeBase - the base of the Code class - will hold details about the four pegs in this code */
function CodeBase() {	//begin constructor function
	var pegs = new Array(codeLength); //array - to hold the pegs in a code
	for (i=0; i<codeLength; i++) { //loop through the pegs array
		pegs[i] = new Peg(); //call the Peg object constructor function to create a new object of type Peg for each spot in the array
	} //end loop

	/* makeCode - generate a secret code */
	this.makeCode = function(c) { //begin internal funciton
		for (i=0; i<codeLength; i++) { //loop through the pegs in the pegs array
			pegs[i].setColour(); //set the colour of this peg to a randomly chosen colour
		} //end for loop
	}; //end internal function
	
	/* getPeg - returns the peg at position "i" in the code */
	this.getPeg = function(i) { //begin internal function
		return pegs[i]; //return peg number "i" in the pegs array
	}; //end internal function
	
	/* setPeg - sets the colour of the peg at position "i" in the code */
	this.setPeg = function(i,colour) { //begin internal function
		pegs[i].setColour(colour); //set peg number "i" in the pegs array to the specified colour
	}; //end internal function
	
	/* clearPeg - clears the current peg - makes a new peg object and assigns it to this peg "i" */
	this.clearPeg = function(i) { //begin internal function
		pegs[i] = new Peg(); //set peg number "i" in the pegs array to a fresh peg
	}; //end internal function
	
	/* exists - checks the current peg to see if it's colour is undefined - which would make it a new peg */
	this.exists = function(i) { //begin internal function
		return pegs[i].getColour(); //return the colour of the peg - returns undefined if the peg is new
	}; //end internal function
	
	/* copy - creates a copy of the code that is passed as an argument */
	this.copy = function(c) { //begin internal function
		for (i=0; i<codeLength; i++) { //loop through the pegs array
			pegs[i].copy(c.getPeg(i)); //create a copy of the peg in position i of the argument code "c"
		} //end loop
	}; //end internal function

	/* readIn - to get the next user guess */
	this.readIn = function(choice, position) { //begin internal function
		if (isValidColour(colours[choice])) { //if the colour is valid
			pegs[position].setColour(colours[choice]); //set the peg at position "i" in the users guess to the inputted colour
		} else { //otherwise if the colour is not valid
			alert('Please enter a vaild colour!\nChoose from: red, yellow, green, blue, white, or black.'); //as the user to please only enter a valid colour
		} //end if
	}; //end internal function
	
	/* position - returns whether the pegs are full */
	this.position = function() { //begin internal function
		for (i in pegs) { //loop thru pegs in this code to see if they have all been filled up yet
			if (!this.exists(i)) { //if the peg does not have a colour defined yet
				return i; //return peg number - the pegs are not all full yet - returns on the first peg it finds that does not have a colour yet
			} //end if
		} //end for loop
		return undefined; //return faliure - the pegs are all full
	}; //end internal function
	
	/* display - returns the pegs in this code as a string */
	this.display = function(startTag, endTag) { //begin internal function
		var temp = new Array(codeLength); //a temporary array to hold the contents of our code as strings
		for (i=0; i<codeLength; i++) { //being loop - for each peg in this code
			temp[i] = startTag + pegs[i].toString() + endTag; //set the temp array position "i" to the string (display value) of the peg
		} //end for loop
		return temp.join(''); //return this temporary array as one string separated by ", "
	}; //end internal function

	/* toString - returns the pegs in this code as a string */
	this.toString = function() { //begin internal function
		var temp = new Array(codeLength); //a temporary array to hold the contents of our code as strings
		for (i=0; i<codeLength; i++) { //being loop - for each peg in this code
			temp[i] = pegs[i].toString(); //set the temp array position "i" to the string (display value) of the peg
		} //end for loop
		return temp.join(' '); //return this temporary array as one string separated by ", "
	}; //end internal function

	/* isEqual - returns true if code c is equal to this code and false otherwise (two codes are equal if the colour of the pegs in each position is the same) */
	this.isEqual = function(c) { //begin internal function
		var i=0; //used to count the loop iterations
		var result = true; //result of the loop to return after checking each peg
		while ((i < codeLength) && (result = pegs[i].isEqual(c.getPeg(i)))) { //begin loop through the pegs in both codes - loop will only continue while the pegs in the same position in both codes are equal
			i++; //incrememnt the loop counter
		} //end while loop
		return result; //return the result of the while loop - will be true only if the pegs are equal in each position in both codes
	}; //end internal function
	
	/* compare - returns a result code of black and white pegs based on the comparison of the colours and positions of the pegs in the secret solution Code and this Code */
	this.compare = function(solution) { //begin internal function
		var i,j; //loop iteration counter
		var result = new Code(); //to return a result code as the result of the function
		if (this.isEqual(solution)) { //if the codes are both equal
			for (i=0; i<codeLength; i++) { //loop through the result code
				result.setPeg(i,'black'); //set the peg colour to black - indicating a correct coloured peg in the right positions
			} //end for loop
		} else { //else check for any correct colours in correct positions, or correct colours in wrong positions
			var solutionCopy = new Code(); //a copy of the solution to keep track of which pegs in the code have been counted already
			solutionCopy.copy(solution); //set the value of solutionCopy to the solution so that pegs can be eliminated one by one
			var codeCopy = new Code(); //a copy of the code
			codeCopy.copy(this); //set the value of codeCopy to the code so that pegs can be eliminated one by one
			var position = 0; //to keep track of where the next free position is in the result code
			// first loop through the code to pick up any black result pegs (correct pegs in correct positions)
			for (i=0; i<codeLength; i++) { //for each peg in this code
				if (pegs[i].isEqual(solution.getPeg(i))) { //check for correct coloured pegs in correct positions when compared to the solution code
					result.setPeg(position,'black'); //the pegs are equal, so put black pegs in result
					position++;
					solutionCopy.clearPeg(i); //eliminate one peg from the solution copy as it has been counted
					codeCopy.clearPeg(i); //eliminate one peg from the code copy as it has been counted
				} //end if
			} //end for loop
			// loop through the code again to pick up any white result pegs (correct pegs in incorrect positions)
			for (i=0; i<codeLength; i++) { //for each peg in this code
				for (j=0; j<codeLength; j++) { //loop thru the pegs in the solution
					if ((i != j) && (codeCopy.exists(i)) && (solutionCopy.exists(j)) && (pegs[i].isEqual(solution.getPeg(j)))) { //check for correct coloured pegs in incorrect positions
						result.setPeg(position,'white'); //put black pegs in result
						position++;
						codeCopy.clearPeg(i); //eliminate one peg from the code copy as it has been counted
						solutionCopy.clearPeg(j); //eliminate one peg from the solution copy as it has been counted
					} //end if
				} //end for loop
			} //end for loop
		} //end if
		return result; //return a result code
	} //end internal function

}; //end constructor function

/* Code - the main Code class - calls the CodeBase constructor function to create the Code object */
function Code() { //begin function
	this.CodeBase = CodeBase; //set an attribute called CodeBase
	this.CodeBase(); //call the CodeBase constructor function
}; //end function