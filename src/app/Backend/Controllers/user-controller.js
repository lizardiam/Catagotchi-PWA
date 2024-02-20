const model = require("../models/user-model.js");
const gamemodel = require("../models/game-model.js");
const fetch = require('node-fetch');

class UserController {
  constructor() {
    //console.log(model.isCredValid('toni', 'mypassword'))
    //model.addUser('name', 'surname', 'mariam', 'mypassword', 234);
  }

  registerUser(req, res) {

    let userid = Date.now();

    model.addUser(req.body.username, req.body.password, userid, req.body.email);

    gamemodel.addNewPlant(req.body.firstname, 'Rose', 'Description', userid)
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '9b78c5a869mshbfbaf9591768111p1e4807jsnf40419b0e1f6'
      },
      body: '{"personalizations":[{"to":[{"email":"' + req.body.email + '"}],"subject":"Ya moin du lieber Tamagotchilover!"}],"from":{"email":"plantmaster@vienna.com"},"content":[{"type":"text/plain","value":"Hey nice! Moin! Servus! Du wuest mi also pflanzen ? Na los gehts Bruder"}]}'
    };

    fetch('https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

    res.redirect('../index.html')

  }

  deleteUser(req, res) {
    if (req.session.userid) {
      model.removeUser(req.session.userid);
      gamemodel.deletePlant(req.session.userid);
      req.session.destroy();
    } else {
      res.status(404).send(`NONONOmyfriend.`);
    }
  }

  getUserData(req, res) {
    if (req.session.userid) {
      res.send(model.getUserById(req.session.userid));
    } else {
      res.status(404).send(`NONONOmyfriend.`);
    }
  }

  updateUserInfo(req, res) {
    if (req.session.userid) {
      model.updateUserInfo(req.body, req.session.userid);
      //res.send(model.getUserById(req.session.userid));
    } else {
      res.status(404).send(`NONONOmyfriend.`);
    }
  }
}

module.exports = new UserController();
