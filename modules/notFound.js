'use strict';

function notFound(request, response){
  response.status(404).send('NOT FOUND');
}

module.exports = notFound;

