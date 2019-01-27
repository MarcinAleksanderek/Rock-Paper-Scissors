'use strict';
var playerScore, compScore, compSelection, winsNumber, winsCount;
var myArray = ['scisors', 'paper', 'rock'];  
var output = document.getElementById('output');
var status = document.getElementById('currentStatus');
var scoreTableOutput = document.getElementById('scoreTable');
var finishDialog = document.getElementById('winLooseDialog');

function playerMove(iD) {
  compSelection = getRandom();
  if(((iD=='paper') && (compSelection=='rock')) || ((iD=='rock') && (compSelection=='scisors')) || ((iD=='scisors') && (compSelection=='paper'))) {
     playerScore++;
  }
  else if(iD==compSelection) {}
  else {
    compScore++;
  }
  
  writeOutput((updateImage(iD)+'   '+updateImage(compSelection)+'<br>You selected : ' + iD + ' computer choose: '+compSelection), 'output');
  writeOutput(('Player: ' +playerScore + '<br>Computer: ' + compScore + '<br>'),  'currentStatus');
  if(playerScore==winsNumber) {
    showFinishDialog('WIN!!!', 'Conratulations!!');
  }
  else if(compScore == winsNumber) {
    showFinishDialog('loose', 'Would You like to try again?');
  }
}

function getRandom () {
  var rand = myArray[Math.floor(Math.random() * myArray.length)];
  return rand
}

function writeOutput (text, output) {
  var message = document.getElementById(output);
  message.innerHTML = text;
}

function updateImage (selection) {
  switch(selection) {
      case 'rock':
          return "<img class='selection' src='http://www.orbiter.vot.pl/scisorsgame/rock.png'>"
      break;
      case 'scisors':
          return "<img class='selection' src='http://www.orbiter.vot.pl/scisorsgame/scissors.png'>"
      break;
      case 'paper':
          return "<img class='selection' src='http://www.orbiter.vot.pl/scisorsgame/paper.png'>"
      break;
    }
}

function startGame() {
  winsNumber = window.prompt('Up to how many WINS would You like to play?');
  if(isNaN(winsNumber)) {
    finishDialog.innerHTML ='<br>Please provide correct NUMBER.';
  }
  else {
  playerScore = 0; 
  compScore = 0;
  writeOutput(('Player: ' +playerScore + '<br>Computer: ' + compScore + '<br>'),  'currentStatus');
  writeOutput('', 'output');
  togleView();
  }
}

function showFinishDialog(winLose, message) {
  finishDialog.innerHTML = 'You ' + winLose + '<br>' +message;
  togleView();
}

function togleView() {
  var y = document.getElementById('newGame');
  var x = document.getElementById('game');
  
  y.classList.toggle("show");
  y.classList.toggle("hide");
  x.classList.toggle("show");
  x.classList.toggle("hide");
}