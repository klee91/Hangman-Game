
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
var wordList = ["ALADDIN","MULAN","FROZEN","MOANA","CINDERELLA","FANTASIA","PINOCCHIO","HERCULES","POCAHONTAS","TARZAN","ZOOTOPIA", "TANGLED", "TOY STORY"];

var display = "";
var stored_guesses = [];
var answerArray = [];
var randomWord = (wordList[Math.floor(Math.random() * wordList.length)]);
var answerArray = randomWord.split("");
var numGuessRemaining = randomWord.length;
var winCounter = 0;
var lossCounter = 0;
var audioPage = document.createElement('audio');
audioPage.src = 'disney.mp3';
audioPage.play();

function replaceLettersWithBlanks() {
 for (var i = 0; i < answerArray.length; i++) {
      answerArray[i] = "_";
      display = answerArray.join(" ");
    } 
};

function reset() {
	replaceLettersWithBlanks();
	document.getElementById("current-Word").innerHTML = display;
	document.getElementById("num-Guess-Rem").innerHTML = answerArray.length;
	stored_guesses.length = 0;
};

// function imageChange() {
// 	var a = randomWord;
// 	var b = document.getElementById("top-image");
// 	if (a == 'ALADDIN') {
// 		b.src = src="assets/images/aladdin.gif";
// 	} else if (a == 'MULAN') {
// 		b.src="assets/images/mulan.gif";
// 	} else if (a == 'FROZEN'){
// 		b.src="assets/images/frozen.gif";
// 	} else if (a == 'MOANA') {
// 		b.src="assets/images/moana.gif";
// 	} else if (a == 'CINDERELLA') {
// 		b.src="assets/images/cinderella.gif";
// 	} else if (a == 'FANTASIA') {
// 		b.src="assets/images/fantasia.gif";
// 	} else if (a == 'PINOCCHIO') {
// 		b.src="assets/images/pinocchio.gif";
// 	} else if (a == 'HERCULES') {
// 		b.src="assets/images/hercules.gif";
// 	} else if (a == 'POCAHONTAS') {
// 		b.src="assets/images/pocahontas.gif";
// 	} else if (a == 'TARZAN') {
// 		b.src="assets/images/tarzan.gif";
// 	} else if (a == 'ZOOTOPIA') {
// 		b.src="assets/images/zootopia.gif";
// 	} else if (a == 'TANGLED') {
// 		b.src="assets/images/tangled.gif";
// 	} else if (a == 'TOY STORY') {
// 		b.src="assets/images/toy_story.gif";
// 	} else {
// 		b.src="assets/images/mickey-mouse.png";
// 	}
// };


//On page load, display current word(hidden), win score counter, number of guesses remaining, and letters already used.
window.onload = function displayCurrentWord() {
	replaceLettersWithBlanks();
	document.getElementById("current-Word").innerHTML = display;
	document.getElementById("num-Guess-Rem").innerHTML = numGuessRemaining;
	document.getElementById("win-Counter").innerHTML = winCounter;
	document.getElementById("loss-Counter").innerHTML = lossCounter;
};

//Function and conditions when a key is pressed.
document.onkeyup = function(event) {
	var userGuess = event.key.toUpperCase();	
	var rightOrWrong = false;

	//Will check, update and reveal letters under 'Current Word'
	for (var f = 0 ; f < answerArray.length; f++) {
		if (userGuess === randomWord.charAt(f)) {
			answerArray[f] = randomWord.charAt(f);
			display = answerArray.join(" ");
			document.getElementById("current-Word").innerHTML = display;
			rightOrWrong = true;
		}
	};

	if (answerArray.join("") === randomWord) {
		reset();
		winCounter = winCounter + 1 ;
		document.getElementById("win-Counter").innerHTML = winCounter;
		document.getElementById("letter-Guess").innerHTML = " ";
		userGuess = 0;
	};

	//will decrement number by 1 if wrong letter chosen
	block1 : if(rightOrWrong === false) {
		numGuessRemaining--;
		document.getElementById("num-Guess-Rem").innerHTML = numGuessRemaining;
	}


	//Will check and update letters guessed / will not allow repeated input
	for (var j = 0; j < alphabet.length ; j++) {
		if (userGuess === alphabet[j] && userGuess !== stored_guesses[j]) { 
			stored_guesses.push(userGuess);
			document.getElementById("letter-Guess").innerHTML = stored_guesses;
			rightOrWrong = true;
		}
	}
	//If # of guesses reaches 0, end game or reset
	if (numGuessRemaining == 0) {
		reset();
		lossCounter = lossCounter +1;
		document.getElementById("loss-Counter").innerHTML = lossCounter;
		alert("You Lost!");
	};
}

