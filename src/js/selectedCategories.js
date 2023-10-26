import { getBooksByCategory } from './API';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


const listItem = document.querySelector('.categories-list');
const books = document.querySelector('.books');

listItem.addEventListener('click', pushBooksOnPage);

async function pushBooksOnPage(event) {
  event.preventDefault();
  books.innerHTML = '';
  const category = event.target.name;
  if (category === 'all-categories') {
    return;
  } else {
    Loading.dots();
    const data = await getBooksByCategory(category);
    Loading.remove();

    if (!data || data.length === 0) {
      alert('За вказаною категорією не знайдено жодної книги!');
    }
    renderBooksMarkup(data, category);
  }
}

export default function renderBooksMarkup(choosenCategory, category) {
  let words = category.split(' ');
  words[words.length - 1] = `<span class="speccolor">${
    words[words.length - 1]
  }</span>`;
  category = words.join(' ');
  const headTitle = `<h2 class="category-tittle">${category}</h2>`;
  const murkup = `<ul class="book-list">${choosenCategory
    .map(
      ({ book_image, title, author, _id }) => `

      <li class="book-list-item" data-id=${_id}>
      <div class="image-container">



        <img
          class="book-item-img"
          src="${book_image}"
          alt="${title}"
        />
        <div class="image-caption">quick view</div></div>
        <h3 class="book-item-tittle">${title}</h3>
        <p class="book-item-text">${author}</p>
      </li>
    `
    )
    .join('')}</ul>`;
  books.insertAdjacentHTML('beforeend', headTitle + murkup);
}
