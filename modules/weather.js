'use strict';

const axios = require('axios');

async function getWeather (request, response, next){
  try {
    const {lat, lon} = request.query;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7`;
    const weatherRepsonse = await axios.get(url);
    const formattedData = weatherRepsonse.data.data.map(day => new Forecast(day));
    console.log(formattedData);
    response.status(200).send(formattedData);
  }
  catch(error){
    next (error);
    console.log(error);
  }
  // const {lat, lon} = request.query;
  // const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7`;
  // axios.get(url)
  //   .then(response = response.data.data.map(day => new Forecast(day)))
  //   .then(formattedData => response.status(200).send(formattedData))
  //   .catch(error => next(error));
}

class Forecast {
  constructor(weatherObj){
    this.date = weatherObj.datetime;
    this.temp = weatherObj.temp;
    this.description = weatherObj.weather.description;
  }
}

module.exports= getWeather;
