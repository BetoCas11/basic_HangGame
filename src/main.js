const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const categoriesWords = {
    'fruits': ['apple', 'banana', 'grape', 'orange', 'pear', 'strawberry', 'mango', 'pineapple', 'watermelon', 'cherry'],
    'animals': ['dog', 'cat', 'elephant', 'tiger', 'giraffe', 'penguin', 'dolphin', 'eagle', 'frog', 'bear'],
    'professions' : ['doctor', 'engineer', 'teacher', 'firefighter', 'police officer', 'writer', 'musician', 'lawyer', 'architect', 'chef'],
    'countries' : ['Mexico', 'Spain', 'France', 'Italy', 'Japan', 'Brazil', 'Argentina', 'Germany', 'Australia', 'Canada', 'United Kingdom'],
    'movies' : ['Inception', 'The Matrix', 'Titanic', 'Avatar', 'The Godfather', 'Jurassic Park', 'Star Wars', 'Dark Knight', 'Pulp Fiction', 'Forrest Gump']
};
const $mainGame = document.querySelector('main');
const $sectionInit = document.querySelector('main > section.home');
const $playGame = document.querySelector('.home > div > button:first-child');
const $buttonChooseCategories = document.querySelector('.home > div > button:last-child');
const allCategories = Object.keys(categoriesWords);
let previousCategory;

const buttonVisibility = () => {
    $playGame.removeAttribute('disabled'); 
    $buttonChooseCategories.disabled = true;
};

const baseModal = /*html */ `
<dialog class="modal" >
    <header>
        <h3>Pick a Category</h3>
    </header>
    <article class="categories">
    </article>
</dialog>
`;

const insertListCategories = (selector) => {
    const $article = document.querySelector(selector)
    allCategories.map(item => $article.insertAdjacentHTML('beforeend',/*html*/ `
    <button class="select-category">${item.toUpperCase()}</button>`));
};


document.addEventListener('DOMContentLoaded', initGame);


function initGame() {
    const modalChooseCategories =  baseModal;
    
    $buttonChooseCategories.addEventListener('click', () => {
        $sectionInit.classList.add('hide-element');
        $mainGame.insertAdjacentHTML('beforeend', modalChooseCategories);

        const $modalCategories = $mainGame.querySelector('.modal');
        const viewCategories = $modalCategories.querySelector("article.categories");
        $modalCategories.showModal();
        
        insertListCategories('.modal > article.categories');
        viewCategories.addEventListener('click', eventCategories, {once: true});

    }, {once: true})

};


function eventCategories(e){

    if (e.target.closest('button')) {
        resetMain();
        const valueText = e.target.textContent;
        previousCategory = valueText.charAt(0).toUpperCase() +  e.target.textContent.slice(1).toLowerCase();
        const $modalHome = e.target.offsetParent;
        $modalHome ? $modalHome.remove() : null;


        gameUI(previousCategory);
    };
};

function gameUI(currentWord){
   buttonVisibility();
   const resultingtWord = randomWord();

   $mainGame.insertAdjacentHTML('beforeend', /*html*/ `
    <div class="game">
        <header>
            <nav>
                <li>
                    <button id="showCategories">
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                    <p>${currentWord}</p>
                </li>
                <li>
                    <div>
                        <progress value="100" max="100"></progress>
                    </div>
                    <label>
                    </label>
                </li>

            </nav>
    </header>
        <section class="word"></section>
        <section class="alphabet-letters"></section>
        <dialog class="modal" closedby="any">
            <header>
                <form method="dialog">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="white"><path d="M770.94-193.3v-164.03q0-55-36.23-91.23-36.23-36.23-91.22-36.23H258.7l152.12 152.12-53.81 53.71L113.3-522.67l243.71-243.71 53.81 53.71L258.7-560.54h384.79q86.16 0 144.76 58.6 58.61 58.6 58.61 144.61v164.03h-75.92Z"/></svg>
                    </button>
                </form>
                <h3>Pick a Category</h3>
            </header>
            <article class="categories">
            </article>
        </dialog>
    </div>
    
   `);
    const $headerbuttonCategories = $mainGame.querySelector('.game > header > nav > li:first-of-type > button#showCategories');
    insertWord(resultingtWord);
    
    insertListCategories(`.game > .modal > article.categories`);
    
    $headerbuttonCategories.addEventListener('click', (e) => {categoriesIntotheGame()});

};

function randomWord () {
    const currentCategory = categoriesWords[previousCategory.toLowerCase()];
    const randomWord = currentCategory[Math.floor(Math.random() * currentCategory.length)].toUpperCase().split("");
    
    return randomWord;
};


function insertWord(word){
    const $alphabetLetters = $mainGame.querySelector('section.alphabet-letters');
    const $guessWord = document.querySelector('.word');


    alphabet.map(letter => {
        $alphabetLetters.insertAdjacentHTML("beforeend", /*html*/ `<button>${letter}</button>`)
    });
    $alphabetLetters.addEventListener("click", (e) => handleLetterClick(e, word));
    if(word.includes(" ")){
        const lastSpacedWord = word.findLastIndex(index => index == " ");
        const separationWord = word.slice(0, lastSpacedWord);
        const wordRemaing = word.slice((lastSpacedWord + 1), word.length);

        $guessWord.insertAdjacentHTML("beforeend", `<div></div>`);
        $guessWord.insertAdjacentHTML("beforeend", `<div></div>`);
        separationWord.map(letter => {$guessWord.children[0].insertAdjacentHTML('beforeend', /*html*/ `<span></span>`)});
        wordRemaing.map(letter => {$guessWord.children[1].insertAdjacentHTML('beforeend', /*html*/ `<span></span>`)});
    } else{
        word.map(letter => {$guessWord.insertAdjacentHTML('beforeend', /*html*/ `<span></span>`)});
    }

};

function handleLetterClick(e, currentWord){
    const $currentSpan = [...document.querySelectorAll(".word span")];
    const $lifeGame = $mainGame.querySelector('.game > header > nav > li:last-child > div > progress');
    const $logoLife = $lifeGame.parentElement.nextElementSibling;
    const buttonAlhabet = e.target.textContent;
    const fixedWord = currentWord.filter(item => item != " ")
    const valueIndexWord = fixedWord.map((item, index) => {
        return {
            "element": item,
            "index": index
        }
    });
    if (e.target.closest("button")) {
        const matchingWord = valueIndexWord.filter(item => item.element == buttonAlhabet);
        e.target.disabled = true;
        e.target.style.cursor = "not-allowed";            
        if (matchingWord.length >  0 ) {
            matchingWord.map(item => {$currentSpan[item.index].textContent = item.element});
            $currentSpan.every(itemText => itemText.textContent != "") ? setTimeout(() => { modalGameOver('You Win')},200) : null;
        } else{
            $lifeGame.parentElement.classList.add('animation-progress');
            $logoLife.classList.add('animation-progress');
            subtractLife($lifeGame, currentWord.length, $logoLife);
        }
    }
};


function subtractLife (life, wordLength, logoLife){
    const removeLife = parseInt(100 / wordLength) + 5;
    life.setAttribute('value', (life.value - removeLife));

    setTimeout(() => {
        life.parentElement.classList.remove('animation-progress');
        logoLife.classList.remove('animation-progress');
    }, 550);
    
    if (life.value == 0) {
        modalGameOver('You Lose');
    }
};

function categoriesIntotheGame () {
    const $containerGame = $mainGame.querySelector('.game');
    const $modalIntoGame = $containerGame.querySelector('.modal');

    $modalIntoGame.showModal();
     
    $modalIntoGame.addEventListener('click', (e) => {
        if(e.target.classList.contains('select-category')) eventCategories(e);
    }, {once: true});
};

function modalGameOver(caseofGame){
    const $containerGame = $mainGame.querySelector('.game');
    $containerGame.insertAdjacentHTML('beforeend', /*html */ `
        <dialog  class="modal-GameOver">
        <header>
        <h3>${caseofGame}</h3>
        </header>
        <div>
            ${ caseofGame == 'You Win' ? '<button>Continue</button>' : ''}
            <button>New Category</button>
            <button>Quit Game</button>
        </div>

    </dialog>

    `);
    const $gameOver = $containerGame.querySelector('.modal-GameOver');
    setTimeout(() => {
        $gameOver.showModal();
    }, 50);

    $gameOver.addEventListener('click', optionsGameOver, {once: true});
};

function resetMain () {
    [...$mainGame.children].filter(item => item.className === 'game' ).forEach(item => item.remove())
};

function optionsGameOver(e){
    const {target} = e;
    const $headerbuttonCategories = $mainGame.querySelector('.game > header > nav > li:first-of-type > button#showCategories');

    $playGame.addEventListener('click', () => {
        $sectionInit.classList.add('hide-element');
        gameUI(previousCategory);
    }, {once: true});
    

    switch (target.textContent) {
        case 'Continue':
            returnHome();
            $playGame.click();
            break;

        case 'New Category': 
            returnHome();
            $playGame.click();
            $headerbuttonCategories.click(); 
            const $modalIntoGame = $mainGame.querySelector('.game > .modal');
            $modalIntoGame.removeAttribute('closedby');
            $modalIntoGame.querySelector('form').remove();
            break;
        case 'Quit Game':
            returnHome();
            break;
        default:
            break;
    }
};

function returnHome (){
    resetMain();
    $sectionInit.classList.remove('hide-element');
};