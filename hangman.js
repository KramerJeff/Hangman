var word = "delicious";
var wrongGuesses = 6;
var i = 0;

var xStart = 0;
var x2Start = 35;
var yStart = 0;
//var wordList;
//readTextFile("file:///home/jeff/projects/hangman/words.txt");
var wordList = readTextFile("file:///home/jeff/projects/hangman/words.txt");
var randomIndex = Math.floor(Math.random() * (wordList.length-1 - 0 + 1)) + 0;
word = wordList[randomIndex];
alert(word);
//word = wordList[randomIndex];
//alert(word);

//Create initial hangman structure
createHangman();

//Draw hidden letters at every spot
createHiddenLetters();

//Create underlines
createUnderlines();

document.addEventListener('keydown', processGuess);

function createUnderlines() {
	var html = '';
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
		//var answer = document.getElementById('answer');
		while(indexOfGuess !== -1) {
			if(indexOfGuess === 0) {
				//display letter at correct position
				//answer.innerHTML = word.charAt(0) + answer.innerHTML;
				word = word.substr(1, word.length);
				
				alert(word);
			}
			else {
				//alert(word.substr(0, indexOfGuess) + word.substr(indexOfGuess+1, word.length));
				//display letter at correct position
				word = word.substr(0, indexOfGuess) + word.substr(indexOfGuess+1, word.length);
				

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

function readTextFile(file) {
	var xmlhttp;
	var theList;
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onload = function() {
		//wordList = xmlhttp.responseText.split("\n");
		theList = xmlhttp.responseText.split("\n");
		theList.pop();
		//alert(allText);
	}

	xmlhttp.open("GET", file, false);
	xmlhttp.send();
	return theList;
}


function createHangman() {
	var html = '';
	html = "<svg height='80' width='60'>";
	html += "<line x1='0' y1='80' x2='80' y2='80' style='stroke:rgb(0,0,0);stroke-width:4'/>"; //horizontal bottom line
	html += "<line x1='30' y1='2' x2='30' y2='80' style='stroke:rgb(0,0,0);stroke-width:2'/>"; //vertical line
	html += "<line x1='30' y1='2' x2='80' y2='2' style='stroke:rgb(0,0,0);stroke-width:2'/>"; //horizontal top line
	html += "<line x1='59' y1='2' x2='59' y2='15' style='stroke:rgb(0,0,0);stroke-width:2'/>"; //vertical line
	html += "</svg>";
	document.getElementById('hangman').innerHTML = html;
}

function createHiddenLetters() {
	var i = 0;
	for(i = 0; i < word.length; i++) {
		//do nothing for now
	}
	var answer = document.getElementById('answer');
	answer.innerHTML = word;
}