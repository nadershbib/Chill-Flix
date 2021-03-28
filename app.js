// TMDB API STUFF
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f4526ed1687913ca02e552a2c4265208&page=1';


const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';


const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=f4526ed1687913ca02e552a2c4265208&query="';

// form elements
const form  = document.getElementById('form');
//input element
const search = document.getElementById("search");

//main element
const main = document.getElementById("main");

//loader
const loader = document.querySelector(".loader");

//logo
const logo = document.querySelector(".logo");

logo.addEventListener('click',()=>getMovies(API_URL));

//GET initial movies

getMovies(API_URL);
async function getMovies(url){

    loader.style.display="block";
    
    try {
        const res = await fetch(url);
        const data =await  res.json();
        
        showMovies(data.results);
        
        loader.style.display="none";
    } 
    catch (err) {
        
        console.log(err.message);
        
        
    }
    finally{

    }

}
// removing the image in case of an error occured 
function removeImg(img){
    img.parentElement.remove();
}





// show movies
function showMovies(movies){
    main.innerHTML = '';
    

    movies.forEach(movie=>{
        const {title,poster_path,vote_average,overview,backdrop_path} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        let moviesLength = movies.length;
        movieEl.innerHTML = 
        `
        <img src="${IMG_PATH + poster_path}" alt="${title}" onerror=removeImg(this) />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
            ${truncate(overview)}
        </div>
         `
         main.appendChild(movieEl);
        
         


    })
}

function getClassByRate(vote){
    if(vote >= 8) return 'green';
    else if(vote >=5) return 'orange';
    else return 'red';
}

function truncate(str){
    let strArr = str.split(" ");
    return strArr.length >50 ? strArr.filter((val,i)=>i<50).join(" ")+"..." : strArr.join(" ");
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !==''){
        getMovies(SEARCH_API+ searchTerm);

        search.value = '';
    }
    else{
        window.location.reload();
    }
})

















