/**
 * Hangman application created to learn more about JavaScript
 * @author Jeff Kramer
 */
var wrongGuesses = 6;
var wordList = readTextFile("file:///C:/Users/Jeff/projects/Hangman/words.txt");
var randomIndex = Math.floor(Math.random() * (wordList.length-1 - 0 + 1)) + 0;
var word = wordList[randomIndex].trim();
//alert(word);
//Create initial hangman structure
createHangman();

//Draw hidden letters at every spot
createHiddenLetters();

//Create underlines
createUnderlines();

document.addEventListener('keydown', processGuess);

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
		theList = xmlhttp.responseText.split("\n");
		theList.pop(); //get rid of whitespace
	}

	xmlhttp.open("GET", file, false);
	xmlhttp.send();
	return theList;
}

function createHangman() {
	var html = '';
	html = "<svg id='hangman' height='160' width='200'>";
	html += "<line x1='0' y1='159' x2='200' y2='159' style='stroke:rgb(0,0,0);stroke-width:3'/>"; //horizontal bottom line
	html += "<line x1='50' y1='2' x2='50' y2='160' style='stroke:rgb(0,0,0);stroke-width:3'/>"; //vertical line
	html += "<line x1='48' y1='2' x2='120' y2='2' style='stroke:rgb(0,0,0);stroke-width:3'/>"; //horizontal top line
	html += "<line x1='119' y1='2' x2='119' y2='30' style='stroke:rgb(0,0,0);stroke-width:3'/>"; //vertical line
	html += "</svg>";
	document.getElementById('hangmandiv').innerHTML = html;
}

function createHiddenLetters() {
	var i = 0;
	var html = '';
	for(i = 0; i < word.length; i++) {
		html += "<p id='letter" + i + "' class='" + word.charAt(i) + "'>" + word.charAt(i) + "</p>";
	}
	var answerdiv = document.getElementById('answerdiv');
	answerdiv.innerHTML = html;
}

function createUnderlines() {
	var html = '';
	var i = 0;
	for(i = 0; i < word.length; i++) {
		//draw a black line, small white line, repeat until all letters are represented
		html += "<svg height='10' width='35'><line x1=0 y1=0 x2=35 y2=0 style='stroke:rgb(0,0,0);stroke-width:2'/></svg>";
		html += "<svg height='10' width='5'><line x1=0 y1=0 x2=5 y2=0 style='stroke:rgb(255,255,255);stroke-width:2'/></svg>";
	}
	document.getElementById('underlines').innerHTML += html;
}

function processGuess(event) {
	if(event.keyCode !== 116) { //ignore the refresh button
		var guess = String.fromCharCode(event.keyCode).toLowerCase();
		var indexOfGuess = word.indexOf(guess);
		if(indexOfGuess === -1) {
			wrongGuesses--;
			addPieceOfHangman(); //add an element to the hangman	
		}
		else {
			var letter;
			while(indexOfGuess !== -1) {
				if(indexOfGuess === 0) { 
					word = word.substr(1, word.length); //get rid of letter from word
				}
				else {
					word = word.substr(0, indexOfGuess) + word.substr(indexOfGuess+1, word.length); //get rid of letter from word
				}
				indexOfGuess = word.indexOf(guess);
			}
			var guessedLetters = document.getElementsByClassName(guess);
			for(i = 0; i < guessedLetters.length; i++) {
				guessedLetters[i].style.visibility = "visible";
			}
		}
		
		if(wrongGuesses === 0) {
			alert("You lose!");	//death animation, prompt to try again
			document.removeEventListener('keydown', processGuess);
		}
		if(word.length === 0) { //this is our win condition
			alert("You win!"); //victory animation, prompt to play again
			document.removeEventListener('keydown', processGuess);
		}
	}
}

function addPieceOfHangman() {
	var hangman = document.getElementById('hangman');
	switch(wrongGuesses) {
		case 5: //add head
			hangman.innerHTML += "<circle cx='119' cy='40' r='10' stroke='black' stroke-width='3' fill='white'/>";
			break;
		case 4: //add body
			hangman.innerHTML += "<line x1='119' y1='50' x2='119' y2='100' style='stroke:rgb(0,0,0);stroke-width:3'/>"; 
			break;
		case 3: //add left leg
			hangman.innerHTML += "<line x1='119' y1='100' x2='99' y2='120' style='stroke:rgb(0,0,0);stroke-width:3'/>";
			break;
		case 2: //add right leg
			hangman.innerHTML += "<line x1='119' y1='100' x2='139' y2='120' style='stroke:rgb(0,0,0);stroke-width:3'/>";
			break;
		case 1:	//add left arm
			hangman.innerHTML += "<line x1='119' y1='70' x2='139' y2='60' style='stroke:rgb(0,0,0);stroke-width:3'/>";
			break;
		case 0: //add right arm
			hangman.innerHTML += "<line x1='119' y1='70' x2='99' y2='60' style='stroke:rgb(0,0,0);stroke-width:3'/>";
			//add any other death animations (crossed eyes, sad mouth, etc)
			break;
	}
}