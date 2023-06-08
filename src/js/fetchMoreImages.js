import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { refs } from '../js/refs.js';
import { renderGallery } from './renderGallery.js';

const API_KEY = '37001773-cee1ba8499dc5914eb991a31e';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;

export async function fetchMoreImages() {
  const searchWord = refs.input.value.trim();
  currentPage += 1;
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`
    );

    const searchResult = response.data.hits;
    renderGallery(searchResult);
    if (response.data.totalHits <= currentPage * 40) {
      refs.btnLoadMore.classList.add('visually-hidden');
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error.message);
    Notify.failure('Error occurred while loading more images.');
  }
}
