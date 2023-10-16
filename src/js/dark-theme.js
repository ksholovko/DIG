const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
};

const switcher = document.querySelector('.input_checkbox');;
const body = document.body;
switcher.addEventListener('change', onChange);
const savedTheme = localStorage.getItem('Theme');


if (!savedTheme) {
  body.classList.add(Theme.DARK);
  switcher.checked = true;
}

if (savedTheme) {
  body.classList.add(savedTheme);
  if (savedTheme === Theme.DARK) {
    switcher.checked = true;
  }
} else {
  body.classList.add(Theme.LIGHT);
}

function onChange(e) {
  if (e.currentTarget.checked) {
    body.classList.add(Theme.DARK);
    body.classList.remove(Theme.LIGHT);
    localStorage.setItem('Theme', Theme.DARK);
  } else {
    body.classList.add(Theme.LIGHT);
    body.classList.remove(Theme.DARK);
    localStorage.setItem('Theme', Theme.LIGHT);
  }
}
