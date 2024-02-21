const path = require('path');

let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();

const usermodel = require("../models/user-model.js");

class SessionController {

  static notifyUserPerMailWhenLoggedIn() {
    /*const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '9b78c5a869mshbfbaf9591768111p1e4807jsnf40419b0e1f6'
        },
        body: '{"personalizations":[{"to":[{"email":"a.lanners@outlook.com"}],"subject":"Hello, World!"}],"from":{"email":"from_address@example.com"},"content":[{"type":"text/plain","value":"Hello, World!"}]}'
    };

    fetch('https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));*/
  }

  createSession(req, res) {
    let session;
    if (usermodel.isCredValid(req.body.username, req.body.password)) {
      session = req.session;
      session.userid = usermodel.getUserid(req.body.username, req.body.password)
      session.freievariable = req.body.username;
      console.log(req.session)
      SessionController.notifyUserPerMailWhenLoggedIn();
      //res.sendFile('files/index.html', { root: path.join(__dirname, '../../') });
      res.redirect('../index.html')
    } else {
      res.send('Invalid username or password');
    }
  }


  isSessionValid(req, res) {
    if (req.session.userid) {
      //res.send("Welcome User <a href=\'/api/logout'>click to logout</a>");
      res.send(true);
    } else
      res.status(404).send(false);
  }

  deleteSession(req, res) {
    req.session.destroy();
    res.redirect('../index.html')
    console.log("User Logged out")
  }

}

module.exports = new SessionController();
