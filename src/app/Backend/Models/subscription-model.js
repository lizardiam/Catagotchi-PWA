let subdata = require('./subscriptions.json');
const fs = require('fs');
const path = require('path');
const model = require("./cat-model");
const userdata = require("./users.json");

class Subscription {

  constructor(userid, subscription) {
    this._userid = userid;
    this._subscription = subscription;
  }

  get userid() {
    return this._userid;
  }

  set userid(value) {
    this._userid = value;
  }

  get subscription() {
    return this._subscription;
  }

  set subscription(value) {
    this._subscription = value;
  }

}

class SubscriptionModel {
  constructor() {
    try {
      this.subArray = JSON.parse(JSON.stringify(subdata));
    } catch (err) {
      console.log('Error: ', err.message);
    }
    console.log("Subscription Array Length: ", this.subArray.length)
  }


  addSubscription(userid, subscription) {
    // Remove existing subscription if it exists
    this.subArray = this.subArray.filter(sub => sub._userid !== userid);
    // Add new subscription
    this.subArray.push(new Subscription(userid, subscription));
    fs.writeFile(path.join(__dirname,'subscriptions.json'), JSON.stringify(this.subArray), err => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Successfully added subscription to DB.")
      }
    });
  }

  getSubscriptionByUserId(userid) {
    for(var i=0; i<this.subArray.length; i++){
      if(this.subArray[i]._userid == userid){
        return this.subArray[i]
      }
    }
    return false;
  }

  updateDB() {
    fs.writeFile(path.join(__dirname, 'subscriptions.json'), JSON.stringify(this.subArray, null, 2), err => {
      if (err) {
        console.error("Error updating subscriptions file:", err);
      }
      else {
        console.log("Subscriptions file successfully updated.");
      }
    });
  }

  getSubscriptions () {
    return this.subArray.map(sub => sub._subscription);
  }

}

const subscriptionModel = new SubscriptionModel();
module.exports = subscriptionModel;
