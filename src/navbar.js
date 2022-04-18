import './navbar.css'
import { addChild, cte } from "./general";

export const Navbar = () => {
    const headerEl = cte('header', 'header');
    const navEl = cte('nav', 'nav-bar');
    const titleEl = cte('h1', 'logo')
    const addModalEl = cte('a', 'adder-link');

    titleEl.append('Todo list')
    addModalEl.append('Add todo')
    addModalEl.addEventListener('click', () => {
        document.getElementById('todo-adder').style.display = 'block';
    })


    addChild(navEl, titleEl);
    addChild(navEl, addModalEl);

    addChild(headerEl, navEl)

    return headerEl;
}