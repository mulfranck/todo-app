const setStorage = () => {
    let todo = [
        {'title': 'just love', 'dueDate': 'today'},
        {'title': 'the storage is working', 'dueDate': 'storage'}
    ]
    todo.forEach((todo, index) => {
        sessionStorage.setItem(`todo${index}`, JSON.stringify(todo))
    })
}

setStorage();

const getStorageData =( () => {
    sessionStorage.removeItem('todo')
    let todo1 = JSON.parse(sessionStorage.getItem('todo1'));

    console.log('i am here.s')
    console.log(todo1.title)
})();