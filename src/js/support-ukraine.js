const fondsList = document.getElementById('fonds-list');
const suppBtn = document.querySelector('.supp-btn');
let clickCount = 0;
let firstClick = false;

const initialFonds = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: './images/save-the-children-1x.png',
    img2x: './images/save-the-children-2x.png',
    width: 129,
    height: 32,
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: './images/project-hope-1x.png',
    img2x: './images/project-hope-2x.png',
    width: 62,
    height: 32,
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: './images/international-medical-corps-1x.png',
    img2x: './images/international-medical-corps-2x.png',
    width: 103,
    height: 32,
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: './images/razom-1x.png',
    img2x: './images/razom-2x.png',
    width: 82,
    height: 32,
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: './images/action-against-hunger-1x.png',
    img2x: './images/action-against-hunger-2x.png',
    width: 55,
    height: 32,
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: './images/sergiy-prytula-1x.png',
    img2x: './images/sergiy-prytula-2x.png',
    width: 115,
    height: 32,
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: './images/medecins-sans-frontieres-1x.png',
    img2x: './images/medecins-sans-frontieres-2x.png',
    width: 94,
    height: 32,
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: './images/world-vision-1x.png',
    img2x: './images/world-vision-2x.png',
    width: 85,
    height: 30,
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: './images/united24-1x.png',
    img2x: './images/united24-2x.png',
    width: 109,
    height: 10,
  },
];
const fonds = [...initialFonds];
let currentState = [...fonds];

const itemsPerPage = 6;
let currentPage = 0;
let isAnimating = false;

const totalPages = Math.ceil(fonds.length / itemsPerPage);

function createListItem(fond, index) {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  const image = document.createElement('img');

  const number = (index + 1).toString().padStart(2, '0');
  const { img, img2x, width, height, url, title } = fond;

  listItem.classList.add('list-item');

  link.href = url;
  link.target = '_blank';

  if (window.devicePixelRatio > 1) {
    image.src = img2x || img;
  } else {
    image.src = img;
  }
  image.style.width = width + 'px';
  image.style.height = height + 'px';
  image.alt = title;

  link.appendChild(image);

  listItem.appendChild(document.createTextNode(number + ' '));
  listItem.appendChild(link);

  return listItem;
}

function updateList() {
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;

  fondsList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  for (let i = start; i < end; i++) {
    const adjustedIndex = i % fonds.length;
    const listItem = createListItem(fonds[adjustedIndex], adjustedIndex);
    fragment.appendChild(listItem);
  }
  fondsList.appendChild(fragment);
}
function resetFonds() {
  currentState = [...initialFonds];
  currentPage = 0;
  updateList();
}

function scrollUp() {
  currentPage = (currentPage - 1 + fonds.length) % fonds.length;
  updateList();
}

suppBtn.addEventListener('click', () => {
  clickCount++;

  if (clickCount === 1) {
    firstClick = true;
    suppBtn.style.transition = 'transform 0.3s ease';
    suppBtn.style.transform = 'rotate(270deg)';
  } else if (clickCount === 2) {
    suppBtn.style.transition = 'transform 0.3s ease';
    suppBtn.style.transform = 'rotate(90deg)';
    clickCount = 0;
    firstClick = false;

    resetFonds();
  }

  setTimeout(() => {
    if (clickCount === 1) {
      scrollUp();
    }
  }, 200);
});

updateList();
