const model = require('../Models/cat-model');
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();


class CatController {


  feedCat (req, res) {
    if (req.session && req.session.userid) {
      if (model.getCat(req.session.userid)) {
        model.feedCat(req.session.userid);
        res.json({ success: true, message: 'Cat fed successfully' });
      } else {
        res.status(404).send({error: 'Cat not found'});
      }
    } else {
      res.status(401).send({error: 'Unauthorized'});
    }
  }

  waterCat (req, res) {
    if (req.session && req.session.userid) {
      if (model.getCat(req.session.userid)) {
        model.waterCat(req.session.userid);
        res.json({ success: true, message: 'Cat watered successfully' });
      } else {
        res.status(404).send({error: 'Cat not found'});
      }
    } else {
      res.status(401).send({error: 'Unauthorized'});
    }
  }

  petCat (req, res) {
    if (req.session && req.session.userid) {
      if (model.getCat(req.session.userid)) {
        model.petCat(req.session.userid);
        res.json({ success: true, message: 'Cat pet successfully' });
      } else {
        res.status(404).send({error: 'Cat not found'});
      }
    } else {
      res.status(401).send({error: 'Unauthorized'});
    }
  }

  decreaseLevels () {
    model.decreaseFoodLevel();
    model.decreaseWaterLevel();
    model.decreaseHappiness();
    model.updateDB();
  }

  // Gets all values of a cat object (to send to front end)
  getCatData (req, res) {
    if (req.session && req.session.userid) {
      if (model.getCat(req.session.userid)) {
        // console.log("Controller method now: ", model.getCat(req.session.userid))
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

// Setzt die Food, Water, und Happiness Level der Katze um den in der Methode gegebenen Wert hinunter
setInterval(() => {
  catcontroller.decreaseLevels()
}, 30000); // every 30 seconds

// Speichert Änderungen in der Katzen-DB
setInterval(() => {
  model.updateDB()
}, 30000); // every 30 seconds

// Setzt den _level Wert der Katze jedes Mal um 1 höher, wenn die Happiness >0 ist
setInterval( () => {
  model.levelUpCat();
}, 1000);   // every 10 seconds (for testing purposes)

module.exports = new CatController;
