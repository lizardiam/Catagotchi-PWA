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

const catmodel = new CatController();

setInterval(() => {
  catmodel.decreaseLevels()
}, 10000);

setInterval(() => {
  model.updateDB()
}, 8000);

export default CatController;
