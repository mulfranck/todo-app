let $todo = document.querySelector('.todo')
let $progress = document.querySelector('.in-progress');
let $tabHeader = document.querySelectorAll('.tab-link');
let $h3 = document.querySelectorAll('.list-container h3');

// if the screen width on load is less than 650px hide all the headers
window.addEventListener('load', (e) => {
    e.currentTarget.innerWidth <= 650 &&
    $h3.forEach(h3 => h3.style.visibility = 'hidden');

    $todo.style.display = 'block';
    $progress.style.display = 'none';
    $tabHeader[0].classList.add('active');

    // $h3.forEach(h3 => {
    //     h3.style.visibility = 'visible';
    // })
})
$tabHeader.forEach(tabLink  => {
    //for each of the tablink open its tabcontent and close the other
    tabLink.addEventListener('click', e => {
        if (e.target.textContent === 'Todo') {
            $todo.style.display = 'block'
            $progress.style.display = 'none'
            // tabLink.classList.toggle('active')
            $tabHeader[0].classList.toggle('active')
            $tabHeader[1].classList.toggle('active')
        }
        if (e.target.textContent === ('In Progress')) {
            $todo.style.display = 'none'
            $progress.style.display = 'block'
            $tabHeader[1].classList.toggle('active')
            $tabHeader[0].classList.toggle('active')

        }
    })
});

window.addEventListener('resize', e => {
    if (e.currentTarget.innerWidth > 650) {
        $todo.style.display = $progress.style.display = 'block'
        $h3.forEach(h3 => h3.style.visibility = 'visible');
    } else {
        $h3.forEach(h3 => h3.style.visibility = 'hidden');
        $progress.style.display = 'none'
    }
})