/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,dice, gamePlaying, prevRoll; 


function init()
{
	scores = [0,0];
	roundScore=0;
	activePlayer=0; //0 represents first player, 1 represents second player
	document.querySelector('#dice0').style.display='none';
	document.querySelector('#dice1').style.display='none';

	document.getElementById('score-0').textContent='0';
	document.getElementById('current-0').textContent='0';
	document.getElementById('score-1').textContent='0';
	document.getElementById('current-1').textContent='0';
	document.querySelector('#name-0').textContent= 'Player 1';
	document.querySelector('#name-1').textContent= 'Player 2';
	document.querySelector('.player-0'+'-panel').classList.remove('winner');
	document.querySelector('.player-1'+'-panel').classList.remove('winner');

	//don't want to add the same active class twice to a document element
	document.querySelector('.player-'+'0'+'-panel').classList.remove('active');
	document.querySelector('.player-'+'0'+'-panel').classList.add('active');

	//remove active of player 2
	document.querySelector('.player-'+'1'+'-panel').classList.remove('active');
	gamePlaying=true;
	prevRoll=-1;
	winningScore=20;

};
init();




//don't need named function for event listener
// function btn {
// 	//do something here
// }
// btn();

document.querySelector('.btn-new').addEventListener('click', init);


document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying)
	{
		//1. random number
		var dice0 = Math.floor(Math.random()*6)+1;

		//2.Display the result
		var diceDOM0=document.querySelector('#dice0');
		diceDOM0.style.display='block';
		diceDOM0.src = 'dice-' + dice0 + '.png';

		//1. random number
		var dice1 = Math.floor(Math.random()*6)+1;

		//2.Display the result
		var diceDOM1=document.querySelector('#dice1');
		diceDOM1.style.display='block';
		diceDOM1.src = 'dice-' + dice1 + '.png';

		var sum=dice0+dice1;



		if (prevRoll===6 && sum===6)   //dice===6 && prevRoll===6
		{
			scores[activePlayer]=0;
			document.querySelector('#score-' + activePlayer).textContent=scores[activePlayer];
			nextPlayer();

		}

		//Update the round score IF the rolled number was not a 1
		else if (dice0!==1 && dice1!==1) //no type coercison
		{
			//Add score to current
			roundScore+=sum;
			prevRoll=sum;
			document.querySelector('#current-' + activePlayer).textContent=roundScore;
		}

		else
		{
			//Next player's turn, don't add score
			nextPlayer();
		}
	}
	
});

// document.getElementById('winningScore').addEventListener('input', function(){
// 	winningScore=document.getElementById('winningScore').value;
// });

document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gamePlaying)
	{
		//Add current score to global score
		scores[activePlayer]+= roundScore;
		

		//update UI
		document.querySelector('#score-' + activePlayer).textContent=scores[activePlayer];
		
		var input=document.querySelector('.winningScore').value;
		//if non null, bad input
		if (input)
		{
			var winningScore=input;
		}
		else
		{
			winningScore=100;
		}
		//Check if player won the game
		if (scores[activePlayer]>=winningScore) //type coercision done on text of input
		{
			document.querySelector('#name-'+activePlayer).textContent= 'Winner!';
			document.querySelector('#dice0').style.display='none';
			document.querySelector('#dice1').style.display='none';
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			gamePlaying=false;
		}
		else
		{
			//next player
			nextPlayer();
		}
		
	}
	


});



function nextPlayer() {
	activePlayer === 0 ? activePlayer=1 : activePlayer=0;
	roundScore=0;
	prevRoll=-1;

	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';

	// document.querySelector('.player-0-panel').classList.remove('active');
	// document.querySelector('.player-1-panel').classList.add('active');

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('#dice0').style.display='none';
	document.querySelector('#dice1').style.display='none';

	

};




//Other useful code tidbits
// dice = Math.floor(Math.random()*6)+1;
// console.log(dice);

// document.querySelector('#current-' + activePlayer).textContent=dice;
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x= document.querySelector('#score-0').textContent;
// console.log(x);


