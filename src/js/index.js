import { refs } from '../js/refs.js';
import { scroll } from './scroll.js';

import { onLoadImages } from './onLoadImages.js';
import { onLoadMore } from './onLoadMore.js';

refs.form.addEventListener('submit', onLoadImages);

refs.btnLoadMore.addEventListener('click', onLoadMore);
