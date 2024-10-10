const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let turns = 0;
let recordTableElement = document.querySelector('.recordTable');
let score = document.querySelector('.score');
const newGame = document.querySelector('.newGame');
let recordTable = localStorage.getItem('recordTable') == undefined ? [] : JSON.parse(localStorage.getItem('recordTable'));
// console.log(recordTable);

function flipCard() {

    turns += 1;
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.id === secondCard.id;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {

    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    let flips = document.querySelectorAll('.flip');
    if (flips.length === cards.length) {

        recordTableElement.innerHTML = '';
        if (recordTable.length === 10) {
            recordTable.splice(0, 1);
        }
        recordTable.push(turns);
        localStorage.setItem('recordTable', JSON.stringify(recordTable));
        
        textContent = `Number of turns: \n`;
        
        for (let index = 0; index < recordTable.length; index++) {

            const element = recordTable[index];

            newString = document.createElement('div');
            newString.textContent = `${index + 1}. ${element}`;
            recordTableElement.appendChild(newString);
        }

        turns = 0;
        score.classList.add('score_active');
    }
}

function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
};

function AddFlipCard() {

    cards.forEach(card => card.addEventListener('click', flipCard));

    newGame.addEventListener('click', () => {

        turns = 0;
        let flips = document.querySelectorAll('.flip');
        flips.forEach(element => {
            element.classList.remove('flip');
        });
        score.classList.remove('score_active');
        AddFlipCard();
        shuffle();

    });
};

AddFlipCard();
shuffle();