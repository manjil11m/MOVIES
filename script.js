const grid = document.getElementById("movie-grid");
const searchBox = document.getElementById("search-box");
let allMovies = [];

fetch('movies.json')
  .then(res => res.json())
  .then(data => {
    allMovies = data;
    displayMovies(allMovies);
  });

function displayMovies(movies) {
  grid.innerHTML = "";
  movies.forEach((movie, index) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    card.addEventListener("click", () => {
      window.location.href = `movie.html?index=${index}`;
    });
    grid.appendChild(card);
  });
}

// Search
searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();
  displayMovies(allMovies.filter(m => m.title.toLowerCase().includes(query)));
});
