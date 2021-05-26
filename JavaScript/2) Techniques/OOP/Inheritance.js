//=========================FUNCTION=========================//

function Monkey() {
  this.department = 'primats';
}

Monkey.prototype.isMonkey = function () {
  return this.department === 'primats' && true;
};

function Human() {
  this.family = 'humanoid';
  Monkey.call(this);
}

Human.prototype.isHuman = function() {
  return this.family === 'humanoid' && true;
}

Object.setPrototypeOf(Human.prototype, Monkey.prototype);

const testInstance = new Human();

// console.log(testInstance.isHuman());
// console.log(testInstance.isMonkey());
//
// console.log(testInstance.__proto__ === Human.prototype)
// console.log(testInstance.__proto__.__proto__ === Monkey.prototype)

//=========================CLASS========================//

const MonkeyClass = class {
  constructor() {
    this.department = 'primats';
  }
  isMonkey() {
    return this.department === 'primats' && true;
  };
}

const HumanClass = class extends MonkeyClass {
  constructor() {
    super()
    this.family = 'humanoid';
  }
  isHuman() {
    return this.family === 'humanoid' && true;
  }
}

const testInstance2 = new HumanClass();

// console.log(testInstance2.isHuman());
// console.log(testInstance2.isMonkey());
//
// console.log(testInstance2.__proto__ === HumanClass.prototype)
// console.log(testInstance2.__proto__.__proto__ === MonkeyClass.prototype)