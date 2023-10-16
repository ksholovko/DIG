import { getTopBooks } from './API';

import { renderBooksMarkup } from './selectedCategories';

const sectionBooks = document.querySelector('.books');
const allCategory = document.querySelector('.all-category');
const seeMoreBtn = document.querySelector('.see-more-btn');

async function fetchDataAndCreateCard() {
  try {
    const responseData = await getTopBooks();
    createCard(responseData);
  } catch (error) {
    console.log('Error with your API');
  }
}

fetchDataAndCreateCard();

allCategory.addEventListener('click', function () {
  // sectionBooks.innerHTML = '';
  fetchDataAndCreateCard();
});

seeMoreBtn.addEventListener('click', function () {
  pushMoreBooks();
});

async function pushMoreBooks(event) {
  event.preventDefault();
  books.innerHTML = '';
  const category = event.target.name;
  const data = await getBooksByCategory(category);
  renderBooksMarkup(data, category);
}

function createCard(data) {
  const murkup = data
    .map(data => {
      const screenWidth = window.innerWidth;
      const arr = data.books;
      const list = data.list_name;
      let limitedData;
      if (screenWidth < 768) {
        limitedData = arr.slice(0, 1); // Для мобільних пристроїв 1 книжка вряду
        console.log(limitedData);
      } else if (screenWidth < 1440) {
        limitedData = arr.slice(0, 3); // Для планшетів 2 книжки в ряду
        console.log(limitedData);
      } else {
        limitedData = arr;
        console.log(limitedData);
      }
      return `

<p class="category-title-top">${list}</p>
<ul class="list book-list book-list-top">
  ${limitedData
    .map(({ book_image, author, title }) => {
      return `
  <li class="item book-list-item item-top-books">
    <div class="image-container"><img
      src="${book_image}"
      alt="Books created by ${author}"
      class="book-top-img"
    />
    <div class="image-caption">quick view</div></div>
    <h3 class="book-item-tittle book-item-top">${title}</h3>
    <p class="book-item-text">${author}</p>
  </li>
  `;
    })
    .join('')}
  <button class="see-more-btn" name="${list}">see more</button>
</ul>
`;
    })
    .join('');
  const heading = `
<h1 class="heading-top-books">
  Best Sellers <span class="part-heading-top">Books</span>
</h1>
`;
  sectionBooks.insertAdjacentHTML('beforeend', heading + murkup);
}
