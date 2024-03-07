let catdata = require('./cats.json');
const fs = require('fs');
const path = require('path');

class Cat {
  constructor(name, userid, foodlevel, waterlevel, happiness, level) {
    this._name = name;
    this._userid = userid;
    this._foodlevel = foodlevel;
    this._waterlevel = waterlevel;
    this._happiness = happiness;
    this._level = level;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get userid() {
    return this._userid;
  }

  set userid(value) {
    this._userid = value;
  }

  get foodlevel() {
    return this._foodlevel;
  }

  set foodlevel(value) {
    this._foodlevel = value;
  }

  get waterlevel() {
    return this._waterlevel;
  }

  set waterlevel(value) {
    this._waterlevel = value;
  }

  get happiness() {
    return this._happiness;
  }

  set happiness(value) {
    this._happiness = value;
  }

  get level() {
    return this._level;
  }

  set level(value) {
    this._level = value;
  }
}

class CatModel {
  constructor() {
    this.catArray = new Array();
    try {
      this.catArray = JSON.parse(JSON.stringify(catdata));
    } catch (err) {
      console.log('Error:', err.message);
    }
  }

  addCat (name, userid) {
    this.newCat = new Cat(name, userid, 100, 100, 100, 1);
    this.catArray.push(this.newCat);
    this.updateDB();
  }

  deleteCat (userid) {
    console.log(`Attempting to delete cat for userid: ${userid}`);
    let i = this.catArray.length;
    while (i--) {
      if (this.catArray[i]._userid === userid){
        console.log(`Checking cat with userid: ${this.catArray[i]._userid}`);
        this.catArray.splice(i, 1);
      }
    }
    fs.writeFile(path.join(__dirname,'cats.json'), JSON.stringify(this.catArray), err => {
      if (err) {
        console.error(err);
      }else{
        console.error("Successfully deleted cat from DB.");
      }
    });
  }

  updateDB () {
    fs.writeFile(path.join(__dirname, 'cats.json'), JSON.stringify(this.catArray), err => {
      if (err) {
        console.error(err);
      }
      else {
        console.error("DB successfully updated (cat)");
      }
    });
  }

  getFoodLevel () {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._userid == userid) {
        return this.catArray[i]._foodlevel;
      }
    }
  }

  getWaterLevel () {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._userid == userid) {
        return this.catArray[i]._waterlevel;
      }
    }
  }

  getHappiness () {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._userid == userid) {
        return this.catArray[i]._happiness;
      }
    }
  }

  // increases foodlevel
  feedCat (userid) {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._userid == userid) {
        if (this.catArray[i]._foodlevel < 100) {
          this.catArray[i]._happiness = Math.min((this.catArray[i]._happiness + 20), 100);
          this.catArray[i]._foodlevel = Math.min((this.catArray[i]._foodlevel + 75), 100);
        }
      }
    }
  }

  //increases waterlevel
  waterCat (userid) {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._userid == userid) {
        if (this.catArray[i]._waterlevel < 100) {
          this.catArray[i]._happiness = Math.min((this.catArray[i]._happiness + 10), 100);
          this.catArray[i]._waterlevel = Math.min((this.catArray[i]._waterlevel + 100), 100);
        }
      }
    }
  }

  // increases happiness
  petCat (userid) {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._userid == userid) {
        this.catArray[i]._happiness = Math.min((this.catArray[i]._happiness + 15), 100);
      }
    }
  }

  decreaseFoodLevel () {
    for (let i = 0; i < this.catArray.length; i++) {
      this.catArray[i]._foodlevel = Math.max((this.catArray[i]._foodlevel - 5), 0);
    }
  }

  decreaseWaterLevel () {
    for (let i = 0; i < this.catArray.length; i++) {
      this.catArray[i]._waterlevel = Math.max((this.catArray[i]._waterlevel - 5), 0);
    }
  }

  decreaseHappiness () {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._foodlevel > 0 && this.catArray[i]._waterlevel > 0) {
        this.catArray[i]._happiness = Math.max((this.catArray[i]._happiness - 2), 0);
      }
      else if (this.catArray[i]._foodlevel > 0 || this.catArray[i]._waterlevel > 0) {
        this.catArray[i]._happiness = Math.max((this.catArray[i]._happiness - 7), 0);
      }
      else {
        this.catArray[i]._happiness = Math.max((this.catArray[i]._happiness - 15), 0);
      }
    }
  }

  getCat (userid) {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._userid == userid) {
        // console.log(`model data returned: ${JSON.stringify(this.catArray[i], null, 2)}`);
        return this.catArray[i];
      }
    }
    return false;
  }

  getAllCats () {
    return this.catArray;
  }

  levelUpCat () {
    let leveledUp = false; // Flag to check if any cat leveled up
    this.catArray.forEach(cat => {
      // Check if the cat's happiness is above 0 and level is less than 4
      if (cat._happiness > 0 && cat._level < 100) {
        cat._level = Math.min(cat._level + 1, 100); // Increment the cat's level, capped at 4
        console.log(`${cat._name} leveled up to level ${cat._level}`);
        leveledUp = true; // Mark that at least one cat has leveled up
      }
    });

    // Update the database if any cat has leveled up
    if (leveledUp) {
      this.updateDB();
      console.log("Database updated with new cat levels.");
    }
  }

  // for push notifications, not usable yet
  checkLevels () {
    this.catArray.forEach(cat => {
      if (cat._happiness === 0 || cat._foodlevel === 0 || cat._waterlevel === 0) {
        console.log(`Notification for ${cat._name} was sent.`);
        return true;
      }
      else {
        return false;
      }
    });
  }

}

const model = new CatModel();

module.exports = model;
