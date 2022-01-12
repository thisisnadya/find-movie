const API_KEY = 'api_key=9a49f607eea2d650a495df31e926d29f';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const movieContainer = document.querySelector('.movie-container');
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

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
                            <h5 class="card-title"><strong>${element.title}</strong></h5>
                            <p class="card-text text-muted">2016</p>
                        </div>
                    </div>
                </div>`
        movieContainer.innerHTML = movie;
    });
}