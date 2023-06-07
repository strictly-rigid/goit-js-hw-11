// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';
// import { refs } from '../js/refs.js';
// import { scroll } from './scroll.js';

// const API_KEY = '37001773-cee1ba8499dc5914eb991a31e';
// const BASE_URL = 'https://pixabay.com/api/';
// let currentPage = 1;
// let searchWord = '';

// refs.btnLoadMore.classList.add('visually-hidden');

// refs.form.addEventListener('submit', onLoadImages);

// async function onLoadImages(event) {
//   event.preventDefault();
//   searchWord = refs.input.value;
//   refs.btnLoadMore.classList.add('visually-hidden');

//   if (searchWord)
//     try {
//       const response = await axios.get(
//         `${BASE_URL}?key=${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`
//       );

//       if (response.status !== 200) {
//         throw new Error(response.status);
//       }

//       const searchResult = response.data.hits;
//       if (!searchResult.length) {
//         refs.gallery.innerHTML = '';
//         return Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }

//       renderGallery(searchResult);
//       refs.btnLoadMore.classList.remove('visually-hidden');
//       Notify.info(`Hooray! We found ${response.data.totalHits} images.`);

//       if (response.data.totalHits <= 40) {
//         refs.btnLoadMore.classList.add('visually-hidden');
//       } else {
//         refs.btnLoadMore.classList.remove('visually-hidden');
//       }
//     } catch (error) {
//       console.log(error);
//       Notify.failure('Bad request');
//       refs.gallery.innerHTML = '';
//     }

//   // scroll();
// }

// function renderGallery(images) {
//   refs.gallery.innerHTML = images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
//     <div class="photo-card">
//       <div class="photo-item">
//         <a href="${largeImageURL}" alt="${tags}">
//           <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         </a>
//       </div>
//       <div class="info">
//         <p class="info-item">
//           <b>Likes:</b> ${likes}
//         </p>
//         <p class="info-item">
//           <b>Views:</b> ${views}
//         </p>
//         <p class="info-item">
//           <b>Comments:</b> ${comments}
//         </p>
//         <p class="info-item">
//           <b>Downloads:</b> ${downloads}
//         </p>
//       </div>
//     </div>
//   `
//     )
//     .join('');
// }

// refs.btnLoadMore.addEventListener('click', onLoadMore);
// async function onLoadMore() {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}?key=${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${
//         currentPage + 1
//       }&per_page=40`
//     );

//     if (response.status !== 200) {
//       throw new Error(response.status);
//     }

//     const searchResult = response.data.hits;
//     if (!searchResult.length) {
//       return Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }

//     renderGallery(searchResult);
//     refs.btnLoadMore.classList.remove('visually-hidden');

//     if (response.data.totalHits < (currentPage + 1) * 40) {
//       refs.btnLoadMore.classList.add('visually-hidden');
//       Notify.warning(
//         "We're sorry, but you've reached the end of search results."
//       );
//     } else {
//       refs.btnLoadMore.classList.remove('visually-hidden');
//     }

//     currentPage += 1;
//     if (currentPage >= 2) {
//       scroll();
//     }
//   } catch (error) {
//     console.log(error);
//     return Notify.failure(error);
//   }
// }
