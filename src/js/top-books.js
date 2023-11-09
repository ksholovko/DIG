import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { getTopBooks, getBooksByCategory } from './API';
import renderBooksMarkup from "./selectedCategories";

// import { pushBooksOnPage } from './selectedCategories';

const sectionBooks = document.querySelector('.books');
const allCategory = document.querySelector('.all-category');

  
async function fetchDataAndCreateCard() {
  try {
    Loading.dots();
    const responseData = await getTopBooks();
    createCard(responseData);
    Loading.remove();
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
      } else if (screenWidth < 1440) {
        limitedData = arr.slice(0, 3); // Для планшетів 2 книжки в ряду
      } else {
        limitedData = arr;
      }
      return `

<p class="category-title-top">${list}</p>
<ul class="list book-list book-list-top">
  ${limitedData
    .map(({ book_image, author, title, _id }) => {
      return `
  <li class="item book-list-item item-top-books" data-id=${_id}>
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


sectionBooks.addEventListener('click', pushMoreBooks) 


async function pushMoreBooks(event) {
 
  if (event.target.classList.value === 'see-more-btn') {
    Loading.dots();
    const category = event.target.parentNode.previousElementSibling;
    const data = await getBooksByCategory(category.textContent);
    sectionBooks.innerHTML = '';
 
    renderBooksMarkup(data, category.textContent);
      Loading.remove();

}
  }
 
  

