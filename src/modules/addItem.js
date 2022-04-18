import { addChild, cte } from "../general"
/*
<article class="t-items">
    <input type="checkbox" name="" id="">
    <p class="t-title">Lorem, ipsum dolor sit</p>
    <p class="t-date"></p>
    <button class="t-details">Delails</button>

</article>
*/
export const addItem = ({title, dueDate}) => {
    const $itemEl = cte('article', 't-items');
    const $inputCheckerEl = cte('input', 't-complete');
    const $titleEl = cte('p', 't-title');
    const $dateEl = cte('p', 't-date');
    const $detailEl = cte('button', 't-details');
    const $deleteEl = cte('p', 't-delete');

    $inputCheckerEl.setAttribute('type', 'checkbox')
    $titleEl.innerText = title;
    $dateEl.innerText = dueDate;
    $detailEl.innerText = 'Detail';
    $deleteEl.innerHTML = '&times;'

    addChild($itemEl, $inputCheckerEl);
    addChild($itemEl, $titleEl)
    addChild($itemEl, $dateEl)
    addChild($itemEl, $detailEl)
    addChild($itemEl, $deleteEl)


    


    return $itemEl;
}