/* import { home } from "./homePage/index.js";
import eventCategories from "./categories/index.js";
import { GameWon } from "./endGame/index.js"; */

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

/* const $firstHeader = document.querySelector('body > header');
const $mainContainer = document.querySelector('main');
const $buttonCategories = document.querySelector('#showCategories');
const $modalCategories = $mainContainer.querySelector('dialog');
const $titleCategories = document.querySelector('header > nav > li > p');
const $sectionCategories = $modalCategories.querySelector('article.categories');
const $remainingLife  = document.querySelector("progress");
const $guessWord = document.querySelector('.word');
const $alphabetLetters = document.querySelector('.alphabet-letters'); */

document.addEventListener('DOMContentLoaded', initGame)

/* document.addEventListener('DOMContentLoaded', () => {
    alphabet.map(letter => {
        $alphabetLetters.insertAdjacentHTML("beforeend", /*html `<button>${letter}</button>`)
    });
    $titleCategories.textContent = sessionStorage.getItem('selectCategory') ?? sessionStorage.setItem('selectCategory', "Movies");
    home($titleCategories.textContent.toLowerCase(), $buttonCategories, $modalCategories, $sectionCategories, Object.keys(categoriesWords), $titleCategories);
});  ==> Revisar el * / del html, l´n 26 col 64*/

function initGame() {
    const modalChooseCategories =  baseModal;
    
    $buttonChooseCategories.addEventListener('click', () => {
        $sectionInit.classList.add('hide-element');
        $mainGame.insertAdjacentHTML('beforeend', modalChooseCategories);

        const $modalCategories = $mainGame.querySelector('.modal');
        const viewCategories = $modalCategories.querySelector("article.categories");
        $modalCategories.showModal();
        
        insertListCategories('.modal > article.categories');
        viewCategories.addEventListener('click', eventCategories);

    })


    /* const currentCategory = categoriesWords[sessionStorage.getItem('selectCategory').toLowerCase()];
    const randomWord = currentCategory[Math.floor(Math.random() * currentCategory.length)].toUpperCase().split("");
    const lastSpacedWord = randomWord.findLastIndex(index => index == " ");
    const separationWord = randomWord.slice(0, lastSpacedWord);
    const wordRemaing = randomWord.slice((lastSpacedWord + 1), randomWord.length);
    const $modalHome = document.querySelector('dialog.home');
    sessionStorage.setItem('keyword', JSON.stringify(randomWord));

    $modalHome.close();
    $firstHeader.classList.remove('hide-element');
    [...$mainContainer.children].forEach(item => item.classList.remove('hide-element'));

    wordtoInsert(randomWord, $guessWord, separationWord, wordRemaing);
    eventCategories($buttonCategories, $modalCategories, $sectionCategories, Object.keys(categoriesWords), $titleCategories);
    $alphabetLetters.addEventListener("click", (event) => {buttonsHandling(event, JSON.parse(sessionStorage.getItem('keyword')))}); */
}



function eventCategories(e){

    if (e.target.closest('button')) {
        resetMain();
        const valueText = e.target.textContent;
        previousCategory = valueText.charAt(0).toUpperCase() +  e.target.textContent.slice(1).toLowerCase();
        const $modalHome = e.target.offsetParent;
        console.log($modalHome);
        $modalHome ? $modalHome.remove() : null;

       /*  !isFirstGame ? $containerGame.remove() : console.info('Primer juego', $containerGame); */

        gameUI(previousCategory);
    };
};

function gameUI(currentWord){
   buttonVisibility();
   const resultingtWord = randomWord();
   console.log(resultingtWord);

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
    console.log($lifeGame);
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
        console.log(matchingWord, $currentSpan);
        e.target.disabled = true;
        e.target.style.cursor = "not-allowed";            
        if (matchingWord.length >  0 ) {
            matchingWord.map(item => {$currentSpan[item.index].textContent = item.element});
            $currentSpan.every(itemText => itemText.textContent != "") ? setTimeout(() => { modalGameOver('You Win')},200) : null;
        } else{
            console.log("Palabra errónea");
            subtractLife($lifeGame, currentWord.length);
        }
    }
}



function subtractLife (life, wordLength){
    const removeLife = parseInt(100 / wordLength) + 5;
    console.log(removeLife);
    life.setAttribute('value', (life.value - removeLife))

    if (life.value == 0) {
        modalGameOver('You Lose');
    }
}

function categoriesIntotheGame () {
    const $containerGame = $mainGame.querySelector('.game');
    const $modalIntoGame = $containerGame.querySelector('.modal');

    $modalIntoGame.showModal();
     
    $modalIntoGame.addEventListener('click', (e) => {
        if(e.target.classList.contains('select-category')) eventCategories(e);
    });
}

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
    $containerGame.querySelector('.modal-GameOver').showModal();
}

function resetMain () {
    [...$mainGame.children].filter(item => item.className === 'game' ).forEach(item => item.remove())
}

/*function wordtoInsert(randomWord, guessWord, separationWord, wordRemaing){
    $alphabetLetters.addEventListener("click", (event) => {buttonsHandling(event, JSON.parse(sessionStorage.getItem('keyword')))});
    if (!randomWord.includes(" ")) {
        guessWord.innerHTML = '';
        randomWord.map(letter => {guessWord.insertAdjacentHTML('beforeend', /*html `<span><!--${letter}--></span>`)})
        console.log(randomWord);
    } else{
        guessWord.innerHTML = '';
        guessWord.insertAdjacentHTML("beforeend", `<div></div>`);
        guessWord.insertAdjacentHTML("beforeend", `<div></div>`);
        console.log(separationWord,wordRemaing);
        separationWord.map(letter => {guessWord.children[0].insertAdjacentHTML('beforeend', /*html `<span><!--${letter}--></span>`)});
        wordRemaing.map(letter => {guessWord.children[1].insertAdjacentHTML('beforeend', /*html `<span><!--${letter}--></span>`)});
    }
}*/

/* function buttonsHandling (e, word, alphabet=$alphabetLetters) {
    console.log(word);
    const $currentSpan = [...document.querySelectorAll(".word span")];
    const buttonAlhabet = e.target.textContent;
    const fixedWord = word.filter(item => item != " ")
    const valueIndexWord = fixedWord.map((item, index) => {
        return {
            "element": item,
            "index": index
        }
    });
    if (e.target.closest("button")) {
        const matchingWord = valueIndexWord.filter(item => item.element == buttonAlhabet);
        console.log(matchingWord, $currentSpan);
        e.target.disabled = true;
        e.target.style.cursor = "not-allowed";            
        if (matchingWord.length >  0 ) {
            matchingWord.map(item => {$currentSpan[item.index].textContent = item.element});
        } else{
            const valueLife = parseInt($remainingLife.getAttribute("value"));
            valueLife != 0 ? ($remainingLife.setAttribute("value", `${valueLife - 10}`)) : console.log("Has fallado");
            
        }
        
        $currentSpan.every(itemText => itemText.textContent != "") ? setTimeout(() => { GameWon($mainContainer, $modalCategories)},200) : null;
    }

}
 */
/* export {initGame, wordtoInsert, categoriesWords, $guessWord, $alphabetLetters, $mainContainer, $firstHeader}; */