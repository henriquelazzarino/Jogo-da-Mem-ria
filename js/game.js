const grid = document.querySelector('.grid');
const player = document.querySelector('.player').textContent = localStorage.getItem('name');
const timer = document.querySelector('.timer');
const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];
let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card')
    if (disabledCards.length === 20) {
        clearInterval(this.loop)
        setTimeout(() => {
            alert(`Congratulations, ${localStorage.getItem('name')}\nYour time was: ${timer.innerHTML}`)
        }, 200)
    }
}

const checkCards = () => {
    const firstCharacater = firstCard.getAttribute('data-character');
    const secondCharacater = secondCard.getAttribute('data-character');
    if (secondCharacater === firstCharacater) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500)
    }            
}
const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if (firstCard === "") {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === "") {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}
const createElement = (tag, className) => {
    const el = document.createElement(tag);
    el.className = className;
    return el;
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../images/${character}.png)`;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character);
    return card;
}

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5)
    shuffleArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () =>{
    this.loop = setInterval(()=>{
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000)
}

document.getElementById('button').addEventListener('click', event=>{
    if (timer.textContent > 0) {
        return;
    }
    startTimer();
    loadGame();
})
