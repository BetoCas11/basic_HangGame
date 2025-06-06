import { home } from "./homePage/index.js";
import eventCategories from "./categories/index.js";
import { GameWon } from "./endGame/index.js";

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const categoriesWords = {
    'fruits': ['apple', 'banana', 'grape', 'orange', 'pear', 'strawberry', 'mango', 'pineapple', 'watermelon', 'cherry'],
    'animals': ['dog', 'cat', 'elephant', 'tiger', 'giraffe', 'penguin', 'dolphin', 'eagle', 'frog', 'bear'],
    'professions' : ['doctor', 'engineer', 'teacher', 'firefighter', 'police officer', 'writer', 'musician', 'lawyer', 'architect', 'chef'],
    'countries' : ['Mexico', 'Spain', 'France', 'Italy', 'Japan', 'Brazil', 'Argentina', 'Germany', 'Australia', 'Canada', 'United Kingdom'],
    'movies' : ['Inception', 'The Matrix', 'Titanic', 'Avatar', 'The Godfather', 'Jurassic Park', 'Star Wars', 'Dark Knight', 'Pulp Fiction', 'Forrest Gump']
};
const $firstHeader = document.querySelector('body > header');
const $mainContainer = document.querySelector('main');
const $buttonCategories = document.querySelector('#showCategories');
const $modalCategories = $mainContainer.querySelector('dialog');
const $titleCategories = document.querySelector('header > nav > li > p');
const $sectionCategories = $modalCategories.querySelector('article.categories');
const $remainingLife  = document.querySelector("progress");
const $guessWord = document.querySelector('.word');
const $alphabetLetters = document.querySelector('.alphabet-letters');


document.addEventListener('DOMContentLoaded', () => {
    alphabet.map(letter => {
        $alphabetLetters.insertAdjacentHTML("beforeend", /*html*/ `<button>${letter}</button>`)
    });
    $titleCategories.textContent = sessionStorage.getItem('selectCategory') ?? sessionStorage.setItem('selectCategory', "Movies");
    home($titleCategories.textContent.toLowerCase(), $buttonCategories, $modalCategories, $sectionCategories, Object.keys(categoriesWords), $titleCategories);
});

function initGame() {
    const currentCategory = categoriesWords[sessionStorage.getItem('selectCategory').toLowerCase()];
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
    $alphabetLetters.addEventListener("click", (event) => {buttonsHandling(event, JSON.parse(sessionStorage.getItem('keyword')))});
    
    
}


function wordtoInsert(randomWord, guessWord, separationWord, wordRemaing){
    $alphabetLetters.addEventListener("click", (event) => {buttonsHandling(event, JSON.parse(sessionStorage.getItem('keyword')))});
    if (!randomWord.includes(" ")) {
        guessWord.innerHTML = '';
        randomWord.map(letter => {guessWord.insertAdjacentHTML('beforeend', /*html*/ `<span><!--${letter}--></span>`)})
        console.log(randomWord);
    } else{
        guessWord.innerHTML = '';
        guessWord.insertAdjacentHTML("beforeend", `<div></div>`);
        guessWord.insertAdjacentHTML("beforeend", `<div></div>`);
        console.log(separationWord,wordRemaing);
        separationWord.map(letter => {guessWord.children[0].insertAdjacentHTML('beforeend', /*html*/ `<span><!--${letter}--></span>`)});
        wordRemaing.map(letter => {guessWord.children[1].insertAdjacentHTML('beforeend', /*html*/ `<span><!--${letter}--></span>`)});
    }
}

function buttonsHandling (e, word, alphabet=$alphabetLetters) {
    console.log(word);
    const $currentSpan = [...document.querySelectorAll(".word span")];
    const buttonAlhabet = e.target.textContent;
    const fixedWord = word.filter(item => item != " ")
    const valueIndexWord = fixedWord.map((item, index) => {
        return {
            "element": item,
            "index": index
        }
    })
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

export {initGame, wordtoInsert, categoriesWords, $guessWord, $alphabetLetters, $mainContainer, $firstHeader};