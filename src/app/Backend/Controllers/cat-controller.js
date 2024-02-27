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
    if (req.session && req.session.userid) {
      if (model.getCat(req.session.userid)) {
        console.log("Controller method now: ", model.getCat(req.session.userid))
        res.json(model.getCat(req.session.userid));
      } else {
        res.status(404).send({error: 'Cat not found'});
      }
    } else {
      res.status(401).send({error: 'Unauthorized'});
    }
  }


}

const catcontroller = new CatController();

setInterval(() => {
  catcontroller.decreaseLevels()
}, 10000);

setInterval(() => {
  model.updateDB()
}, 40000);

module.exports = new CatController;
