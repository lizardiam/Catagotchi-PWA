const model = require('../Models/user-model')
const catModel = require("../Models/cat-model");
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();


class UserController {
  constructor() {
  }

  // Adds new user and cat object when a user registers
  async register (req, res) {
    let userid = Date.now();
    await model.addUser(req.body.username, req.body.password, userid, req.body.email);
    await catModel.addCat(req.body.name, userid);

    req.session.regenerate((err) => {
      if (err) {
        // Handle error during session regeneration
        console.error('Session regeneration failed:', err);
        return res.status(500).json({success: false, message: 'Session regeneration failed', error: err.message});
      }

      // Set new session properties for the authenticated user
      req.session.userid = userid;
      req.session.freievariable = req.body.username;

        // Respond with successful registration message - inside regenerate callback to ensure it's executed ONLY AFTER regeneration 😭
      res.json({success: true, message: 'Registration successful', userid: userid});
    });

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

