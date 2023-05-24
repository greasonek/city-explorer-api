'use strict';

const axios = require('axios');
// const { response } = require('express');

async function getRest(req, res, next) {
  const config = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer zu92ASVAMMP_yJ_I3mZNLX74J7NMkdM5pIoJWKjMb0zSJegWCuA7ky1DbxzoNIAeseWP_M59KX_gr6TpesnhlMYwI8eL4VIEf_e07ViQsxkikDiMFbN9eyrjOXRQZHYx',
    },
    params: {location: req.query.location}
  };
  axios(config)
    .then(response => response.data.businesses.map(rest => new Restaurants(rest)))
    .then(formattedData => {
      res.status(200).send(formattedData);
    })
    // .catch(err => res.status(500).send(err));
    .catch(error => next(error));
}


class Restaurants {
  constructor(yelpObj){
    this.restName = yelpObj.name;
    this.title = yelpObj.categories.title;
    this.rating = yelpObj.rating;
    this.price = yelpObj.price;
    this.address = yelpObj.location;
    this.phone = yelpObj.display_phone;
    this.img = yelpObj.image_url;
  }
}

module.exports = getRest;
