/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const projectFactory = (projectName) => {\n    const _name = projectName;\n    const _list = {};\n    let _len = 0;\n    \n    // METHODS\n    function addInProj(task) {\n        task.projectName = _name;\n        _list[task.id] = task;\n        _len++;\n    }\n\n    function rmTask(taskId) {\n        if ( taskId in _list) {\n            delete _list[taskId];\n            _len--;\n        }\n        return _list;\n    }\n\n    function toggle(taskid) {\n        __list[taskid].checked != _list[taskId].checked;\n        return _list[taskid].checked;\n    }\n\n    function show(whatProps) {\n        if (whatProps === 'list') {\n            return _list;\n        } else if (whatProps === 'size'){\n            return _len;\n        }\n\n        return _name;\n    }\n\n    function showAll() {\n        return `Project is ${_name.toUpperCase()} has ${_len} ${_len == 1 ? \"todo\": \"todoes\"}`\n    }\n\n\n    return {addInProj, rmTask, toggle, show, showAll}\n}\n\n\nconst todoAdderProto = () => {\n    return \n}\n\n// This is the overall todo list\nconst todoList = {};\ntodoList.__proto__.addProject = function (projectName) {\n    this[projectName] = projectFactory(projectName);\n}\n// instantiating the overall list with a default project\ntodoList.default = projectFactory('default');\n\n/**************** GENERAL FUNCTIONS *******************/ \nconst cte = (tag, cls) => {\n    const el = document.createElement(tag);\n    cls ? el.classList.add(cls) : null;\n    return el;\n}\nconst addChild = (parent, child) => {\n    parent.appendChild(child);\n    return parent;\n}\n\nconst createTodoContainer = ({projectName, title, checked, id}) => {\n    // create an article container for the todo\n    // with title and id\n    const $itemEl = cte('article')\n    $itemEl.setAttribute('class', `t-items${checked? ' done':''}`);\n    $itemEl.setAttribute('data-key', id)\n    $itemEl.setAttribute('data-p-name', projectName);\n\n    const $inputCheckerEl = cte('input', 't-complete');\n    const $titleEl = cte('p', 't-title');\n    const $dateEl = cte('p', 't-date');\n    const $detailEl = cte('button', 't-details');\n    const $deleteEl = cte('p', 't-delete');\n\n    $inputCheckerEl.setAttribute('type', 'checkbox')\n    $titleEl.innerText = title;\n    $dateEl.innerText = Date.now();\n    $detailEl.innerText = 'Detail';\n    $deleteEl.innerHTML = '&times;'\n\n    addChild($itemEl, $inputCheckerEl);\n    addChild($itemEl, $titleEl)\n    addChild($itemEl, $dateEl)\n    addChild($itemEl, $detailEl)\n    addChild($itemEl, $deleteEl)\n\n    return $itemEl;\n}\n\n\n/**************** COLLECTING DOM ELEMENTS *******************/ \nconst $adderBtn = document.querySelector('#adder');\nconst $adderModal = document.querySelector('#t-adder');\nconst $projectForm = document.querySelector('#p-adder-form');\nconst $todoForm = document.forms[1];\nconst $selectOption = document.querySelector('#projects');\n\nconst $todoListHolder = document.getElementById('t-list');\nconst $todoProjectHolder = document.getElementById('p-list');\nconst $deleteBtn = document.getElementById('t-delete');\nconst $projectAdderBtn = document.getElementById('add-project');\nconst $projectAdderFormTogger = document.getElementById('project-adder-form');\n\n\n// Create a todo item object\nconst todoFact = (title, priority, dueDate) => {\n    return {title, priority, dueDate, checked: false, id: Date.now()}\n}\n\n\nconst addTodo = (project, title, priority, dueDate) => {\n    // create an objt of todo containing the following property\n    // const todo = {\n    //     title,\n    //     priority: priority,\n    //     checked: false,\n    //     id: Date.now() //the id is a unique value of microsecond from the eqic\n    // }\n    \n    // And add this object to the global todo list array\n    // todoList.push(todo);\n\n    //create the todo and give it to todo\n    const todo = (todoFact(title, priority, dueDate))\n    // select the project form the list of todoes and add this todo item to it.\n    todoList[project].addInProj(todo);\n    // and render the item on the dom\n    renderTodo(todo);\n}\n\nconst toggleDone = (project, todoId) => {\n    // Toggle the Done status and return true or false\n    // use to change the opacity and underline the title.\n    // const thisTodo = findTodo(todoId)\n    // todoList[thisTodo].checked = !todoList[thisTodo].checked\n\n    // return todoList[thisTodo].checked;\n\n   return todoList[project].toggle(todoId);\n}\n\nconst deleteTodo = (project, todoId, domEl) => {\n    // const thisTodo = findTodo(todoId);\n    // todoList.splice(thisTodo, 1); //remove from list\n    todoList[project].rmTask(todoId)\n    domEl.remove(); //remove from the dom\n}\n\nconst renderTodo = (todo) => {\n    addChild($todoListHolder, createTodoContainer(todo))\n}\n// const setStorage = (project, todoItem) => {\n//     project.\n//     const jsonIt = JSON.stringify(todoItem);\n\n//     sessionStorage.setItem(project)\n// }\n\n\n\n\n\n/**************** EVENT LISTENERS *******************/ \n\n$adderBtn.addEventListener('click', () => {\n    $adderModal.classList.toggle('hide')\n    $adderBtn.style.backgroundColor = 'rgb(214, 93, 71)'\n    $adderBtn.disabled = true; //mk the addBtn unclickable\n})\n\n$projectAdderBtn.addEventListener('click', () => {\n    $projectAdderBtn.classList.toggle('hide');\n    $projectAdderFormTogger.classList.toggle('hide');\n})\n\n$todoForm.addEventListener('submit', e => {\n    e.preventDefault();\n    const title = $todoForm.elements[0];\n    const project = $todoForm.elements[1];\n    const priority = $todoForm.elements[2];\n    const dueDate = $todoForm.elements[3];\n    if (e.submitter.textContent === 'Add') {\n        // submit only if the submitter is the add btn\n        if (title.value !== '' && dueDate.value !== '' && priority.value !== ''){\n            addTodo(project.value, title.value, priority.value, dueDate.value);\n            title.value = priority.value = '';\n            dueDate.value = '';\n            $adderModal.classList.toggle('hide');\n            $adderBtn.style.backgroundColor = ''\n            $adderBtn.disabled = false; //when submited mk adderbtn clickable\n        } else {\n            alert('The fields most not be empty!')\n        }\n    }\n    if (e.submitter.textContent === 'Cancel'){\n        $adderModal.classList.toggle('hide');\n        $adderBtn.style.backgroundColor = ''\n        $adderBtn.disabled = false;\n        \n    }\n})\n$projectForm.addEventListener('submit', (e) => {\n    e.preventDefault();\n    // console.log(e.submitter)\n    if (e.submitter.textContent === 'Add') {\n        // Collect the project name\n        let projectName = ($projectForm.elements[0].value)\n\n        // Add project to the overall todo list.\n        todoList.addProject(projectName);\n        // render the project name to the dom\n        let projectBtnEl = cte('button', 'project');\n        projectBtnEl.setAttribute('id', projectName);\n        projectBtnEl.innerText = projectName;\n\n        addChild($todoProjectHolder, projectBtnEl)\n        // Add the project name to the select option to the todo form elements.\n        $selectOption.innerHTML += `<option value=${projectName}>${projectName}</option>`;\n\n        // remove the content of the form\n        $projectForm.elements[0].value = '';\n\n        // Close the adder form and return the add btn\n        $projectAdderBtn.classList.toggle('hide');\n        $projectAdderFormTogger.classList.toggle('hide');\n\n        // projectName.textContent = ''\n    } else {\n        // remove the content of the form\n        $projectForm.elements[0].value = '';\n        // Close the adder form and return the add btn\n        $projectAdderBtn.classList.toggle('hide');\n        $projectAdderFormTogger.classList.toggle('hide');\n    }\n})\n\n$todoListHolder.addEventListener('click', (e) => {\n    let attribute = e.target.getAttribute('class');\n    let id = e.target.parentNode.dataset.key;\n    let project = e.target.parentNode.dataset.pName;\n    if (attribute === 't-delete'){\n        deleteTodo(project, id, e.target.parentNode)\n    }\n    // // console.log(e.target)\n    // if (attribute === 't-complete' | attribute === 't-title'){\n    //     if ((id)) {\n    //     //    change the opacity and underline the title\n    //     }\n    // }\n    // console.log(attribute)\n    console.log(id)\n})        \n\n//# sourceURL=webpack://todo-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;