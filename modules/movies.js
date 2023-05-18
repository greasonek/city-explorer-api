'use strict';

const axios = require('axios');
const cache = require('./cache');

async function getMovies (request, response, next){
  const {city} = request.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

  const key = 'movies' + city;

  if (cache[key] && (Date.now() - cache[key].timestamp < 500000)){
    console.log('Cache hit');
    response.status(200).send(cache[key].data);
  } else {
    console.log('Cache miss');

    axios.get(url)
      .then(res => res.data.results.map(movie => new Movies(movie)).slice(0, 5))
      .then(formattedData => {
        cache[key] = {};
        cache[key].data = formattedData;
        cache[key].timestamp = Date.now();
        response.status(200).send(formattedData);
      })

      .catch(error => next(error));
  }
  // try {
  //   const {city} = request.query;
  //   const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
  //   const movieResponse = await axios.get(url);
  //   const formattedData = movieResponse.data.results.map(movie => new Movies(movie)).slice(0,5);
  //   console.log(formattedData);
  //   response.status(200).send(formattedData);
  // }
  // catch (error){
  //   next(error);
  //   console.log(error);
  // }
}

class Movies {
  constructor(movieObj){
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.poster = movieObj.poster_path;
    this.release_Date = movieObj.release_Date;
  }
}

module.exports = getMovies;
