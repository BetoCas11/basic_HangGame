/* import eventCategories from "../categories/index.js";
import { initGame } from "../main.js";
eventCategories */
function home (categories, buttons, modalCategories, sectionCategories, allCategories, titleContent) {
    const mainBody = document.querySelector('body');
    mainBody.children[0].classList.add('hide-element');
    [...mainBody.children[1].children].filter(item => item.className != 'modal').forEach(item => item.classList.add('hide-element'));
    const locationDefault = location.origin;
    mainBody.insertAdjacentHTML('beforeend', /*html */ `
        <dialog class="home">
            <header>
                <h1><p>The</p> <span>Hangman</span> <p>Game</p></h1>
            </header>
            <div>
                <button><div></div></button>
                <button >How to play</button>
            </div>
        </dialog>
    `)
    console.log(locationDefault);
    mainBody.querySelector('dialog.home').showModal();
    playGame(categories, locationDefault);
    selectCategoryHome(mainBody, buttons, modalCategories, sectionCategories, allCategories, titleContent, mainBody);

}
function playGame(categories, locationDefault){
    const playButton = document.querySelector('dialog.home > div > button:first-child');
    location.href = `${locationDefault}/index.html#${sessionStorage.getItem('selectCategory') ?? "movies"}`
    
    console.log(locationDefault);
    playButton.addEventListener('click', () => {
        initGame(categories);
    })

}
function selectCategoryHome(bodyContainer, buttons, modalallCategories, sectionCategories, allCategories, titleContent){
    const selectCategories = document.querySelector('dialog.home > div > button:last-child');
    const modalCategories = bodyContainer.querySelector('dialog.modal')
    selectCategories.addEventListener('click', (e) => {
        bodyContainer.querySelector('dialog.home').close();
        modalCategories.showModal();
        modalCategories.removeAttribute('closedby');
        modalCategories.children[0].children[0].remove();
        console.log(e.target);
        eventCategories(buttons, modalallCategories, sectionCategories, allCategories, titleContent);
    })

}

export {home};