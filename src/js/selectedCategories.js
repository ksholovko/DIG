import { getCategoriesList, getBooksByCategory } from './API';

const bookCategory = document.querySelector('.category-tittle');
const booksList = document.querySelector('.book-list');
// const list-item = document.querySelector('.categories-item');

// list-item.addEventListener('click', renderBooksMarkup);

// function renderBooksMarkup(event) {
//   event.preventDefault();
// }

let category = 'Hardcover Fiction';
bookCategory.textContent = category;

fetchBooksByCategoty(category);

async function fetchBooksByCategoty() {
const data = await getBooksByCategory(category);
renderBooksMarkup(data);
}


function renderBooksMarkup(choosenCategory) {
  const murkup = choosenCategory
    .map(
      ({ book_image, title, author }) => `
      <li class="book-list-item">
        <img
          class="book-item-img"
          src="${book_image}"
          alt="${title}"
        />
        <h3 class="book-item-tittle">${title}</h3>
        <p class="book-item-text">${author}</p>
      </li>
    `
    )
    .join('');
  booksList.innerHTML = murkup;
}
