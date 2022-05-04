
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


export {populateDom, populateTodoList, setStorage}