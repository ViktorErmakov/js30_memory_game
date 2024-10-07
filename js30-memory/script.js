const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let turns = 0;
let turnsElement = document.querySelector('.turns');
let score = document.querySelector('.score');
const newGame = document.querySelector('.newGame');

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

        turnsElement.textContent = `Number of turns: ${turns}`;
        score.classList.add('score_active');
    }
}

function shuffle() {
    // cards.forEach(card => {
    //     let ramdomPos = Math.floor(Math.random() * 12);
    //     card.style.order = ramdomPos;
    // });
};

function AddFlipCard() {
    
    cards.forEach(card => card.addEventListener('click', flipCard));

    newGame.addEventListener('click', () => {
        
        localStorage.setItem('turns', turns);
        console.log(localStorage.getItem('turns'));

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