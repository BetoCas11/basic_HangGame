import { home } from "../homePage/index.js";

function GameWon(mainContainer, newCategory) {
    mainContainer.insertAdjacentHTML('beforeend', /*html */ `
        <dialog  class="you-win">
            <header>
            <h3>You Win</h3>
            </header>
            <div>
                <button>Continue</button>
                <button>New Category</button>
                <button>Quit Game</button>
            </div>

        </dialog>
    `);
    mainContainer.querySelector(`.you-win`).showModal();
    const modalWin = document.querySelector('.you-win');
    modalWin.addEventListener('click', (e) => {
        if (e.target.closest('button')) {
            switch (e.target.textContent) {
                case 'Continue':
                    location.reload();
                    break;
                case 'New Category':
                    modalWin.close();
                    newCategory.showModal();
                    break;
                case 'Quit Game':
                    location.href = `${location.origin}/index.html`;
                    break;
                default:
                    break;
            }
        }
    })
    
}

export {GameWon}