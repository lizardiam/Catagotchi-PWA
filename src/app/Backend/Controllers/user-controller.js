import model from '../Models/user-model'
import catModel from "../Models/cat-model";
import fetch from "node-fetch";

class UserController {
  constructor() {
  }

  register (req, res) {
    let userid = Date.now();
    model.addUser(req.body.username, req.body.password, req.body.email);

    catModel.addCat(req.body.name, userid);

    // Mail sending
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '9b78c5a869mshbfbaf9591768111p1e4807jsnf40419b0e1f6'
      },
      body: '{"personalizations":[{"to":[{"email":"' + req.body.email + '"}],"subject":"Welcome to your Cozy Cat Corner!"}],"from":{"email":"catagotchi@vienna.com"},"content":[{"type":"text/plain","value":"Hello from your new cat!"}]}'
    };
    fetch('https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

  }
}

//TODO
