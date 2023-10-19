const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
};


const body = document.body;
const savedTheme = localStorage.getItem('Theme');

const toggleSwitches = document.querySelectorAll('.input_checkbox');
toggleSwitches.forEach( toggleSwitch =>
  toggleSwitch.addEventListener('click', onChange))
  

function onChange(e) {
  if (e.currentTarget.checked) {
    body.classList.add(Theme.DARK);
    body.classList.remove(Theme.LIGHT);
    toggleSwitches.forEach(toggleSwitch => toggleSwitch.checked = true);
    localStorage.setItem('Theme', Theme.DARK);


  } else {
    body.classList.add(Theme.LIGHT);
    body.classList.remove(Theme.DARK);
    toggleSwitches.forEach(toggleSwitch => toggleSwitch.checked = false);

    localStorage.setItem('Theme', Theme.LIGHT);
  }
}


if (savedTheme) {
  body.classList.add(savedTheme);
  
  if (savedTheme === Theme.DARK) {
    toggleSwitches.forEach(toggleSwitch => toggleSwitch.checked = true);
  } else {
      toggleSwitches.forEach(toggleSwitch => toggleSwitch.checked = false);
  }

}