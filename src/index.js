const projectFactory = (projectName) => {
    const list = {};
    let len = 0;

    return {list, len}
}

let todoList = {};

todoList.__proto__.addInProj = function(projectName, task) {
        task.projectName = projectName;
        console.log(task);
        this.list[task.id] = task;
        this.len++;
    }

    todoList.__proto__.rmTask = function(project, taskId) {
        if (taskId in this[project].list) {
            delete this[project].list[taskId];
        }
        return this[project].list;
    }

    todoList.__proto__.toggle = function (taskid) {
        this.list[taskid].checked != this.list[taskId].checked;
        return list[taskid].checked;
    }

// This is the overall todo list
todoList.__proto__.addProject = function (projectName) {
    this[projectName] = projectFactory(projectName);
}

// instantiating the overall list with a default project
todoList.default = projectFactory('default');

/**************** GENERAL FUNCTIONS *******************/ 
const cte = (tag, cls) => {
    const el = document.createElement(tag);
    cls ? el.classList.add(cls) : null;
    return el;
}
const addChild = (parent, child) => {
    parent.appendChild(child);
    return parent;
}

const createTodoContainer = ({projectName, title, checked, id, dueDate, priority}) => {
    // create an article container for the todo
    // with title and id
    const $itemEl = cte('article')
    $itemEl.setAttribute('class', `t-items${checked? ' done':''}`);
    $itemEl.setAttribute('data-key', id)
    $itemEl.setAttribute('data-p-name', projectName);

    const $rightGrpEl = cte('div', 'right-grp');
    const $leftGrpEl = cte('div', 'left-grp');

    const $inputCheckerEl = cte('input', 't-complete');
    const $titleEl = cte('p', 't-title');
    const $editEl = cte('i',);
    const $detailEl = cte('i', 't-details');
    const $deleteEl = cte('i');

    $inputCheckerEl.setAttribute('type', 'checkbox')
    $detailEl.setAttribute('class', 'fa fa-info t-details')
    $editEl.setAttribute('class', 'fa fa-edit t-edit')
    $deleteEl.setAttribute('class', 'fa fa-delete t-delete')
    $deleteEl.setAttribute('id', 't-delete') //to acces from delete method
    $titleEl.innerText = title;
    $deleteEl.innerHTML = '&times;'

    addChild($rightGrpEl, $inputCheckerEl);
    addChild($rightGrpEl, $titleEl);
    addChild($leftGrpEl, $editEl);
    addChild($leftGrpEl, $detailEl);
    addChild($leftGrpEl, $deleteEl);

    addChild($itemEl, $rightGrpEl);
    addChild($itemEl, $leftGrpEl);
    return $itemEl;
}


/**************** COLLECTING DOM ELEMENTS *******************/ 
const $adderBtn = document.querySelector('#adder');
const $adderModal = document.querySelector('#t-adder');
const $projectForm = document.querySelector('#p-adder-form');
const $todoForm = document.forms[1];
const $selectOption = document.querySelector('#projects');

const $todoListHolder = document.getElementById('t-list');
const $todoProjectHolder = document.getElementById('p-list');
const $deleteBtn = document.getElementById('t-delete');
const $projectAdderBtn = document.getElementById('add-project');
const $projectAdderFormTogger = document.getElementById('project-adder-form');


// Create a todo item object
const todoFact = (title, priority, dueDate) => {
    return {title, priority, dueDate, checked: false, id: Date.now()}
}


const addTodo = (project, title, priority, dueDate) => {
    //create the todo and give it to todo
    const todo = (todoFact(title, priority, dueDate))
    // select the project form the list of todoes and add this todo item to it.
    todoList[project].addInProj(project, todo);

    setStorage();
    // and render the item on the dom
    renderTodo(todo);
}

const toggleDone = (project, todoId) => {
    // Toggle the Done status and return true or false
   return todoList[project].toggle(todoId);
}

const deleteTodo = (project, todoId, domEl) => {
    todoList.rmTask(project, todoId) //remove task from project passed
    domEl.remove(); //remove from the dom
}

const renderTodo = (todo) => {
    addChild($todoListHolder, createTodoContainer(todo))
}

/**************** STORAGE MANAGING *******************/ 

const setStorage = () => {
    // Stringify the todoes 
    let toStore = Object.assign({}, todoList);
    const jsonIt = JSON.stringify(toStore);
    
    // add the stringify object to the projects name object in the storage
    sessionStorage.setItem('todoList', jsonIt)
}
const getTodoesFromStorage = () => {
    let todoes = sessionStorage.getItem('todoList')
    return todoes;
}
const populateTodoList = (todoes) => {
    for (todo in todoes) {
        if (todoes.hasOwnProperty(todo)){
            todoList[todo] = todoes[todo];
        }
    } 
}
const populateDom = (todoes) => {
    for (todo in todoes) {
        // Allow only the direct properties
        if (todoes.hasOwnProperty(todo)){
            $selectOption.firstChild.remove()
            $selectOption.innerHTML += `<option value=${todo}>${todo}</option>`;
            for (aTodo in todoes[todo].list) {
                if (todoes[todo].list.hasOwnProperty(aTodo))
                // add dom element to the dom
                renderTodo(todoes[todo].list[aTodo])
            }
        }
    }
}


let $todo = document.querySelector('.todo')
let $progress = document.querySelector('.in-progress');
let $tabHeader = document.querySelectorAll('.tab-link');
let $h3 = document.querySelectorAll('.list-container h3');
let navIcon = document.querySelector('.nav-icon');




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
$tabHeader.forEach(tabLink  => {
    //for each of the tablink open its tabcontent and close the other
    tabLink.addEventListener('click', e => {
        if (e.target.textContent === 'Todo') {
            $todo.style.display = 'block'
            $progress.style.display = 'none'
            $tabHeader[0].classList.toggle('active')
            $tabHeader[1].classList.toggle('active')
        }
        if (e.target.textContent === ('In Progress')) {
            $todo.style.display = 'none'
            $progress.style.display = 'block'
            $tabHeader[1].classList.toggle('active')
            $tabHeader[0].classList.toggle('active')

        }
    })
});

window.addEventListener('resize', e => {
    if (e.currentTarget.innerWidth > 650) {
        $todo.style.display = $progress.style.display = 'block'
        $h3.forEach(h3 => h3.style.visibility = 'visible');
    } else {
        $h3.forEach(h3 => h3.style.visibility = 'hidden');
        $progress.style.display = 'none'
    }
})

// change nav icon on mouse over to a cross
navIcon.addEventListener('click', e => {
    navIcon.firstChild.classList.remove('fa-bars');
    navIcon.firstChild.classList.add('fa-times');
    document.querySelector('.control-panel').classList.toggle('show-nav')
})
// remove the aside if a the is a click anywhere
document.querySelector('.overlay').addEventListener('click', () => {
    navIcon.firstChild.classList.add('fa-bars');
    navIcon.firstChild.classList.remove('fa-times');
    document.querySelector('.control-panel').classList.toggle('show-nav')
} )


$adderBtn.addEventListener('click', () => {
    $adderModal.classList.toggle('hide')
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
            addTodo(project.value, title.value, priority.value, dueDate.value);
            title.value = priority.value = '';
            dueDate.value = '';
            $adderModal.classList.toggle('hide');
            $adderBtn.style.backgroundColor = ''
            $adderBtn.disabled = false; //when submited mk adderbtn clickable
        } else {
            alert('The fields most not be empty!')
        }
    }
    if (e.submitter.textContent === 'Cancel'){
        $adderModal.classList.toggle('hide');
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
        // render the project name to the dom
        let projectBtnEl = cte('button', 'project');
        projectBtnEl.setAttribute('id', projectName);
        projectBtnEl.innerText = projectName;

        addChild($todoProjectHolder, projectBtnEl)
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

$todoListHolder.addEventListener('click', (e) => {
    let attribute = e.target.getAttribute('id');
    let id = e.target.parentNode.parentNode.dataset.key;
    let project = e.target.parentNode.parentNode.dataset.pName;
    if (attribute === 't-delete'){
        deleteTodo(project, id, e.target.parentNode.parentNode)
        setStorage(todoList);
    }
    console.log(attribute)
})

window.addEventListener('load', e => {
    let t = JSON.parse(getTodoesFromStorage());
    populateTodoList(t)
    populateDom(todoList);
})

