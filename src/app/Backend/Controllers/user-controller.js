const model = require('../Models/user-model')
const catModel = require("../Models/cat-model");
const sessionController = require('../Controllers/session-controller')
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();


class UserController {
  constructor() {
  }

  register (req, res) {
    let userid = Date.now();
    model.addUser(req.body.username, req.body.password, userid, req.body.email);
    catModel.addCat(req.body.name, userid);

    res.json({ success: true, message: 'Registration successful', userid: userid });

    sessionController.createSession();

    // TODO implement E-Mail Sending after Registering
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }

  deleteUser(req, res) {
    if (req.session.userid) {
      model.deleteUser(req.session.userid);
      catModel.deleteCat(req.session.userid);
      req.session.destroy();
      res.json({success: true, message: 'User and cat deleted successfully.'});
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

