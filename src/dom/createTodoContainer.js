import { cte, addChild } from "../general.js";

const createTodoContainer = ({projectName, title, checked, id, dueDate, priority}) => {
    // create an article container for the todo
    // with title and id
    const $itemEl = cte('article')
    $itemEl.setAttribute('class', `t-items${checked? ' done':''}`);
    $itemEl.setAttribute('data-key', id)
    $itemEl.setAttribute('data-p-name', projectName);

    const $rightGrpEl = cte('div', 'right-grp');
    const $leftGrpEl = cte('div', 'left-grp');

    const $inputCheckerEl = cte('input', 't-complete');
    const $titleEl = cte('p', 't-title');
    const $editEl = cte('i',);
    const $detailEl = cte('i', 't-details');
    const $deleteEl = cte('i');

    $inputCheckerEl.setAttribute('type', 'checkbox')
    $detailEl.setAttribute('class', 'fa fa-info t-details')
    $editEl.setAttribute('class', 'fa fa-edit t-edit')
    $deleteEl.setAttribute('class', 'fa fa-delete t-delete')
    $deleteEl.setAttribute('id', 't-delete') //to acces from delete method
    $titleEl.innerText = title;
    $deleteEl.innerHTML = '&times;'

    addChild($rightGrpEl, $inputCheckerEl);
    addChild($rightGrpEl, $titleEl);
    addChild($leftGrpEl, $editEl);
    addChild($leftGrpEl, $detailEl);
    addChild($leftGrpEl, $deleteEl);

    addChild($itemEl, $rightGrpEl);
    addChild($itemEl, $leftGrpEl);
    return $itemEl;
}

export { createTodoContainer };