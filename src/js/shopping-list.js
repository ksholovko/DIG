
import trash from '../images/icons.svg';
import amazon from '../images/amazon1.png';
import amazon2 from '../images/amazon2.png';
import applebooks from '../images/applebook1.png';
import applebooks2 from '../images/applebook2.png';


const bookList = document.querySelector('.list-books');
const storedBooks = JSON.parse(localStorage.getItem('storedBooks')) || [];

bookList.insertAdjacentHTML('beforeend', marcupListBooks(storedBooks));


// -- Функція верстки картки книги по даним з localStorage --//

function marcupListBooks(storedBooks) {
  return storedBooks
    .map(
      ({
        _id,
        title,
        book_image = '../images/book_default.jpg',
        author,
        description,
        list_name,
        buy_links,
      }) => {
        if (!description) {
          description =
            'Sorry, but this book does not have an accessible description. Try reading it on the website of one of the shops';
        }
        
        return `<li class="shopping-list-card">
        <img class="shopping-list-img" src="${book_image}" alt="${title}" />
        <div class="shopping-list-description-thumb">
        <div>
        <h2 class="title-book shopping-title-book">${title}</h2>
        <p class="shopping-list__subtitle ">${list_name}</p>
        <p class="description">${description}</p>
        </div>
        <div class="shopping-list-thumb">
        <span class="author">${author.split(',')[0]}</span>
        <ul class="shopping-list-store">
        <li class="shopping-list-icon"> 
        <a href="${
          buy_links.filter(({ name }) => {
            return name === 'Amazon';
          })[0].url
        }" target="_blank"><img style="height:16px " src="${amazon}" srcset ="${amazon} 1x, ${amazon2} 2x" class="darkFilterAmazon" alt="Amazon"/></a>
  </li>
  <li class="shopping-list-icon"> 
    <a href="${
      buy_links.filter(({ name }) => {
        return name === 'Apple Books';
      })[0].url
    }" target="_blank"><img style="height:27px " src="${applebooks}" srcset ="${applebooks} 1x, ${applebooks2} 2x" class="darkFilterAppleBooks" alt="Apple Books"/></a>
  </li>
  </ul>
  </div>
  </div>
  </div>
  <button type="button" data-id="${_id}" class="shopping-list-btn-del js-trash js-trash-id ">
  <svg class="trash js-trash">
    <use class="js-trash" href="${trash}#icon-trash"></use>
  </svg> 
  </button> 
            </li>
  `;
      }
    )
    .join('');
}

// -- Функція видалення картки книги зі сторінки та з localStorage --//

addEventListenerToDelete();

function addEventListenerToDelete() {
  const deleteButtons = document.querySelectorAll('.shopping-list-btn-del');
console.log(deleteButtons);

deleteButtons.forEach(button => {
  button.addEventListener('click', event => {
    const bookId = event.currentTarget.dataset.id;
    deleteBook(bookId); 
  });
});

}


function deleteBook(bookId) {
 
  const bookIndex = storedBooks.findIndex(book => book._id === bookId);

  if (bookIndex !== -1) {
    storedBooks.splice(bookIndex, 1);

    localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
    updateBookList();
    bookList.innerHTML = '';
    bookList.insertAdjacentHTML('beforeend', marcupListBooks(storedBooks));

    addEventListenerToDelete();

    updateBookList();
    
  }
}

updateBookList();

// -- Функція повідомлення, коли на сторінці немає карток --//

function updateBookList() {
  const emptyPageMessage = document.querySelector('.empty-page-message');
  const bookList = document.querySelector('.list-books');

  if (storedBooks.length === 0) {
    bookList.style.display = 'none';
    emptyPageMessage.style.display = 'flex';
  } else {
    bookList.style.display = 'block';
    emptyPageMessage.style.display = 'none';
  }
}
















