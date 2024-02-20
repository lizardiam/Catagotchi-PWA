let userdata = require('./users.json');
const fs = require("fs");
const crypto = require("crypto");

class UserModel {
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



class UserData{
  array;

  constructor() {
    try {
      this.userArray = JSON.parse(JSON.stringify(userdata));
    } catch (err) {
      console.log('Error: ', err.message);
    }

    console.log(this.userArray.length)
  }

  hashSHA256(input){
    //console.log(crypto.createHash('sha256').update(input).digest('base64'))
    return crypto.createHash('sha256').update(input).digest('base64');
  }

  addUser(username, password, userid, email) {
    this.user = new UserModel(username, this.hashSHA256(password), userid, email)
    this.userArray.push(this.user);
    console.log(this.userArray);

    const fs = require('fs');

    fs.writeFile('./api/models/users.json', JSON.stringify(this.userArray), err => {
      if (err) {
        console.error(err);
      }else{
        console.error("success user in db");
      }
    });
  }

  removeUser(userid) {
    let i = this.userArray.length;

    while(i--){
      if(this.userArray[i]._userid === userid){
        this.userArray.splice(i, 1);
      }
    }

    const fs = require('fs');

    fs.writeFile('./api/models/users.json', JSON.stringify(this.userArray), err => {
      if (err) {
        console.error(err);
      }else{
        console.error("success user db");
      }
    });
  }

  getUserById(userid){
    for(var i=0; i<this.userArray.length; i++){
      //console.log(userid);
      if(this.userArray[i]._userid==userid){
        return this.userArray[i]
      }
    }
    return false;
  }

  getUserid(username, password){
    for(var i=0; i<this.userArray.length; i++){
      //console.log(this.userArray.length)
      //console.log(username)
      if(this.userArray[i]._username==username){
        if(this.userArray[i]._password==this.hashSHA256(password)){
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
        if(this.userArray[i]._password==pthis.hashSHA256(password)){
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
        if(this.userArray[i]._password==this.hashSHA256(password)){
          return true;
        }
      }
    }
    return false;
  }

  usernameExists(username){
    for(var i=0; i<this.userArray.length; i++){
      if(this.userArray[i]._username==username){
        return true;
      }
    }
    return false;
  }

  getUsernameForEmail(email){
    for(var i=0; i<this.userArray.length; i++){
      if(this.userArray[i]._email==email){
        return this.userArray[i]._username;
      }
    }
    return false;
  }

  emailExists(email){
    for(var i=0; i<this.userArray.length; i++){
      if(this.userArray[i]._email==email){
        return true;
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

    const fs = require('fs');

    fs.writeFile('./api/models/users.json', JSON.stringify(this.userArray), err => {
      if (err) {
        console.error(err);
      }else{
        console.error("success user db");
      }
    });
  }

  getAllUsers(){
    return this.userArray;
  }

  getUserWithUsernameAndId(){
    let listToExport = [];

    for(var i=0; i<this.userArray.length; i++){
      let usertoExport = {
        _userid: "",
        _username: "",
      }

      usertoExport._username = this.userArray[i]._username;
      usertoExport._userid = this.userArray[i]._userid;
      listToExport.push(usertoExport)
    }

    return listToExport;
  }

}

const model = new UserData();

module.exports = model;
