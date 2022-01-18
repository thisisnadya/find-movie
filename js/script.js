const API_KEY = 'api_key=9a49f607eea2d650a495df31e926d29f';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const movieContainer = document.querySelector('.movie-container');
const form = document.querySelector('.form');
const searchInput = document.getElementById('search');


getMovies(API_URL)
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    });
}

function showMovies(data) {
    let movie = '';
    data.forEach(element => {
        movie += `<div class="col-lg-3 col-md-4 col-sm-6 my-3">
                    <div class="card">
                        <img src="${IMG_URL}${element.poster_path}" class="card-img-top img-fluid" alt="...">
                        <div class="card-body">
                            <h5 class="card-title show-details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-tmdb="${element.id}">${element.title}</h5>
                            <p class="card-text text-muted">${element.vote_average} <i class="bi bi-star-fill"></i></p>
                        </div>
                    </div>
                </div>`;
        movieContainer.innerHTML = movie;
    });
}
document.addEventListener('click', function(e) {
    console.log(e.target);
    if(e.target.classList.contains('show-details')){
        const movieID = e.target.dataset.tmdb;
        fetch('https://api.themoviedb.org/3/movie/'+ movieID + '?' + API_KEY)
            .then(res => res.json())
            .then(res => {
                const movieDetail = `<div class="container-fluid">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <img src="${IMG_URL}${res.poster_path}" class="img-fluid" alt="">
                                            </div>
                                            <div class="col-md">
                                                <ul class="list-group">
                                                    <li class="list-group-item"><h6><strong>${res.title}</strong></h6></li>
                                                    <li class="list-group-item"><strong>Release Date : </strong>${res.release_date}</li>
                                                    <li class="list-group-item"><strong>Overview : </strong>${res.overview}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>`
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = movieDetail;
                console.log(res.title);
            });
    }
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchInputValue = searchInput.value;
    if(searchInputValue){
        getMovies(SEARCH_URL+'&query='+searchInputValue);
    }
});

