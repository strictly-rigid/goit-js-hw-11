import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { refs } from '../js/refs.js';
import { renderGallery } from './renderGallery.js';

const API_KEY = '37001773-cee1ba8499dc5914eb991a31e';
const BASE_URL = 'https://pixabay.com/api/';

export async function onLoadImages(event) {
  event.preventDefault();

  const searchWord = refs.input.value.trim();
  //   refs.btnLoadMore.classList.add('visually-hidden');

  if (!searchWord) {
    return;
  }

  refs.gallery.innerHTML = '';
  let currentPage = 1;

  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    const searchResult = response.data.hits;
    if (!searchResult.length) {
      //   refs.gallery.innerHTML = '';
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    refs.btnLoadMore.classList.remove('visually-hidden');
    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    renderGallery(searchResult);

    if (response.data.totalHits <= 40) {
      refs.btnLoadMore.classList.add('visually-hidden');
    } else {
      refs.btnLoadMore.classList.remove('visually-hidden');
    }
  } catch (error) {
    console.log(error.message);
    Notify.failure('Bad request');
    refs.gallery.innerHTML = '';
  }

  // scroll();
}
