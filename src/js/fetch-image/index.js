import fetchImages from './fetch-image';
// import cardTemplate from '../templates/template.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onCountryСard } from './fetch-image.js';
import throttle from 'lodash.throttle';


const { searchForm, gallery, loadMoreBtn, endCollectionText } = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  endCollectionText: document.querySelector('.end-collection-text'),
};

let totalHits = 0;
let page = 1;
let searchQuery = null;

const onSearchForm =  async e => {
  e.preventDefault();
  searchQuery = e.currentTarget.searchQuery.value;
  page = 1;

  if (searchQuery === null) {
    return;
  }

  const response = await fetchImages(searchQuery, page);
  totalHits = response.hits.length;

  try {
    loadMoreBtn.classList.add('is-hidden');
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = '';
      createCardImage(response.hits);
      lightbox.refresh();
      endCollectionText.classList.add('is-hidden');

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * -100,
        behavior: 'smooth',
      });
    }

    if (response.totalHits === 0) {
      gallery.innerHTML = '';
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      loadMoreBtn.classList.add('is-hidden');
      endCollectionText.classList.add('is-hidden');
    }

  } catch (error) {
    console.log(error);
  }

    if (response.totalHits >= 40) {
      loadMoreBtn.style.display = "block"

  } else {
    loadMoreBtn.style.display = "none"
  }
}
loadMoreBtn.style.display = "none"

const onLoadMoreBtn = async () => {
  page += 1;
  const response = await fetchImages(searchQuery, page);
  createCardImage(response.hits);
  lightbox.refresh();
  totalHits += response.hits.length;

  if (totalHits >= response.totalHits) {
    // loadMoreBtn.classList.add('is-hidden');
        Notify.info(
      "We're sorry, but you've reached the end of search results."
        );
    loadMoreBtn.style.display = 'none';
  }
  
}

const createCardImage = array => {
  const cardExample = array.map(( largeImageURL, webformatURL, tags, likes, viewes, comments, downloads ) => onCountryСard( largeImageURL, webformatURL, tags, likes, viewes, comments, downloads )).join('');
  gallery.insertAdjacentHTML('beforeend', cardExample);
}

let lightbox = new SimpleLightbox('.photo-card a');

// document.addEventListener('scroll', () => {
//   if (window.scrollY === 2700) {
//     loadMoreBtn.style.position = 'fixed';
//   }
// })

loadMoreBtn.addEventListener('click', onLoadMoreBtn);
searchForm.addEventListener('submit', onSearchForm);