let scores, roundScore, dados, activePlayer, player1, player2, lastNumber, numAtivo, pointMax;

scores = [0,0];
roundScore = 0;
activePlayer = 0;
lastNumber = 0;
numAtivo = false;
pointMax = 100;

player1 = document.querySelector('.player-0-panel');
player2 = document.querySelector('.player-1-panel');

document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-point').addEventListener('click', points);

function points() {
    pointMax = prompt("Insira o valor maximo de pontos");
}


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
    scores = [0,false];
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
            document.querySelector('.dice').src = 'dice-1.png';
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
            if (dados == 6 && lastNumber == 6){
                numAtivo = true;
                hold();
            } else {
                lastNumber = dados;
                numAtivo = false;
                addNumber(dados);
                document.querySelector('.dice').src = 'dice-6.png'; 
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
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
        lastNumber = 0;
        if (numAtivo==true) {
            scores[activePlayer] = 0;
            lastNumber=0;
        }
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        activePlayer = 1;
        player1.setAttribute('class', 'player-0-panel');
        if (!win) player2.setAttribute('class', 'player-1-panel active');
    } else {
        scores[activePlayer] += roundScore;
        const win = winner(activePlayer);
        roundScore = 0;
        lastNumber = 0;
        if (numAtivo==true) {
            scores[activePlayer] = 0;
            lastNumber=0;
        }
        document.querySelector('#current-' + activePlayer).textContent = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        activePlayer = 0;
        if (!win) player1.setAttribute('class', 'player-0-panel active');
        player2.setAttribute('class', 'player-1-panel');
    }
}

function winner(activePlayer){
    if (scores[activePlayer] >= pointMax) {
        document.querySelector('#name-' + activePlayer).textContent = 'VENCEDOR';
        limparDados();
        document.querySelector('.player-'+ [activePlayer] +'-panel').classList.remove('active');    
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        return true;
    }
}

