const grid = document.getElementById("movie-grid");
const detail = document.getElementById("movie-detail");
const backBtn = document.getElementById("back-btn");
const movieTitle = document.getElementById("movie-title");
const moviePoster = document.getElementById("movie-poster");
const movieEmbed = document.getElementById("movie-embed");
const searchBox = document.getElementById("search-box");

let allMovies = [];

fetch('movies.json')
  .then(response => response.json())
  .then(movies => {
    allMovies = movies;
    displayMovies(movies);
  });

function displayMovies(movies) {
  grid.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    card.addEventListener("click", () => showDetail(movie));
    grid.appendChild(card);
  });
}

function showDetail(movie) {
  grid.classList.add("hidden");
  detail.classList.remove("hidden");
  movieTitle.textContent = movie.title;
  moviePoster.src = movie.poster;
  movieEmbed.src = movie.embed;
}

backBtn.addEventListener("click", () => {
  detail.classList.add("hidden");
  grid.classList.remove("hidden");
  movieEmbed.src = "";
});

// Search functionality
searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();
  const filtered = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );
  displayMovies(filtered);
});
