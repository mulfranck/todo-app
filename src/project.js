class Project{
    constructor(pName) {
        this.list = {};
        this.len = 0;
    }
}


export class ProjectList {
    addInProj(pName, task) {
        this[pName].list[task.id] = task;
        this[pName].len++;
    }
    rmTask(projectName, taskId) {
        if (taskId in this[projectName].list) {
            this[projectName].len--;
            delete this[projectName].list[taskId];
        }
    }
    addProject(projectName) {
        this[projectName] = new Project(projectName);
    }
}

