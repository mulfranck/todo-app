import { cte, addChild } from "./general"


const display = (todo) => {
    const divEl = cte('div', 'todo-items')
    divEl.append(todo)

    return divEl;
}
export const DisplayAll = (todo) => {
    let sectionEl = cte('article', 'todo-item')

    if (todo.length > 0) {
        todo.forEach(({item}) => {
            addChild(sectionEl, display(item))
        })
    } else {
        return display(todo.item)
    }

    return sectionEl;
}