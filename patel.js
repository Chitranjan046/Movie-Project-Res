// https://www.omdbapi.com/?apikey=3ca5df7&t=${inputValue}

function removeExistingChild(){
    const moviesContainer = document.querySelector("#my-movies-list");
    while(moviesContainer.firstChild){
        moviesContainer.removeChild(moviesContainer.firstChild);
    }
}

async function searchMovie(){
    // 1-> fetch input node from the DOM
    const inputElement = document.querySelector("#search-field");
    const movieName = inputElement.value;
    
    const response = await fetch(`https://www.omdbapi.com/?apikey=3ca5df7&t=${movieName}`);
    const data = await response.json();

    // fetch the movie search container from DOM
    const movieSearchContainer = document.querySelector(".movies-container-search");
    const movieListContainer = document.querySelector("#my-movies-list")
    movieListContainer.style.opacity = 0.2;

    // create required tags for the search movie card
    const card = document.createElement("div");
    const posterContainer = document.createElement("div");
    const poster = document.createElement("img");
    const detailsContainer = document.createElement("div");
    const titleContainer = document.createElement("div");
    const title = document.createElement("p");
    const descriptionContainer = document.createElement("div");
    const description = document.createElement("p");
    const btnContainer = document.createElement("div");
    const addBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");

    // add event listener on cnacel
    cancelBtn.addEventListener("click", () => {
        movieSearchContainer.removeChild(card);
        inputElement.value = "";
        movieListContainer.style.opacity = 1;
    })

    // add event listener on add button
    addBtn.addEventListener("click", () => {
        inputElement.value = "";
        const myMovieList = JSON.parse(localStorage.getItem("myList"));
        myMovieList.push(data);
        localStorage.setItem("myList", JSON.stringify(myMovieList));
        movieSearchContainer.removeChild(card);
        removeExistingChild();
        showMovies();
        movieListContainer.style.opacity = 1;
    })

    // add the content for the above created tags
    poster.setAttribute("src", data.Poster);
    poster.setAttribute("alt", "Poster");
    title.innerHTML = data.Title;
    description.innerHTML = data.Plot;
    addBtn.innerHTML = "Add";
    cancelBtn.innerHTML = "Cancel";

    // add the class for styling
    card.classList.add("movie");
    posterContainer.classList.add("poster");
    detailsContainer.classList.add("details");
    titleContainer.classList.add("title");
    descriptionContainer.classList.add("plot");
    btnContainer.classList.add("btns");

    // creating parent child relationship
    btnContainer.appendChild(addBtn);
    btnContainer.appendChild(cancelBtn);
    descriptionContainer.appendChild(description);
    titleContainer.appendChild(title);
    detailsContainer.appendChild(titleContainer);
    detailsContainer.appendChild(descriptionContainer);
    detailsContainer.appendChild(btnContainer);
    posterContainer.appendChild(poster);
    card.appendChild(posterContainer);
    card.appendChild(detailsContainer);
    movieSearchContainer.appendChild(card);
}

function removeMovie(title){
    // -> fetch the movieList from the browser localstorage
    let movieList = JSON.parse(localStorage.getItem("myList"));

    // -> use filter method to remove the current movie
    movieList = movieList.filter((movie) => movie.Title != title);

    // -> add the updated movielist into the localstorage
    localStorage.setItem("myList", JSON.stringify(movieList));

}

function showMovies(){
    // fetch the movies list from the localstorage
    const myMovieList = JSON.parse(localStorage.getItem("myList"));

    // fetch the parent container
    const myMovieListContainer = document.querySelector("#my-movies-list");

    // traverse over the array
    for(let i = 0; i < myMovieList.length; i++){
        // create the required tags 
        const card = document.createElement("div");
        const poster = document.createElement("div");
        const details = document.createElement("div");
        const title = document.createElement("p");
        const description = document.createElement("p");
        const removeBtn = document.createElement("p");
        const image = document.createElement("img");

        removeBtn.addEventListener("click", () => {
            myMovieListContainer.removeChild(card);
            removeMovie(myMovieList[i].Title);
        })

        // add the content
        title.innerHTML = myMovieList[i].Title
        description.innerHTML = myMovieList[i].Plot;
        removeBtn.innerHTML = "Remove";

        // add attribute for img tag
        image.setAttribute("src", myMovieList[i].Poster);
        image.setAttribute("alt", "Poster");

        // add styling to the above created tags
        card.classList.add("movie-card");
        poster.classList.add("poster-card");
        details.classList.add("details-card");
        removeBtn.classList.add("remove-card");

        // create parent-child relationship
        details.appendChild(title);
        details.appendChild(description);
        details.appendChild(removeBtn);
        poster.appendChild(image);
        card.appendChild(poster);
        card.appendChild(details);
        myMovieListContainer.appendChild(card);
    }
}


// function to initialise the myList array into browser 
// localstorage
function initialiseList(){
    const myMovieList = JSON.parse(localStorage.getItem("myList"));
    if(!myMovieList){
        localStorage.setItem("myList", JSON.stringify([]));
    }
    // call the function which will display all the added movies in the dashboard
    showMovies();
}

initialiseList();

