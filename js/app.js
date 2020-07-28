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
    'Stairway to Heaven',
    'All along the watchtower',
    'Eleanor Rigby',
    'Simplicity is the ultimate sophistication',
    'What we think we become',
    'Common sense is not so common',
    'Vae Victis'
]

////////////
// Functions 
////////////

// Gets a random phrase from an array and splits it into letters
function getRandomPhraseAsArray(arr) {
    const randomNumber = parseInt(Math.random() * 5);
    for (let i = 0; i < phrases.length; i++) {
        if (randomNumber === i) {
            const randomPhrase = arr[i];
            return randomPhrase.split('');
        }
    }
}

// Gets an array of letters and creates list elements to put them in
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
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

// Restarts the game and restores everything to original properties
function restartGame() {
    let button = qwerty.getElementsByTagName('button');
    for (let i = 0; i < button.length; i++) {
        button[i].removeAttribute('class');
        button[i].removeAttribute('disabled');
    }
    missed = 0;
    for (let i = 0; i < 5; i++) {
        tries[i].firstChild.src = 'images/liveHeart.png';
    }
    overlay.style.display = 'none';
    ul.innerHTML = '';
    const newPhraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhraseArray);
}

/////////////
//Main Events
/////////////

//Starts the game and removes the overlay
overlay.addEventListener('click', (e) => {
    if (event.target.tagName === 'A') {
        if (overlay.className === 'start') {
            overlay.style.display = 'none';
        } else if (overlay.className === 'win' || overlay.className === 'lose') {
            restartGame();
        }
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
        if (letterFound === null) {
            tries[missed].firstChild.src = 'images/lostHeart.png';
            missed++;
        }
    }
    checkWin()
});