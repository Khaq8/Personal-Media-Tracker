const API_KEY = 'your_api_key_here';
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.portfolio-item, .about-text, .hero').forEach(el => {
        observer.observe(el);
    });
});

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=${API_KEY}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${API_KEY}`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}
let movieCollection = JSON.parse(localStorage.getItem('movieCollection')) || [];

// Function to add movie to collection
function addToCollection(movieDetails) {
    // Check if movie already exists in collection
    const exists = movieCollection.some(movie => movie.imdbID === movieDetails.imdbID);
    
    if (!exists) {
        // Add movie to collection
        movieCollection.push(movieDetails);
        // Save to localStorage
        localStorage.setItem('movieCollection', JSON.stringify(movieCollection));
        alert('Movie added to collection!');
    } else {
        alert('Movie already in collection!');
    }
}
function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
        <button class="btn add-btn" onclick="addToCollection(${JSON.stringify(details).replace(/"/g, '&quot;')})">Add to Collection</button>
    </div>
    `;
        const addButton = document.getElementById("addMovieBtn");

    addButton.addEventListener("click", function () {
        addToCollection(details);
    });
}
function displayCollection() {
    const collectionGrid = document.getElementById('collection-grid');
    
    // Get movies from localStorage
    let movieCollection = JSON.parse(localStorage.getItem('movieCollection')) || [];
    
    // Clear existing content
    collectionGrid.innerHTML = '';
    
    if (movieCollection.length === 0) {
        collectionGrid.innerHTML = `
            <div class="no-movies">
                <p>No movies in collection yet. Search and add some!</p>
            </div>
        `;
        return;
    }
    
    // Add movies to grid
    movieCollection.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" 
                     alt="${movie.Title}">
            </div>
            <h3 class="movie-title">${movie.Title}</h3>
            <p class="movie-year">Year: ${movie.Year}</p>
            <p class="movie-genre">Genre: ${movie.Genre}</p>
            <div><label class="switch">
                    <input type="checkbox">
                    <span class="slider round"></span>
                </label>
                <button class="delete-btn" onclick="deleteMovie('${movie.imdbID}')">Delete</button>
            </div>
        `;
        collectionGrid.appendChild(movieCard);
    });
}
        function deleteMovie(imdbID) {
            // Get current collection from localStorage
            let movieCollection = JSON.parse(localStorage.getItem('movieCollection')) || [];
            
            // Filter out the movie with the matching imdbID
            movieCollection = movieCollection.filter(movie => movie.imdbID !== imdbID);
            
            // Save back to localStorage
            localStorage.setItem('movieCollection', JSON.stringify(movieCollection));
            
            // Refresh the display
            displayCollection();
        }

// Alternative approach - if you want to pass the movie object properly
function displayMovieDetailsWithButton(details) {
    const resultGrid = document.getElementById('results');
    
    resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt="movie poster">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${details.Genre}</p>
            <p class="writer"><b>Writer:</b> ${details.Writer}</p>
            <p class="actors"><b>Actors: </b>${details.Actors}</p>
            <p class="plot"><b>Plot:</b> ${details.Plot}</p>
            <p class="language"><b>Language:</b> ${details.Language}</p>
            <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
            <button class="btn add-btn" data-movie='${JSON.stringify(details)}'>Add to Collection</button>
        </div>
    `;
    
    // Add event listener to the button
    const addButton = document.querySelector('.add-btn');
    if (addButton) {
        addButton.addEventListener("click", function() {
            const movieData = this.getAttribute('data-movie');
            const movieDetails = JSON.parse(movieData);
            addToCollection(movieDetails);
        });
    }
}

// Load collection when collection page loads
if (window.location.pathname.includes('collection.html')) {
    displayCollection();
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
