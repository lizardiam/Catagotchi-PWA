import userdata from './cats.json' assert { type: 'json' };
import fs from 'fs';

class User {
  constructor(username, password, userid, email) {
    this._username = username;
    this._password = password;
    this._userid = userid;
    this._email = email;
  }

  get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }

  get userid() {
    return this._userid;
  }

  set userid(value) {
    this._userid = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }
}

class UserModel {
  constructor() {
    try {
      this.userArray = JSON.parse(JSON.stringify(userdata));
    } catch (err) {
      console.log('Error: ', err.message);
    }
    console.log("User Array Length: ", this.userArray.length)
  }

  addUser(username, password, userid, email) {
    this.user = new User(username, password, userid, email);
    this.userArray.push(this.user);
    console.log("User Array: ", this.userArray);

    fs.writeFile('./src/app/Backend/Models/users.json', JSON.stringify(this.userArray), err => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Successfully added user to DB.")
      }
    });
  }

  deleteUser (userid) {
    let i = this.userArray.length;

    while(i--) {
      if (this.userArray[i]._userid === userid) {
        this.userArray.splice(i, 1);
      }
    }

    s.writeFile('./src/app/Backend/Models/users.json', JSON.stringify(this.userArray), err => {
      if (err) {
        console.error(err);
      }else{
        console.error("Successfully deleted user from DB.");
      }
    });
  }

  getUserById(userid){
    for(var i=0; i<this.userArray.length; i++){
      if(this.userArray[i]._userid == userid){
        return this.userArray[i]
      }
    }
    return false;
  }

  getUserid(username, password){
    for(var i=0; i<this.userArray.length; i++){
      if(this.userArray[i]._username==username){
        if(this.userArray[i]._password==password){
          return this.userArray[i]._userid;
        }
      }
    }
  }

  getEmailAddress(username, password){
    for(var i=0; i<this.userArray.length; i++){
      console.log(this.userArray.length)
      console.log(username)
      if(this.userArray[i]._username==username){
        if(this.userArray[i]._password==password){
          return this.userArray[i]._email;
        }
      }
    }
  }

  isCredValid(username, password){
    for(var i=0; i<this.userArray.length; i++){
      console.log(this.userArray.length)
      console.log(username)
      if(this.userArray[i]._username==username){
        if(this.userArray[i]._password==password){
          return true;
        }
      }
    }
    return false;
  }

  updateUserInfo(request, userid){
    let object = JSON.parse(JSON.stringify(request))
    if(object.oldpassword==this.getUserById(userid)._password){
      if(object.password!=''){
        this.getUserById(userid)._password = object.password;
      }
      this.getUserById(userid)._username = object.username;
      this.getUserById(userid)._email = object.email;
    }

    fs.writeFile('./api/models/users.json', JSON.stringify(this.userArray), err => {
      if (err) {
        console.error(err);
      }else{
        console.error("Successfully updated user in DB.");
      }
    });
  }

}

const model = new UserModel();

export default model;
