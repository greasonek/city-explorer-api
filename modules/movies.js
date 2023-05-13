'use strict';

const axios = require('axios');

async function getMovies (request, response, next){
  // const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
  // axios.get(url)
  //   .then(response => response.data.results.map(movie => new Movies(movie)).slice(0, 5))
  //   .then(formattedData => response.status(200).send(formattedData))
  //   .catch(error => next(error));
  try {
    const {city} = request.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
    const movieResponse = await axios.get(url);
    const formattedData = movieResponse.data.results.map(movie => new Movies(movie)).slice(0,5);
    console.log(formattedData);
    response.status(200).send(formattedData);
  }
  catch (error){
    next(error);
    console.log(error);
  }
}

class Movies {
  constructor(movieObj){
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.poster = movieObj.poster_path;
  }
}

module.exports = getMovies;
