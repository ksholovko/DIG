import { getCategoriesList } from './API';

const categoryContainer = document.querySelector('.categories-list');

async function categoriesData() {
  try {
    const result = await getCategoriesList();
    const categoriesList = createMarkUp(result);
    categoryContainer.insertAdjacentHTML('beforeend', categoriesList);
  } catch (error) {
    console.error(error);
  }
}

function createMarkUp(result) {
  return result
    .map(
      ({ list_name }) =>
        `<li class="categories-element"> 
        <button class="categories-item" name="${list_name}" type="submit"> 
    ${list_name}</button> 
    </li>`
    )
    .join('');
}

(async () => {
  await categoriesData();
  const categoriesBtns = categoryContainer.querySelectorAll('.categories-item');

  function toggleClass(event) {
    const categoriesButton = event.target;
    console.log(categoriesButton);

    categoriesButton.classList.add('active-btn');

    categoriesBtns.forEach(otherButton => {
      if (otherButton !== categoriesButton) {
        otherButton.classList.remove('active-btn');
      }
    });

  }

  categoriesBtns.forEach(categoriesButton => {
    categoriesButton.addEventListener('click', toggleClass);
  });
})();



// const seeMoreBtn = document.querySelector('.see-more-btn');

// seeMoreBtn.addEventListener('click', pushMoreBooks);

// async function pushMoreBooks(event) {
//   event.preventDefault();
//   sectionBooks.innerHTML = '';
//   const category = event.target.name;
//   const data = await getBooksByCategory(category);
//   renderBooksMarkup(data, category);
// }