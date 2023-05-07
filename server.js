'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
// const { request } = require('express');

const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.status(200).send('I\'m working!');
});

app.get('/weather', (request, response) => {
  try {
    const {lat, lon, searchQuery} = request.query;
    const element = weatherData.find(city => city.city_name === searchQuery);
    const formattedData = element.data.map(day => new Forecast(day));
    console.log(formattedData);
    // response.status.apply(200).send(formattedData);
    response.status(200).send(formattedData);
  }
  catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(obj){
    this.date = obj.datetime;
    this.description = obj.weather.description;
  }
}

app.get('*', (request, response) => {
  response.status(404).send('NOT FOUND');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));

