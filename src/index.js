const projectFactory = (projectName) => {
    const _name = projectName;
    const _list = {};
    let _len = 0;
    
    // METHODS
    function addInProj(task) {
        task.projectName = _name;
        _list[task.id] = task;
        _len++;
    }

    function rmTask(taskId) {
        if ( taskId in _list) {
            delete _list[taskId];
            _len--;
        }
        return _list;
    }

    function toggle(taskid) {
        __list[taskid].checked != _list[taskId].checked;
        return _list[taskid].checked;
    }

    function show(whatProps) {
        if (whatProps === 'list') {
            return _list;
        } else if (whatProps === 'size'){
            return _len;
        }

        return _name;
    }

    function showAll() {
        return `Project is ${_name.toUpperCase()} has ${_len} ${_len == 1 ? "todo": "todoes"}`
    }


    return {addInProj, rmTask, toggle, show, showAll}
}


const todoAdderProto = () => {
    return 
}

// This is the overall todo list
const todoList = {};
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

const createTodoContainer = ({projectName, title, checked, id}) => {
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
    // $dateEl.innerText = Date.now();
    // $detailEl.innerText = 'Detail';
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
    // create an objt of todo containing the following property
    // const todo = {
    //     title,
    //     priority: priority,
    //     checked: false,
    //     id: Date.now() //the id is a unique value of microsecond from the eqic
    // }
    
    // And add this object to the global todo list array
    // todoList.push(todo);

    //create the todo and give it to todo
    const todo = (todoFact(title, priority, dueDate))
    // select the project form the list of todoes and add this todo item to it.
    todoList[project].addInProj(todo);
    // and render the item on the dom
    renderTodo(todo);
}

const toggleDone = (project, todoId) => {
    // Toggle the Done status and return true or false
    // use to change the opacity and underline the title.
    // const thisTodo = findTodo(todoId)
    // todoList[thisTodo].checked = !todoList[thisTodo].checked

    // return todoList[thisTodo].checked;

   return todoList[project].toggle(todoId);
}

const deleteTodo = (project, todoId, domEl) => {
    // const thisTodo = findTodo(todoId);
    // todoList.splice(thisTodo, 1); //remove from list
    todoList[project].rmTask(todoId)
    domEl.remove(); //remove from the dom
}

const renderTodo = (todo) => {
    addChild($todoListHolder, createTodoContainer(todo))
}
// const setStorage = (project, todoItem) => {
//     project.
//     const jsonIt = JSON.stringify(todoItem);

//     sessionStorage.setItem(project)
// }





/**************** EVENT LISTENERS *******************/ 

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
    // console.log(e.submitter)
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

        // projectName.textContent = ''
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
    }
    // // console.log(e.target)
    // if (attribute === 't-complete' | attribute === 't-title'){
    //     if ((id)) {
    //     //    change the opacity and underline the title
    //     }
    // }
    // console.log(attribute)
    console.log(attribute)
})        