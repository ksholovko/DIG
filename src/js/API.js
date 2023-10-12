import axios from "axios";

axios.defaults.baseURL = 'https://books-backend.p.goit.global/books';

export async function getCategoriesList() {
    
    const response = await axios.get('/category-list');
  
    return (response.data);
}

export async function getTopBooks() {
    const response = await axios.get('/top-books');
    
   
    return (response.data);
}

export async function getBooksByCategory(category) {
    const response = await axios.get(`/category?category=${category}`);
    

    return (response.data);
   
}

export async function getBookById(id) {
    const response = await axios.get(`/${id}`);
    
    return (response.data);
}


// getCategoriesList();
// getTopBooks();
// getBooksByCategory('Audio Fiction')
// getBookById("643282b1e85766588626a0b2");
