import { addChild } from "../general.js";
import { createProjectBtn } from "./createTodoContainer.js";

const populateDom = (renderer, todoes) => {
const $selectOption = document.querySelector('#projects');

    for (let todo in todoes) {
        // Allow only the direct properties
        if (todoes.hasOwnProperty(todo)){
            console.log(todo)
            addChild($selectOption, createProjectBtn(todo))
            $selectOption.innerHTML += `<option value=${todo}>${todo}</option>`;
            for (let aTodo in todoes[todo].list) {
                if (todoes[todo].list.hasOwnProperty(aTodo))
                // add dom element to the dom
                renderer(todoes[todo].list[aTodo])
            }
        }
    }
}

export default populateDom;