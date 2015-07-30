var word = "delicious";
var wrongGuesses = 6;
var i = 0;
var html = '';
var xStart = 0;
var x2Start = 35;
var yStart = 0;

//Create hangman structure
createHangman();

//Create underlines
createUnderlines();

document.addEventListener('keydown', processGuess);

function createUnderlines() {
	for(i = 0; i < word.length; i++) {
		html += "<svg height='10' width='35'><line x1='" + xStart + "' y1='" + yStart + "' x2='" + x2Start + "' y2='" + yStart + "' style='stroke:rgb(0,0,0);stroke-width:2'/></svg>";
		html += "<svg height='10' width='5'><line x1=0 y1=0 x2=5 y2=0 style='stroke:rgb(255,255,255);stroke-width:2'/></svg>"; //draw a small white line
	}

	document.getElementById('underlines').innerHTML += html;
}

function processGuess(event) {
	
	var guess = String.fromCharCode(event.keyCode).toLowerCase();
	var indexOfGuess = word.indexOf(guess);
	if(indexOfGuess === -1) {
		wrongGuesses--;
		if(wrongGuesses === 1 ) {
			alert("you got it wrong! you have " + wrongGuesses + " guess left.");
		}
		else {
			alert("you got it wrong! you have " + wrongGuesses + " guesses left.");
		}
		
	}
	else {
		while(indexOfGuess !== -1) {
			if(indexOfGuess === 0) {
				word = word.substr(1, word.length);
				//display letter at correct position
				alert(word);
			}
			else {
				//alert(word.substr(0, indexOfGuess) + word.substr(indexOfGuess+1, word.length));
				word = word.substr(0, indexOfGuess) + word.substr(indexOfGuess+1, word.length);
				//display letter at correct position
				alert(word);
			}
			indexOfGuess = word.indexOf(guess);
		}
	}
	
	if(wrongGuesses === 0) {
		alert("You lose!");
		//death animation
		//prompt to try again
	}
	if(word.length === 0) { //this is our win condition
		alert("You win!");
		//victory animation
		//prompt to play again
	}
}

function drawLetter(character, index) {

}