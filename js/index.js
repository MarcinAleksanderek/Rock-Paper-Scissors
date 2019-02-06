'use strict';

var myArray = ['scissors', 'paper', 'rock'];  
var output = document.getElementById('output');
var status = document.getElementById('currentStatus');
var scoreTableOutput = document.getElementById('scoreTable');
var finishDialog = document.getElementById('winLooseDialog');
var inputNumber = document.getElementById("initialInput");
var validationInfo =  document.getElementById("validation");
var modalHeader = document.getElementById("modalHeader");
var modalBody = document.getElementById("modalBody");
var params = {};
var moves = {};

function playerMove(iD) {
  console.log(iD);
  params.compSelection = getRandom();
  if(((iD=='paper') && (params.compSelection=='rock')) || ((iD=='rock') && (params.compSelection=='scisors')) || ((iD=='scisors') && (params.compSelection=='paper'))) {
     params.playerScore++;
  }
  else if(iD==params.compSelection) {}
  else {
    params.compScore++;
  }
  params.table = params.table + '<tr><td>' + params.roundCount + '</td><td>' + iD +'</td><td>' + params.compSelection + '</td><td>' +params.playerScore + ' : ' + params.compScore+'</td></tr>'
  params.roundCount = params.roundCount + 1;
  writeOutput((updateImage(iD)+' '+updateImage(params.compSelection)+'<br>You selected : ' + iD + ' computer choose: '+ params.compSelection), 'output');
  writeOutput(('Player: ' +params.playerScore + '<br>Computer: ' + params.compScore + '<br>'),  'currentStatus');
  if(params.playerScore == params.winsNumber) {
    showFinishModal('WIN!!!', 'Conratulations!!');
  }
  else if(params.compScore == params.winsNumber) {
    showFinishModal('loose!!', 'Try again...');
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
      case 'scissors':
          return "<img class='selection' src='http://www.orbiter.vot.pl/scisorsgame/scissors.png'>"
      break;
      case 'paper':
          return "<img class='selection' src='http://www.orbiter.vot.pl/scisorsgame/paper.png'>"
      break;
    }
}

function startGame() {
  if(isNaN(inputNumber.value)) {
    validationInfo.innerHTML ='<br>Please provide correct NUMBER!!';
  }
  else {
      validationInfo.innerHTML = '';
      params.playerScore = 0;
      params.compScore = 0;
      params.compSelection = null;
      params.winsNumber = inputNumber.value;
      params.roundCount = 1;
      params.table = '<table class="full"><tr><th>#Round</th><th>Player Selection</th><th>Computer Selection</th><th>Score</th></tr>';
 
      writeOutput(('Player: ' +params.playerScore + '<br>Computer: ' + params.compScore + '<br>'),  'currentStatus');
      writeOutput('', 'output');
      togleView(2);
  }
}


function showFinishModal(winLose, message) {
  modalHeader.innerHTML = 'You ' + winLose + ' ' + message;
  params.table = params.table + '</table>'
  modalBody.innerHTML = params.table;
  togleView(3);
  openModal('#scoreView');
}

function togleView(numb) {
  var x = document.getElementById('gameParams');
  var z = document.getElementById('game');
  var y = document.getElementById('newGame');
  

  switch(numb) {
    case 1:
        y.classList.toggle("show");
        y.classList.toggle("hide");
        x.classList.toggle("show");
        x.classList.toggle("hide");
    break;
    case 2:
        z.classList.toggle("show");
        z.classList.toggle("hide");
        x.classList.toggle("show");
        x.classList.toggle("hide");
    break;
    case 3:
        z.classList.toggle("show");
        z.classList.toggle("hide");
        y.classList.toggle("show");
        y.classList.toggle("hide");
    break;
  }

}


function closeModal() {
  document.getElementById('overlay').classList.remove('show');
}

Array.from(document.querySelectorAll('#overlay .js--close-modal')).forEach(function(btn){ btn.addEventListener('click', function(e) {
    e.preventDefault();
    closeModal();
  });
});

Array.from(document.querySelectorAll('#overlay .js--send-message')).forEach(function(btn){ btn.addEventListener('click', function(e) {
    e.preventDefault();
    
	var message = document.getElementById('chatInput');
	var field = document.getElementById('chatwindow');
	var message_output = '<hgroup class="speech-bubble-my">' + message.value +'</hgroup>';
	field.innerHTML = field.innerHTML + message_output;
	message.value = '';
  });
});


document.querySelector('#overlay').addEventListener('click', function(e) {
  if(e.target === this) {
    closeModal();
  }
})

document.addEventListener('keyup', function(e) {
  if(e.keyCode === 27) {
    closeModal();
  }
})

function openModal(modal) {
  Array.from(document.querySelectorAll('#overlay > *')).forEach(function(modal) {
    modal.classList.remove('show');
  });
  document.querySelector('#overlay').classList.add('show');
  document.querySelector(modal).classList.add('show');
}
