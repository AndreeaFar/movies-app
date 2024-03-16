const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: 'f3fe8b50faf09902b081b3145c4c2861',
    apiURL: 'https://api.themoviedb.org/3/',
  },
};

// Display 20 most popular TV shows
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}" />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}" />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Display 20 most popular TV shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((tv) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="tv-details.html?id=${tv.id}">
            ${
              tv.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
              class="card-img-top"
              alt="${tv.name}" />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${tv.name}" />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${tv.fisrt_air_date}</small>
            </p>
          </div>`;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

// Display Movie Details
async function displayMovieDetalis() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for backround image
  displayBackroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}" />`
        : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}" />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)}/ 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
       ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}        
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
        movie.budget
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
        movie.revenue
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group"> ${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(', ')}</div>
  </div>
  `;

  document.querySelector('#movie-details').appendChild(div);
}

// Display Show Details
async function displayShowDetalis() {
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showId}`);

  // Overlay for backround image
  displayBackroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}" />`
        : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}" />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)}/ 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
       ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}        
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }</li>
      
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group"> ${show.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(', ')}</div>
  </div>
  `;

  document.querySelector('#show-details').appendChild(div);
}

// Display Backdrop On Details Pages
function displayBackroundImage(type, backroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.2';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Search Movies/Shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    // @todo - make request and display results
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    displaySearchResults(results);

    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term!');
  }
}

function displaySearchResults(results) {
  // Clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
              class="card-img-top"
              alt="${
                global.search.type === 'movie' ? result.title : result.name
              }" />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${
                global.search.type === 'movie' ? result.title : result.name
              }" />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === 'movie' ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === 'movie'
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>`;

    document.querySelector(
      '#search-results-heading'
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;

    document.querySelector('#search-results').appendChild(div);
  });

  displayPagination();
}

// Create and display pagination for search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector('#pagination').appendChild(div);

  // Disable prev button if on first page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable the next button if on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next page
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });

  // Prev page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
}

// Display SLider Movies
async function displaySLider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>`;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidePerView: 2,
      },
      700: {
        slidePerView: 3,
      },
      1200: {
        slidePerView: 4,
      },
    },
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

// Make requests to Search
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Show Alert
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
      displaySLider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetalis();
      break;
    case '/tv-details.html':
      displayShowDetalis();
      break;
    case '/search.html':
      search();
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
