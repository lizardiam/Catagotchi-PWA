import model from '../Models/cat-model';
import fetch from 'node-fetch';
import http from'http';


class CatController {

  increaseLevels () {
    //TODO
  }

  decreaseLevels () {
    //TODO
  }

  getCatData (req, res) {
    //TODO
  }

}

const catcontroller = new CatController();

setInterval(() => {
  catcontroller.decreaseLevels()
}, 10000);

setInterval(() => {
  model.updateDB()
}, 8000);

export default CatController;
