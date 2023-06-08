import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { refs } from './refs.js';
import { renderGallery } from './renderGallery.js';
import { fetchImages } from './fetchImages.js';
import { fetchMoreImages } from './fetchImages.js';

const API_KEY = '37001773-cee1ba8499dc5914eb991a31e';
const BASE_URL = 'https://pixabay.com/api/';

refs.form.addEventListener('submit', onLoadImages);

refs.btnLoadMore.addEventListener('click', onLoadMore);

refs.btnLoadMore.classList.add('visually-hidden');

async function onLoadImages(event) {
  event.preventDefault();
  refs.btnLoadMore.classList.add('visually-hidden');

  fetchImages();
}

async function onLoadMore() {
  fetchMoreImages();
}
