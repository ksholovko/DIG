import { getBooksByCategory } from './API';

const listItem = document.querySelector('.categories-list');
const books = document.querySelector('.books');

listItem.addEventListener('click', pushBooksOnPage);

async function pushBooksOnPage(event) {
  event.preventDefault();
  books.innerHTML = '';
  const category = event.target.name;
  const data = await getBooksByCategory(category);
  renderBooksMarkup(data, category);
}

function renderBooksMarkup(choosenCategory, category) {
  let words = category.split(' ');
  words[words.length - 1] = `<span class="speccolor">${
    words[words.length - 1]
  }</span>`;
  category = words.join(' ');
  const headTitle = `<h2 class="category-tittle">${category}</h2>`;
  const murkup = `<ul class="book-list">${choosenCategory
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
    .join('')}</ul>`;
  books.insertAdjacentHTML('beforeend', headTitle + murkup);
}
