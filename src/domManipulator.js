export const cte = (tag, cls) => {
    const el = document.createElement(tag);

    cls ? el.classList.add(cls) : null;

    return el;
}

export const addChild = (parent, child) => {
    parent.appendChild(child);

    return parent;
}

const $todoListHolder = document.getElementById('t-list');

function renderTodo (todo) {
    addChild($todoListHolder, createTodoContainer(todo))
    let noMsg = document.querySelector('.no-todo');
    noMsg && noMsg.remove();
    console.log(noMsg)
}
function renderProject(projectName) {
    const $todoProjectHolder = document.getElementById('p-list');
    addChild($todoProjectHolder, createProjectBtn(projectName))
}

function removeEl(element){
    element.remove();
}

const noTodoMsg = (projectName) => {
    // const $todoListHolder = document.getElementById('t-list');
    const msg = `No todos for ${projectName}`;
    let msgEl = cte('div', 'no-todo');
    msgEl.style.textAlign = 'center';
    msgEl.style.fontWeight = 'bold';
    msgEl.style.fontSize = '1.2rem';
    msgEl.append(msg);

    $todoListHolder.appendChild(msgEl);
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


const createProjectBtn = (projectName) => {
// render the project name to the dom
    let projectBtnEl = cte('button', 'project');
    projectBtnEl.setAttribute('id', projectName);
    projectBtnEl.innerText = projectName;

    return projectBtnEl;
}

const populateDom = (todoes) => {
    const $selectOption = document.querySelector('#projects');

    for (let todo in todoes) {
        // Allow only the direct properties
        if (todoes.hasOwnProperty(todo)){
            renderProject(todo)
            $selectOption.innerHTML += `<option value=${todo}>${todo}</option>`;
            if (todoes['default'].len == 0) {
                noTodoMsg('default');
                return;
            }
            for (let aTodo in todoes[todo].list) {
                if (todoes[todo].list.hasOwnProperty(aTodo))
                // add dom element to the dom
                renderTodo(todoes[todo].list[aTodo])
            }
        }
    }
}

const populateDomWithProject = (projectName, {list, len}) => {
    $todoListHolder.innerHTML = ''
    
    for (let p in list){
        renderTodo(list[p])
    }
    !len && noTodoMsg(projectName);
}




export {populateDom, populateDomWithProject, renderTodo, renderProject, removeEl }