const $adderBtn = document.querySelector('#adder');
const $adderModal = document.querySelector('#t-adder');
const $form = document.forms[0].elements;
const $todoTitle = $form[0];
const $todoDueDate = $form[1];
const $todoPriority = $form[2];

const $todoListHolder = document.getElementById('t-list');
const $deleteBtn = document.getElementById('t-delete');

const deleteTodo = () => {
    
}
const updateOnload = (adderFctn, todo, key) => {
    const element = adderFctn(todo)
    element.setAttribute('id', `${key}`)
    $todoListHolder.appendChild(element);
}

$adderBtn.addEventListener('click', () => {
    $adderModal.classList.toggle('hide');

})

export {
    updateOnload
}