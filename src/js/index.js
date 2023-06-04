import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from "../js/refs.js";

const API_KEY = '37001773-cee1ba8499dc5914eb991a31e';
const BASE_URL = 'https://pixabay.com/api/';

let currentPage = 1; 
let searchWord = '';
let searchArray = [];

console.log(refs);

refs.btnLoadMore.classList.add('visually-hidden');


refs.form.addEventListener('submit', onImageSearch);


async function onImageSearch(event) {
    event.preventDefault();
    searchWord = refs.input.value;
    
  try {
    currentPage = 1;
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`);
    if (!response.ok) {
            throw new Error(response.statusText)
    }
        const searchResult = await response.json();
     if (!searchResult.hits.length) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    console.log(searchResult);
    console.log(typeof searchResult.hits);
    console.log(searchResult.hits);
    const searchArray = searchResult.hits;
    renderGallery(searchArray);
    refs.btnLoadMore.classList.remove('visually-hidden');
    Notify.info(`Hooray! We found ${searchResult.totalHits} images.`)

    if (searchResult.totalHits <= 40) {
    refs.btnLoadMore.classList.add('visually-hidden');
  } else {
    refs.btnLoadMore.classList.remove('visually-hidden');
  }

    }
  catch (error) {
        console.log(error)
        return Notify.failure('Bad request');
  }
}

export function renderGallery(images) {
    refs.gallery.innerHTML = '';
    refs.gallery.innerHTML = createMarkup(images);
}

function createMarkup(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${downloads}
        </p>
      </div>
    </div>
  `).join('');
}

// refs.gallery.innerHTML = createMarkup(searchArray);
refs.gallery.innerHTML = createMarkup([]);

refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onLoadMore() {
  currentPage += 1;
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const searchResult = await response.json();
    if (!searchResult.hits.length) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    searchArray = searchResult.hits;
    renderGallery(searchArray);

    if (searchResult.totalHits < currentPage * 40) {
      refs.btnLoadMore.classList.add('visually-hidden');
      Notify.warning("We're sorry, but you've reached the end of search results.");
    } else {
      refs.btnLoadMore.classList.remove('visually-hidden');
    }

    
  } catch (error) {
    console.log(error);
    return Notify.failure('Bad request');
  }
}
