/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domManipulator.js":
/*!*******************************!*\
  !*** ./src/domManipulator.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addChild\": () => (/* binding */ addChild),\n/* harmony export */   \"cte\": () => (/* binding */ cte),\n/* harmony export */   \"populateDom\": () => (/* binding */ populateDom),\n/* harmony export */   \"populateDomWithProject\": () => (/* binding */ populateDomWithProject),\n/* harmony export */   \"removeEl\": () => (/* binding */ removeEl),\n/* harmony export */   \"renderProject\": () => (/* binding */ renderProject),\n/* harmony export */   \"renderTodo\": () => (/* binding */ renderTodo)\n/* harmony export */ });\nconst cte = (tag, cls) => {\n    const el = document.createElement(tag);\n\n    cls ? el.classList.add(cls) : null;\n\n    return el;\n}\n\nconst addChild = (parent, child) => {\n    parent.appendChild(child);\n\n    return parent;\n}\n\nconst $todoListHolder = document.getElementById('t-list');\n\nfunction renderTodo (todo) {\n    addChild($todoListHolder, createTodoContainer(todo))\n    let noMsg = document.querySelector('.no-todo');\n    noMsg && noMsg.remove();\n    console.log(noMsg)\n}\nfunction renderProject(projectName) {\n    const $todoProjectHolder = document.getElementById('p-list');\n    addChild($todoProjectHolder, createProjectBtn(projectName))\n}\n\nfunction removeEl(element){\n    element.remove();\n}\n\nconst noTodoMsg = (projectName) => {\n    // const $todoListHolder = document.getElementById('t-list');\n    const msg = `No todos for ${projectName}`;\n    let msgEl = cte('div', 'no-todo');\n    msgEl.style.textAlign = 'center';\n    msgEl.style.fontWeight = 'bold';\n    msgEl.style.fontSize = '1.2rem';\n    msgEl.append(msg);\n\n    $todoListHolder.appendChild(msgEl);\n}\nconst createTodoContainer = ({projectName, title, checked, id, dueDate, priority}) => {\n    // create an article container for the todo\n    // with title and id\n    const $itemEl = cte('article')\n    $itemEl.setAttribute('class', `t-items${checked? ' done':''}`);\n    $itemEl.setAttribute('data-key', id)\n    $itemEl.setAttribute('data-p-name', projectName);\n\n    const $rightGrpEl = cte('div', 'right-grp');\n    const $leftGrpEl = cte('div', 'left-grp');\n\n    const $inputCheckerEl = cte('input', 't-complete');\n    const $titleEl = cte('p', 't-title');\n    const $editEl = cte('i',);\n    const $detailEl = cte('i', 't-details');\n    const $deleteEl = cte('i');\n\n    $inputCheckerEl.setAttribute('type', 'checkbox')\n    $detailEl.setAttribute('class', 'fa fa-info t-details')\n    $editEl.setAttribute('class', 'fa fa-edit t-edit')\n    $deleteEl.setAttribute('class', 'fa fa-delete t-delete')\n    $deleteEl.setAttribute('id', 't-delete') //to acces from delete method\n    $titleEl.innerText = title;\n    $deleteEl.innerHTML = '&times;'\n\n    addChild($rightGrpEl, $inputCheckerEl);\n    addChild($rightGrpEl, $titleEl);\n    addChild($leftGrpEl, $editEl);\n    addChild($leftGrpEl, $detailEl);\n    addChild($leftGrpEl, $deleteEl);\n\n    addChild($itemEl, $rightGrpEl);\n    addChild($itemEl, $leftGrpEl);\n    return $itemEl;\n}\n\n\nconst createProjectBtn = (projectName) => {\n// render the project name to the dom\n    let projectBtnEl = cte('button', 'project');\n    projectBtnEl.setAttribute('id', projectName);\n    projectBtnEl.innerText = projectName;\n\n    return projectBtnEl;\n}\n\nconst populateDom = (todoes) => {\n    const $selectOption = document.querySelector('#projects');\n\n    for (let todo in todoes) {\n        // Allow only the direct properties\n        if (todoes.hasOwnProperty(todo)){\n            renderProject(todo)\n            $selectOption.innerHTML += `<option value=${todo}>${todo}</option>`;\n            if (todoes['default'].len == 0) {\n                noTodoMsg('default');\n                return;\n            }\n            for (let aTodo in todoes[todo].list) {\n                if (todoes[todo].list.hasOwnProperty(aTodo))\n                // add dom element to the dom\n                renderTodo(todoes[todo].list[aTodo])\n            }\n        }\n    }\n}\n\nconst populateDomWithProject = (projectName, {list, len}) => {\n    $todoListHolder.innerHTML = ''\n    \n    for (let p in list){\n        renderTodo(list[p])\n    }\n    !len && noTodoMsg(projectName);\n}\n\n\n\n\n\n\n//# sourceURL=webpack://todo-app/./src/domManipulator.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domManipulator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManipulator.js */ \"./src/domManipulator.js\");\n/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo.js */ \"./src/todo.js\");\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.js */ \"./src/project.js\");\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage.js */ \"./src/storage.js\");\n\n\n\n\n\n\nlet todoList = new _project_js__WEBPACK_IMPORTED_MODULE_2__.ProjectList();\ntodoList.addProject('default');\n// If there are todos load them and render\nObject.assign(todoList, _storage_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].loadTodos());\n(0,_domManipulator_js__WEBPACK_IMPORTED_MODULE_0__.populateDom)(todoList);\n\n\n/**************** Manage Global var *******************/ \nconst managePassedUpAdd = (project, todo) => {\n    todoList.addInProj(project, todo)\n}    \nconst managePassedUpDel = (project, todoId) => {\n    todoList.rmTask(project, todoId)\n}\n\n/**************** COLLECTING DOM ELEMENTS *******************/ \nconst $adderBtn = document.querySelector('#adder');\nconst $todoAdderModal = document.querySelector('#t-adder');  \nconst $projectForm = document.querySelector('#p-adder-form');\nconst $todoForm = document.forms[1];\nconst $selectOption = document.querySelector('#projects');\n\nconst $todoListHolder = document.getElementById('t-list');\nconst $projectAdderBtn = document.getElementById('add-project');\nconst $projectAdderFormTogger = document.getElementById('project-adder-form');\n\nlet $todo = document.querySelector('.todo')\nlet $progress = document.querySelector('.in-progress');\nlet $tabHeader = document.querySelectorAll('.tab-link');\nlet $h3 = document.querySelectorAll('.list-container h3');\nlet $navIcon = document.querySelector('.nav-icon');\n\nconst $pList = document.querySelector('#p-list');\n\n\n\n/**************** EVENT LISTENERS *******************/ \n\n// if the screen width on load is less than 650px hide all the headers\nwindow.addEventListener('load', (e) => {\n    if (e.currentTarget.innerWidth < 650) {\n        $h3.forEach(h3 => h3.style.visibility = 'hidden');\n        \n        $todo.style.display = 'block';\n        $progress.style.display = 'none';\n        $tabHeader[0].classList.add('active');\n    }\n})\nwindow.addEventListener('resize', e => {\n    if (e.currentTarget.innerWidth > 650) {\n        $todo.style.display = $progress.style.display = 'block'\n        $h3.forEach(h3 => h3.style.visibility = 'visible');\n    } else {\n        $h3.forEach(h3 => h3.style.visibility = 'hidden');\n        $progress.style.display = 'none'\n    }\n})\n\n$tabHeader.forEach(tabLink  => {\n    //for each of the tablink open its tabcontent and close the other\n    const repeated = () => {\n        $tabHeader[0].classList.toggle('active');\n        $tabHeader[1].classList.toggle('active');\n    }\n    tabLink.addEventListener('click', e => {\n        if (e.target.textContent === 'Todo') {\n            $todo.style.display = 'block';\n            $progress.style.display = 'none';\n            repeated();\n        }\n        if (e.target.textContent === ('In Progress')) {\n            $todo.style.display = 'none';\n            $progress.style.display = 'block';\n            repeated();\n\n        }\n    })\n});\n\n/**************** ASIDE NAV ELEMENT *******************/ \n\nconst shower = () => {\n    $navIcon.firstChild.classList.toggle('fa-bars');\n    $navIcon.firstChild.classList.toggle('fa-times');\n    document.querySelector('.control-panel').classList.toggle('show-nav')\n}\nconst loadProject = (e) => {\n    console.log(e.target)\n    let project = e.target.getAttribute('id');\n    shower();\n    if ( project in todoList) {\n        (0,_domManipulator_js__WEBPACK_IMPORTED_MODULE_0__.populateDomWithProject)(project, todoList[project])\n    }\n}\n\n$navIcon.addEventListener('click', shower)\n\n$pList.addEventListener('click', loadProject)\n\n// remove the aside if click on overlay \ndocument.querySelector('.overlay').addEventListener('click', shower)\n\n\n\n\n/**************** ADDERS: TODO AND PROJECT *******************/ \n\n$adderBtn.addEventListener('click', () => {\n    $todoAdderModal.classList.toggle('hide')\n    $adderBtn.style.backgroundColor = 'rgb(214, 93, 71)'\n    $adderBtn.disabled = true; //mk the addBtn unclickable\n})\n\n$projectAdderBtn.addEventListener('click', () => {\n    $projectAdderBtn.classList.toggle('hide');\n    $projectAdderFormTogger.classList.toggle('hide');\n})\n\n$todoForm.addEventListener('submit', e => {\n    e.preventDefault();\n    const title = $todoForm.elements[0];\n    const project = $todoForm.elements[1];\n    const priority = $todoForm.elements[2];\n    const dueDate = $todoForm.elements[3];\n    if (e.submitter.textContent === 'Add') {\n        // submit only if the submitter is the add btn\n        if (title.value !== '' && dueDate.value !== '' && priority.value !== ''){\n            const todo = new _todo_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\n                project.value, \n                title.value, \n                priority.value, \n                dueDate.value\n            )\n            _todo_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].addTodo(managePassedUpAdd, project.value, todo);\n            // and render the item on the dom\n            (0,_domManipulator_js__WEBPACK_IMPORTED_MODULE_0__.renderTodo)(todo);\n            _storage_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].saveTodos(todoList)\n            title.value = '';\n            priority.value = 'Easy';\n            dueDate.value = '';\n            $todoAdderModal.classList.toggle('hide');\n            $adderBtn.style.backgroundColor = ''\n            $adderBtn.disabled = false; //when submited mk adderbtn clickable\n        } else {\n            alert('The fields most not be empty!')\n        }\n    }\n    if (e.submitter.textContent !== 'Add'){\n        $todoAdderModal.classList.toggle('hide');\n        $adderBtn.style.backgroundColor = ''\n        $adderBtn.disabled = false;\n        \n    }\n})\n$projectForm.addEventListener('submit', (e) => {\n    e.preventDefault();\n    // Collect the project name\n    let projectName = ($projectForm.elements[0].value)\n    if (e.submitter.textContent === 'Add' && projectName != '') {\n        // Add project to the overall todo list.\n        todoList.addProject(projectName);\n        _storage_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].saveTodos(todoList);\n        (0,_domManipulator_js__WEBPACK_IMPORTED_MODULE_0__.renderProject)(projectName);\n        // Add the project name to the select option to the todo form elements.\n        $selectOption.innerHTML += `<option value=${projectName}>${projectName}</option>`;\n\n        // remove the content of the form\n        $projectForm.elements[0].value = '';\n\n        // Close the adder form and return the add btn\n        $projectAdderBtn.classList.toggle('hide');\n        $projectAdderFormTogger.classList.toggle('hide');\n\n    } else {\n        // remove the content of the form\n        $projectForm.elements[0].value = '';\n        // Close the adder form and return the add btn\n        $projectAdderBtn.classList.toggle('hide');\n        $projectAdderFormTogger.classList.toggle('hide');\n    }\n})\n\n\n/**************** TODO ITEMS FUNCTIONS *******************/ \n\n$todoListHolder.addEventListener('click', (e) => {\n    let attribute = e.target.getAttribute('id');\n    let todoEl = e.target.parentNode.parentNode\n    let project = e.target.parentNode.parentNode.dataset.pName;\n    if (attribute === 't-delete'){\n        _todo_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].deleteTodo(managePassedUpDel, project, todoEl.dataset.key)\n        _storage_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].saveTodos(todoList);\n        (0,_domManipulator_js__WEBPACK_IMPORTED_MODULE_0__.removeEl)(todoEl);\n    }\n})\n\n\n//# sourceURL=webpack://todo-app/./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProjectList\": () => (/* binding */ ProjectList)\n/* harmony export */ });\nclass Project{\n    constructor(pName) {\n        this.list = {};\n        this.len = 0;\n    }\n}\n\n\nclass ProjectList {\n    addInProj(pName, task) {\n        this[pName].list[task.id] = task;\n        this[pName].len++;\n    }\n    rmTask(projectName, taskId) {\n        if (taskId in this[projectName].list) {\n            this[projectName].len--;\n            delete this[projectName].list[taskId];\n        }\n    }\n    addProject(projectName) {\n        this[projectName] = new Project(projectName);\n    }\n}\n\n\n\n//# sourceURL=webpack://todo-app/./src/project.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ \"./src/project.js\");\n\n\n\n/**************** STORAGE MANAGING *******************/\nconst LOCAL_PREF = 'TODO-ADD' \nconst TODO_KEY =   `${LOCAL_PREF}-todoList`\n\n\nclass Storage {\n    static saveTodos(todos){\n    // Stringify the todoes \n    const todoJson = JSON.stringify(todos);\n    \n    // add the stringify object to the projects name object in the storage\n    sessionStorage.setItem(TODO_KEY, todoJson)\n    }\n\n    static loadTodos() {\n        let todoes = sessionStorage.getItem(TODO_KEY)\n        // console.log(todoes)\n        const c = (JSON.parse(todoes));\n        let pl = {}\n        for ( let p in c) {\n            pl[p] = c[p]; \n        }\n        return pl;\n    }\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);\n\n//# sourceURL=webpack://todo-app/./src/storage.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Todo{\n    constructor(projectName, title, priority, dueDate){\n        this.projectName = projectName;\n         this.title = title;\n        this.priority = priority;\n        this.dueDate = dueDate;\n        this.checked = false;\n        this.id = Date.now()\n    }\n    static deleteTodo(managePassedUp, project, todoId){\n        managePassedUp(project, todoId);\n    }\n    static addTodo(managePassedUp, project, todo){\n        managePassedUp(project, todo)\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);\n\n//# sourceURL=webpack://todo-app/./src/todo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;