const colorSwitcher = document.querySelector('.input_checkbox');
const body = document.querySelector('body');
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    colorSwitcher.checked = true;
}
colorSwitcher.addEventListener('change', function () {
    if (this.checked) {
        localStorage.setItem('theme', 'dark');
        body.classList.add('dark');
    } else {
        localStorage.setItem('theme', 'light');
        body.classList.remove('dark');
    }
});