import { getBooksByCategory } from './API';

const bookCategory = document.querySelector('.category-tittle');
const booksList = document.querySelector('.book-list');
const listItem = document.querySelector('.categories-item');

listItem.addEventListener('click', pushBooksOnPage);

async function pushBooksOnPage(event) {
  event.preventDefault();
  booksList.innerHTML = '';
  const category = event.target.name;
  //   let category = 'Hardcover Fiction';
  const data = await getBooksByCategory(category);
  renderBooksMarkup(data, category);
}

function renderBooksMarkup(choosenCategory, category) {
  let words = category.split(' ');
  words[words.length - 1] = `<span class="speccolor">${
    words[words.length - 1]
  }</span>`;
  category = words.join(' ');
  bookCategory.innerHTML = `<h2 class="category-tittle">${category}</h2>`;
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
