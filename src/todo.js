// Create a todo item object
const todoFact = (projectName, title, priority, dueDate) => {
    return {projectName, title, priority, dueDate, checked: false, id: Date.now()}
}


const addTodo = (managePassedUp, project, todo) => {
    //create the todo and give it to todo
    // const todo = todoFact(project, title, priority, dueDate)
    // select the project form the list of todoes and add this todo item to it.
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