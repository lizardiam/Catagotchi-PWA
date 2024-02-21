const model = require('../Models/cat-model');
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();


class CatController {

  increaseLevels (req, res) {
    //TODO
    return 0;
  }

  decreaseLevels () {
    //TODO
  }

  getCatData (req, res) {
    //TODO
    return 0;
  }

}

const catcontroller = new CatController();

setInterval(() => {
  catcontroller.decreaseLevels()
}, 10000);

setInterval(() => {
  model.updateDB()
}, 8000);

module.exports = new CatController;
