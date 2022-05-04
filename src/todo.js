class Todo{
    constructor(projectName, title, priority, dueDate){
        this.projectName = projectName;
         this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.checked = false;
        this.id = Date.now()
    }
    static deleteTodo(managePassedUp, project, todoId){
        managePassedUp(project, todoId);
    }
    static addTodo(managePassedUp, project, todo){
        managePassedUp(project, todo)
    }
}

export default Todo;