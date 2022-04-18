const todos = { 
    today : {
        list : [
            {
                title: 'go sport',
                dueDate: '05/06/456'
            },
            {
                title: 'justifying one',
                dueDate: '08-99-22'
            }
        ],
        size : 2
    },
};
const todoList = [];

const cte = (tag, cls) => {
    const el = document.createElement(tag);
    cls ? el.classList.add(cls) : null;
    return el;
}
const addChild = (parent, child) => {
    parent.appendChild(child);
    return parent;
}

const createTodoContainer = ({title, checked, id}) => {
    // create an article container for the todo
    // with title and id
    const $itemEl = cte('article')
    $itemEl.setAttribute('class', `t-items ${checked? 'done':''}`);
    const $inputCheckerEl = cte('input', 't-complete');
    const $titleEl = cte('p', 't-title');
    const $dateEl = cte('p', 't-date');
    const $detailEl = cte('button', 't-details');
    const $deleteEl = cte('p', 't-delete');

    $inputCheckerEl.setAttribute('type', 'checkbox')
    $itemEl.setAttribute('data-key', id)
    $titleEl.innerText = title;
    $dateEl.innerText = Date.now();
    $detailEl.innerText = 'Detail';
    $deleteEl.innerHTML = '&times;'

    addChild($itemEl, $inputCheckerEl);
    addChild($itemEl, $titleEl)
    addChild($itemEl, $dateEl)
    addChild($itemEl, $detailEl)
    addChild($itemEl, $deleteEl)

    return $itemEl;
}

const $adderBtn = document.querySelector('#adder');
const $adderModal = document.querySelector('#t-adder');
const $form = document.forms[0];

const $todoListHolder = document.getElementById('t-list');
const $deleteBtn = document.getElementById('t-delete');




const addTodo = (title, priority) => {
    // create an objt of todo containing the following property
    const todo = {
        title,
        priority: priority,
        checked: false,
        id: Date.now() //the id is a unique value of microsecond from the eqic
    }
    
    // And add this object to the global todo list array
    todoList.push(todo);
    // and render the item on the dom
    renderTodo(todo);
}

const findTodo = (todoId) => {
    // return the index of the found
    return todoList.findIndex(todoItem => todoItem.id === Number(todoId))
}

const toggleDone = (todoId) => {
    // Toggle the Done status and return true or false
    // use to change the opacity and underline the title.
    const thisTodo = findTodo(todoId)
    todoList[thisTodo].checked = !todoList[thisTodo].checked

    return todoList[thisTodo].checked;
}

const deleteTodo = (todoId, domEl) => {
    const thisTodo = findTodo(todoId);
    todoList.splice(thisTodo, 1); //remove from list
    domEl.remove(); //remove from the dom
}

const renderTodo = (todo) => {
    addChild($todoListHolder, createTodoContainer(todo))
}


$adderBtn.addEventListener('click', () => {
    $adderModal.classList.toggle('hide')
    $adderBtn.style.backgroundColor = 'rgb(214, 93, 71)'
    $adderBtn.disabled = true; //mk the addBtn unclickable
})

$form.addEventListener('submit', e => {
    e.preventDefault();
        const title = ($form.elements[0]);
        const dueDate = $form.elements[1];
        const priority = $form.elements[2];
        
        if (e.submitter.textContent === 'Add') {
            // submit only if the submitter is the add btn
            if (title.value !== '' && dueDate.value !== '' && priority.value !== ''){
                addTodo(title.value, priority.value);
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

$todoListHolder.addEventListener('click', (e) => {
    let attribute = e.target.getAttribute('class');
    let id = e.target.parentNode.dataset.key
    if (attribute === 't-delete'){
        deleteTodo(id, e.target.parentNode)
    }
    // console.log(e.target)
    if (attribute === 't-complete' | attribute === 't-title'){
        if (toggleDone(id)) {
        //    change the opacity and underline the title
        }
    }

    console.log(todoList)
})