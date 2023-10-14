const colorSwitcher = document.querySelector('.theme-checkbox');
const body = document.querySelector('.body');
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('theme-checkbox');
    colorSwitcher.checked = true;
}

colorSwitcher.addEventListener('change', function (event) {
    event.preventDefault();
    if (this.checked) {
        localStorage.setItem('theme', 'dark');
        body.classList.add('theme-checkbox');
    } else {
        localStorage.setItem('theme', 'light');
        body.classList.remove('theme-checkbox');
    }
});