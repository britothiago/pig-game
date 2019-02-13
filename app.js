/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, dados, activePlayer, player1, player2;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

player1 = document.querySelector('.player-0-panel');
player2 = document.querySelector('.player-1-panel');

document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-hold').addEventListener('click', hold);

function newGame(){
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    limparDados();
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('#name-0').textContent = 'Jogador 1';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('#name-1').textContent = 'Jogador 2';
    activePlayer=0;
    scores = [0,0];
}

function limparDados() {
    document.querySelector(".dice").style.display = 'none';
}

function rollDice() {
    document.querySelector(".dice").style.display = 'block';
    dados = Math.floor(Math.random()*6)+1;
    switch(dados) {
        case 1: 
            roundScore = 0;
            hold();
            limparDados();
            break;
        case 2:
            addNumber(dados);
            document.querySelector('.dice').src = 'dice-2.png'; 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            break;
        case 3: 
            addNumber(dados);
            document.querySelector('.dice').src = 'dice-3.png'; 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            break;
        case 4:
            addNumber(dados);
            document.querySelector('.dice').src = 'dice-4.png'; 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            break;
        case 5: 
            addNumber(dados);
            document.querySelector('.dice').src = 'dice-5.png'; 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            break;
        default: 
            addNumber(dados);
            document.querySelector('.dice').src = 'dice-6.png'; 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            break;
    }
}

function addNumber(dados) {
    roundScore += dados;
}

function hold() {
    if (activePlayer === 0){
        scores[activePlayer] += roundScore;
        const win = winner(activePlayer);
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        activePlayer = 1;
        player1.setAttribute('class', 'player-0-panel');
        if (!win) player2.setAttribute('class', 'player-1-panel active');
    } else {
        scores[activePlayer] += roundScore;
        const win = winner(activePlayer);
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        activePlayer = 0;
        if (!win) player1.setAttribute('class', 'player-0-panel active');
        player2.setAttribute('class', 'player-1-panel');
    }
}

function winner(activePlayer){
    if (scores[activePlayer] >= 11) {
        document.querySelector('#name-' + activePlayer).textContent = 'VENCEDOR';
        limparDados();
        document.querySelector('.player-'+ [activePlayer] +'-panel').classList.remove('active');    
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        return true;
    }
}

//

