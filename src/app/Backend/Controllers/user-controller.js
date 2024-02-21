const model = require('../Models/user-model')
const catModel = require("../Models/cat-model");
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();


class UserController {
  constructor() {
  }

  register (req, res) {
    let userid = Date.now();
    model.addUser(req.body.username, req.body.password, req.body.email);

    catModel.addCat(req.body.name, userid);

    // TODO implement E-Mail Sending after Registering

  }

  deleteUser(req, res) {
    if (req.session.userid) {
      model.removeUser(req.session.userid);
      gamemodel.deletePlant(req.session.userid);
      req.session.destroy();
    } else {
      res.status(404).send(`User could not be deleted.`);
    }
  }

  getUserData(req, res) {
    if (req.session.userid) {
      res.send(model.getUserById(req.session.userid));
    } else {
      res.status(404).send(`Could not get user data.`);
    }
  }

  updateUserInfo(req, res) {
    if (req.session.userid) {
      model.updateUserInfo(req.body, req.session.userid);
      //res.send(model.getUserById(req.session.userid));
    } else {
      res.status(404).send(`Could not update user info.`);
    }
  }

}
module.exports = new UserController();

