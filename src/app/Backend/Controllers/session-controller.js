const usermodel = require("../models/user-model.js");
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();


class SessionController {

  // For Logging in, sets up a session
  createSession(req, res) {
    console.log(req.body);
    // check if username+password combi is valid
    if (req.body && req.body.username && req.body.password) {
      if (usermodel.isCredValid(req.body.username, req.body.password)) {
        console.log(req.body);
        // if yes, store the userid in req.session
        req.session.userid = usermodel.getUserid(req.body.username, req.body.password)
        req.session.freievariable = req.body.username;
        console.log(req.session);
        // if yes, send JSON object indicating success + msg + userid
        res.json({success: true, message: 'Login successful', userid: req.session.userid})
      } else {
        // if no, send unauthorized status code + JSON object indicating failure + msg
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    }
  }

  // Not used
  isSessionValid(req, res) {
    if (req.session.userid) {
      //res.send("Welcome User <a href=\'/api/logout'>click to logout</a>");
      res.send(true);
    } else
      res.status(404).send(false);
  }

  // Deletes the session when the user logs out
  deleteSession(req, res) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({message: 'Could not log out.'})
      }
      res.clearCookie('connect.sid');
      res.json({success: true, message: 'Logged out successfully.'})
      console.log("User Logged out")
    });
  }

}

module.exports = new SessionController();
