export const cte = (tag, cls) => {
    const el = document.createElement(tag);

    cls ? el.classList.add(cls) : null;

    return el;
}

export const addChild = (parent, child) => {
    parent.appendChild(child);

    return parent;
}