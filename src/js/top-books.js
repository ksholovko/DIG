import { getTopBooks } from './API';

// import { pushBooksOnPage } from './selectedCategories';

export const sectionBooks = document.querySelector('.books');
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
  fetchDataAndCreateCard();
});
// seeMoreBtn.addEventListener('click', pushBooksOnPage);

function createCard(data) {
  const murkup = data
    .map(data => {
      const screenWidth = window.innerWidth;
      const arr = data.books;
      const list = data.list_name;
      let limitedData;
      if (screenWidth < 768) {
        limitedData = arr.slice(0, 1); // Для мобільних пристроїв 1 книжка вряду
        // console.log(limitedData);
      } else if (screenWidth < 1440) {
        limitedData = arr.slice(0, 3); // Для планшетів 2 книжки в ряду
        // console.log(limitedData);
      } else {
        limitedData = arr;
        // console.log(limitedData);
      }
      return `

<p class="category-title-top">${list}</p>
<ul class="list book-list book-list-top">
  ${limitedData
    .map(({ book_image, author, title, _id }) => {
      return `
  <li class="item book-list-item item-top-books js-ct" data-id="${_id}">
    <div class="image-container js-ct" data-id="${_id}"><img
      src="${book_image}"
      alt="Books created by ${author}"
      class="book-top-img js-ct"  data-id="${_id}"
    />
    <div class="image-caption js-ct" data-id="${_id}">quick view</div></div>
    <h3 class="book-item-tittle book-item-top js-ct" data-id="${_id}">${title}</h3>
    <p class="book-item-text js-ct" data-id="${_id}">${author}</p>
  </li>
  `;
    })
    .join('')}
  <button class="see-more-btn">see more</button>
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
