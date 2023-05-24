'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');
const getRest = require('./modules/yelp');
const notFound = require('./modules/notFound');

app.get('/', (request, response) => {
  response.status(200).send('I\'m working!');
});

app.get('/weather', getWeather);
app.get('/movies', getMovies);
app.get('/yelp', getRest);

app.use('*', notFound);

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));


// function getWeather (request, response, next){
// try {
// const {lat, lon} = request.query;
// const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7`;
//   const weatherRepsonse = await axios.get(url);
//   const formattedData = weatherRepsonse.data.data.map(day => new Forecast(day));
//   console.log(formattedData);
//   response.status(200).send(formattedData);
// }
// catch(error){
//   next (error);
//   console.log(error);
// }

// class Forecast {
//   constructor(weatherObj){
//     this.date = weatherObj.datetime;
//     this.temp = weatherObj.temp;
//     this.description = weatherObj.weather.description;
//   }
// }

// function getMovies (request, response, next){
// try {
// const {city} = request.query;
// const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
//   const movieResponse = await axios.get(url);
//   const formattedData = movieResponse.data.results.map(movie => new Movies(movie)).slice(0,5);
//   console.log(formattedData);
//   response.status(200).send(formattedData);
// }
// catch (error){
//   next(error);
//   console.log(error);
// }

// class Movies {
//   constructor(movieObj){
//     this.title = movieObj.title;
//     this.overview = movieObj.overview;
//     this.poster = movieObj.poster_path;
//   }
// }

// app.get('*', (request, response) => {
//   response.status(404).send('NOT FOUND');
// });


