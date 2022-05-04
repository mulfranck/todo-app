import { ProjectList } from "./project.js";


/**************** STORAGE MANAGING *******************/
const LOCAL_PREF = 'TODO-ADD' 
const TODO_KEY =   `${LOCAL_PREF}-todoList`


class Storage {
    static saveTodos(todos){
    // Stringify the todoes 
    const todoJson = JSON.stringify(todos);
    
    // add the stringify object to the projects name object in the storage
    sessionStorage.setItem(TODO_KEY, todoJson)
    }

    static loadTodos() {
        let todoes = sessionStorage.getItem(TODO_KEY)
        // console.log(todoes)
        const c = (JSON.parse(todoes));
        // console.log(Object.keys(c))
        // console.log(Object.values(c))
        let pl = {}
        for ( let p in c) {
            pl[p] = c[p]; 
        }
        return pl;
    }
}

// const populateTodoList = (todoes) => {
//     for (todo in todoes) {
//         if (todoes.hasOwnProperty(todo)){
//             todoList[todo] = todoes[todo];
//         }
//     } 
// }

export default Storage;