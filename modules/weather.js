'use strict';

const axios = require('axios');
const cache = require('./cache');

async function getWeather (request, response, next){
  const {lat, lon} = request.query;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7`;

  const key = 'weather' + lat + lon;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    response.status(200).send(cache[key].data);
  } else {
    console.log('Cache miss');

    axios.get(url)
      .then(res => res.data.data.map(day => new Forecast(day)))
      .then(formattedData => {
        cache[key] = {};
        cache[key].data = formattedData;
        cache[key].timestamp = Date.now();
        response.status(200).send(formattedData);
      })
      .catch(error => next(error));
  }
  // return cache[key].data;


  // try {
  //   const {lat, lon} = request.query;
  //   const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7`;
  //   const weatherRepsonse = await axios.get(url);
  //   const formattedData = weatherRepsonse.data.data.map(day => new Forecast(day));
  //   console.log(formattedData);
  //   response.status(200).send(formattedData);
  // }
  // catch(error){
  //   next (error);
  //   console.log(error);

}

class Forecast {
  constructor(weatherObj){
    this.date = weatherObj.datetime;
    this.temp = weatherObj.temp;
    this.description = weatherObj.weather.description;
    this.icon = weatherObj.weather.icon;
  }
}

module.exports= getWeather;
