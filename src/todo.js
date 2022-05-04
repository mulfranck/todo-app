// Create a todo item object
const todoFact = (projectName, title, priority, dueDate) => {
    return {projectName, title, priority, dueDate, checked: false, id: Date.now()}
}


const addTodo = (managePassedUp, project, todo) => {
    managePassedUp(project, todo)
}

const deleteTodo = (managePassedUp, project, todoId) => {
    managePassedUp(project, todoId);
}

export {
    todoFact,
    addTodo,
    deleteTodo,
}