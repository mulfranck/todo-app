import "./modal.css";
import { cte, addChild } from "./general";
const todo = {
    item: null
}


const handleChange = (e) => {
    todo.item = e.target.value;
}
const closeModal = () => {
    document.getElementById('todo-adder').style.display = 'none';

}

export const AddTodo = (todoAdder) => {
    const formEl = cte('form', 'adder');
    const inputEl = cte('input')
    const btnEl = cte('button', 'add')
    btnEl.innerText = 'Add todo'
    const modal = cte('div', 'modal');
    modal.classList.add('animate')
    modal.id = 'todo-adder'
    const cont = cte('div', 'form-in');
    const close = cte('span', 'close')
    close.innerHTML = '&times;';
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo.item ) {
            todoAdder(todo);
            closeModal();
            e.target.childNodes[1].childNodes[0].value = ''
            todo.item = null;

        } 

    }


    inputEl.addEventListener('change', handleChange)
    formEl.addEventListener('submit', handleSubmit)
    close.addEventListener('click', closeModal)


    addChild(formEl, close);
    addChild(cont, inputEl);
    addChild(cont, btnEl);
    addChild(formEl, cont)
    addChild(modal, formEl);


    return modal;
}