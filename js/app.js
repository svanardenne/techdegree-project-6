///////////////////
// Global variables
///////////////////

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const mainContainer = document.querySelector('.main-container');
const overlay = document.getElementById('overlay');
const ul = document.querySelector('ul');
const ol = document.querySelector('ol');
const tries = document.querySelectorAll('.tries');
const reset = document.querySelector('.btn__reset');

////////////
// Arrays
////////////

const phrases = [
    'For whom the bell tolls',
    'Let them eat cake',
    'I would rather die of passion than of boredom',
    'All along the watchtower',
    'That is not dead which can eternal lie',
    'Common sense is not so common',
    'The oldest and strongest emotion of mankind is fear'
]

////////////
// Functions 
////////////

// Gets a random phrase from an array and splits it into letters
function getRandomPhraseAsArray(arr) {
    const randomNumber = parseInt(Math.random() * 5);
    for (let i = 0; i < phrases.length; i++ ) {
        if (randomNumber === i) {
            const randomPhrase = arr[i];
            return randomPhrase.split('');
        }
    }
}

// Gets an array of letters and creates list elements to put them in
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++ ) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);
        if (li.textContent !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
    }
}

// Checks to see if letter chosen is a letter in the phrase and either reveals 
// the letter or subtracts health
function checkLetter(key) {
    const checkLetter = document.getElementsByClassName("letter");
    let match = null;
    for (let i = 0; i < checkLetter.length; i++) {
        if (key.textContent.toLowerCase() === checkLetter[i].textContent.toLowerCase()) {
            checkLetter[i].classList.add('show');
            match = key.textContent;
        }
    }
    return match;
}

function checkWin() {
    const show = document.querySelectorAll('.show');
    const letter = document.querySelectorAll('.letter');
    console.log(overlay);
    if (show.length === letter.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.innerHTML = `<h1>You Win!</h1><h3>Hit reset to play again</h3>
        <a class="btn__reset">Reset</a>`;
    } else if (missed >= 5) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.innerHTML = `<h1>You lost</h1><h3>Hit reset to play again</h3>
        <a class="btn__reset">Reset</a>`;
    }
}

function restartGame() {
    missed = 0;
}

/////////////
//Main Events
/////////////

//Starts the game and removes the overlay
reset.addEventListener('click', (e) => {
    if (overlay.className === 'start') {
        overlay.style.display = 'none';
    } else if (overlay.className === 'win' || overlay.className === 'lose') {
        restartGame();
    }
});

// Adds the phrase to the display
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Listens for keypresses and passes them to checkLetter()
qwerty.addEventListener('click', (event) => {
    let keyPress = event.target;
    if (keyPress.tagName === 'BUTTON') {
    keyPress.className = 'chosen';
    keyPress.setAttribute('disabled', true);
    const letterFound = checkLetter(keyPress);
    console.log(letterFound);
        if (letterFound === null) {
            tries[missed].firstChild.src = 'images/lostHeart.png';
            missed ++;
        }
    }
    checkWin()
});