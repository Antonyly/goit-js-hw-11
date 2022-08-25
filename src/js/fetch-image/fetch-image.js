import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29194580-6d03f62d266b292b402d3a1d9';

export default async function fetchImages(value, page) {

  const filteredUrl = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  
  return await axios.get(`${BASE_URL}${filteredUrl}`).then(response => response.data);
}
export function fetchImage({ largeImageURL, webformatURL, tags, likes, views, comments, downloads })  {
    return `
        <div class='photo-card'>
        <div class="cards">
  <a href='${largeImageURL}'>
    <img src='${webformatURL}' alt='${tags}' loading='lazy' />
  </a>
  <div class='info'>
    <p class='info-item'>
      <b>Likes</b>
      ${likes}
    </p>
    <p class='info-item'>
      <b>Views</b>
      ${views}
    </p>
    <p class='info-item'>
      <b>Comments</b>
      ${comments}
    </p>
    <p class='info-item'>
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
  </div>
</div>
    `
}
