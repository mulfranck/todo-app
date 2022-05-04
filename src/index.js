import {renderTodo, populateDom, renderProject, removeEl } from "./domManipulator.js"
import { addTodo, deleteTodo, todoFact} from "./todo.js";
import { ProjectList } from "./project.js";
import Storage from "./storage.js";


let todoList = new ProjectList();
todoList.addProject('default');
// If there are todos load them and render
Object.assign(todoList, Storage.loadTodos());
populateDom(todoList);


/**************** Manage Global var *******************/ 
const managePassedUpAdd = (project, todo) => {
    todoList.addInProj(project, todo)
}    
const managePassedUpDel = (project, todoId) => {
    todoList.rmTask(project, todoId)
}

/**************** COLLECTING DOM ELEMENTS *******************/ 
const $adderBtn = document.querySelector('#adder');
const $todoAdderModal = document.querySelector('#t-adder');  
const $projectForm = document.querySelector('#p-adder-form');
const $todoForm = document.forms[1];
const $selectOption = document.querySelector('#projects');

const $todoListHolder = document.getElementById('t-list');
const $projectAdderBtn = document.getElementById('add-project');
const $projectAdderFormTogger = document.getElementById('project-adder-form');

let $todo = document.querySelector('.todo')
let $progress = document.querySelector('.in-progress');
let $tabHeader = document.querySelectorAll('.tab-link');
let $h3 = document.querySelectorAll('.list-container h3');
let $navIcon = document.querySelector('.nav-icon');





/**************** EVENT LISTENERS *******************/ 

// if the screen width on load is less than 650px hide all the headers
window.addEventListener('load', (e) => {
    if (e.currentTarget.innerWidth < 650) {
        $h3.forEach(h3 => h3.style.visibility = 'hidden');
        
        $todo.style.display = 'block';
        $progress.style.display = 'none';
        $tabHeader[0].classList.add('active');
    }
})
window.addEventListener('resize', e => {
    if (e.currentTarget.innerWidth > 650) {
        $todo.style.display = $progress.style.display = 'block'
        $h3.forEach(h3 => h3.style.visibility = 'visible');
    } else {
        $h3.forEach(h3 => h3.style.visibility = 'hidden');
        $progress.style.display = 'none'
    }
})

$tabHeader.forEach(tabLink  => {
    //for each of the tablink open its tabcontent and close the other
    const repeated = () => {
        $tabHeader[0].classList.toggle('active');
        $tabHeader[1].classList.toggle('active');
    }
    tabLink.addEventListener('click', e => {
        if (e.target.textContent === 'Todo') {
            $todo.style.display = 'block';
            $progress.style.display = 'none';
            repeated();
        }
        if (e.target.textContent === ('In Progress')) {
            $todo.style.display = 'none';
            $progress.style.display = 'block';
            repeated();

        }
    })
});

/**************** ASIDE NAV ELEMENT *******************/ 

const shower = () => {
    $navIcon.firstChild.classList.toggle('fa-bars');
    $navIcon.firstChild.classList.toggle('fa-times');
    document.querySelector('.control-panel').classList.toggle('show-nav')
}

$navIcon.addEventListener('click', shower)

// remove the aside if click on overlay 
document.querySelector('.overlay').addEventListener('click', shower)




/**************** ADDERS: TODO AND PROJECT *******************/ 

$adderBtn.addEventListener('click', () => {
    $todoAdderModal.classList.toggle('hide')
    $adderBtn.style.backgroundColor = 'rgb(214, 93, 71)'
    $adderBtn.disabled = true; //mk the addBtn unclickable
})

$projectAdderBtn.addEventListener('click', () => {
    $projectAdderBtn.classList.toggle('hide');
    $projectAdderFormTogger.classList.toggle('hide');
})

$todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = $todoForm.elements[0];
    const project = $todoForm.elements[1];
    const priority = $todoForm.elements[2];
    const dueDate = $todoForm.elements[3];
    if (e.submitter.textContent === 'Add') {
        // submit only if the submitter is the add btn
        if (title.value !== '' && dueDate.value !== '' && priority.value !== ''){
            const todo = todoFact(
                project.value, 
                title.value, 
                priority.value, 
                dueDate.value
            )
            addTodo(managePassedUpAdd, project.value, todo);
            // and render the item on the dom
            renderTodo(todo);
            Storage.saveTodos(todoList)
            title.value = '';
            priority.value = 'Easy';
            dueDate.value = '';
            $todoAdderModal.classList.toggle('hide');
            $adderBtn.style.backgroundColor = ''
            $adderBtn.disabled = false; //when submited mk adderbtn clickable
        } else {
            alert('The fields most not be empty!')
        }
    }
    if (e.submitter.textContent !== 'Add'){
        $todoAdderModal.classList.toggle('hide');
        $adderBtn.style.backgroundColor = ''
        $adderBtn.disabled = false;
        
    }
})
$projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.submitter.textContent === 'Add') {
        // Collect the project name
        let projectName = ($projectForm.elements[0].value)

        // Add project to the overall todo list.
        todoList.addProject(projectName);
        Storage.saveTodos(todoList);
        renderProject(projectName);
        // Add the project name to the select option to the todo form elements.
        $selectOption.innerHTML += `<option value=${projectName}>${projectName}</option>`;

        // remove the content of the form
        $projectForm.elements[0].value = '';

        // Close the adder form and return the add btn
        $projectAdderBtn.classList.toggle('hide');
        $projectAdderFormTogger.classList.toggle('hide');

    } else {
        // remove the content of the form
        $projectForm.elements[0].value = '';
        // Close the adder form and return the add btn
        $projectAdderBtn.classList.toggle('hide');
        $projectAdderFormTogger.classList.toggle('hide');
    }
})


/**************** TODO ITEMS FUNCTIONS *******************/ 

$todoListHolder.addEventListener('click', (e) => {
    let attribute = e.target.getAttribute('id');
    let todoEl = e.target.parentNode.parentNode
    let project = e.target.parentNode.parentNode.dataset.pName;
    if (attribute === 't-delete'){
        deleteTodo(managePassedUpDel, project, todoEl.dataset.key)
        removeEl(todoEl);
        Storage.saveTodos(todoList);
    }
})
