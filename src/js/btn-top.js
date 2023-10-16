import { getBooksByCategory } from "./API";

const seeMoreBtn = document.querySelector('.see-more-btn');

  seeMoreBtn.addEventListener('click', pushMoreBooks);

async function pushMoreBooks(event) {
  event.preventDefault();
  sectionBooks.innerHTML = '';
  const category = event.target.name;
  const data = await getBooksByCategory(category);
  renderBooksMarkup(data, category);
}
  