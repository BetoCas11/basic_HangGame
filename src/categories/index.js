import { wordtoInsert, $guessWord, categoriesWords, $alphabetLetters, $mainContainer, $firstHeader, initGame } from "../main.js";
function eventCategories(buttonElement, dialogModal, sectionCategories, categories, titleCategory) {
    buttonElement.addEventListener('click', () => {
        /* buttonElement.disabled = true; */
        dialogModal.showModal();
    })
    categories.map(item => {
        sectionCategories.insertAdjacentHTML('beforeend',/*html*/ `
            <button>${item.toUpperCase()}</button>
        `)
    });

    sectionCategories.addEventListener('click', (e) => {

        if (e.target.closest('button')) {
            [...$alphabetLetters.children].forEach(item => item.disabled = false);
            $firstHeader.classList.remove('hide-element');
            [...$mainContainer.children].forEach(item => item.classList.remove('hide-element'));
            const valueTitle = e.target.textContent.charAt(0).toUpperCase() +  e.target.textContent.slice(1).toLowerCase();
            titleCategory.textContent = valueTitle;
            dialogModal.close();
            sessionStorage.setItem('selectCategory', titleCategory.textContent);
            const currentCategory = categoriesWords[sessionStorage.getItem('selectCategory').toLowerCase()];
            const randomWord = currentCategory[Math.floor(Math.random() * currentCategory.length)].toUpperCase().split("");
            const lastSpacedWord = randomWord.findLastIndex(index => index == " ");
            const separationWord = randomWord.slice(0, lastSpacedWord);
            const wordRemaing = randomWord.slice((lastSpacedWord + 1), randomWord.length);
            location.href = `${location.origin}/index.html#${sessionStorage.getItem('selectCategory')}`;
            sessionStorage.setItem('keyword', JSON.stringify(randomWord));
            
            wordtoInsert(JSON.parse(sessionStorage.getItem('keyword')), $guessWord, separationWord, wordRemaing);
        }
    })
}

export default eventCategories;

//Si bien la palabra cambia con sus span correpondientes, al evento de los botones sigue comparando con la palabra del inicio del juego, así que, cómo hago para actualizar esa palabra una vez que se cambiaron de cetegorías