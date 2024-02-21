const model = require('../Models/cat-model');
const fetch = require('node-fetch');
const http = require('http')


class CatController {

  increaseLevels () {

  }

  decreaseLevels () {

  }

  getCatData (req, res) {

  }

}

const catmodel = new CatController();

setInterval(() => {
  catmodel.decreaseLevels()
}, 10000);

setInterval(() => {
  model.updateDB()
}, 8000);
