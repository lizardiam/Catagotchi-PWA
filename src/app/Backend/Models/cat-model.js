let userdata = require('./cats.json')

class Cat {
  constructor(name, userid, foodlevel, waterlevel, happiness) {
    this._name = name;
    this._userid = userid;
    this._foodlevel = foodlevel;
    this._waterlevel = waterlevel;
    this._happiness = happiness;
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

}

class CatModel {
  constructor() {
    this.catArray = new Array();
    try {
      this.catArray = JSON.parse(JSON.stringify(userdata));
    } catch (err) {
      console.log('Error:', err.message);
    }
  }

  addCat (name, userid) {
    this.newCat = new Cat(name, userid, 100, 100, 100);
    this.catArray.push(this.newCat);
    this.updateDB();
  }

  deleteCat (userid) {
    let i = this.catArray.length;
    while (i--) {
      if (this.catArray[i]._userid === userid){
        this.catArray.splice(i, 1);
      }
    }
  }

  updateDB () {
    const fs = require('fs');
    fs.writeFile('./src/app/Backend/Models/cats.json', JSON.stringify(this.catArray), err => {
      if (err) {
        console.error(err);
      }
      else {
        console.error("DB success");
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
          this.catArray[i]._waterlevel = Math.min((this.catArray[i]._waterlevel + 100), 100)
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
      this.catArray[i]._foodlevel = Math.max((this.catArray[i]._foodlevel - 5), 0)
    }
  }

  decreaseWaterLevel () {
    for (let i = 0; i < this.catArray.length; i++) {
      this.catArray[i]._waterlevel = Math.max((this.catArray[i]._waterlevel - 5), 0)
    }
  }

  decreaseHappiness () {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._foodlevel > 0 && this.catArray[i]._waterlevel > 0) {
        this.catArray[i].happiness = Math.max((this.catArray[i].happiness - 2), 0)
      }
      else if (this.catArray[i]._foodlevel > 0 || this.catArray[i]._waterlevel > 0) {
        this.catArray[i].happiness = Math.max((this.catArray[i].happiness - 7), 0)
      }
      else {
        this.catArray[i].happiness = Math.max((this.catArray[i].happiness - 15), 0)
      }
    }
  }

  getCat (userid) {
    for (let i = 0; i < this.catArray.length; i++) {
      if (this.catArray[i]._userid == userid) {
        return this.catArray[i];
      }
    }
  }

}

const model = new CatModel();

module.exports = model;
