// Prototype allows to create many copies of one instance following DRY principle.

// #1 New-based constructor inheritance
// Square.prototype = new Rect();
// Square.prototype.constructor = Square;

// #2 Object.create
// Square.prototype = Object.create(Rect.prototype);
// Square.prototype.constructor = Square;

// #3 Manual __proto__ assignment
// Square.prototype.__proto__ = Rect.prototype;

// #4 With Object.setPrototypeOf ❤ ️❤ ️❤️
// Object.setPrototypeOf(Square.prototype, Rect.prototype);

// #5 Node.js way
// const util = require('util');
// util.inherits(Square, Rect);

//==================================1)Object==================================//

const method = {
  inheritedMethod() {
    console.log('The method was inherited!!!', 'x:', this.x, 'y:', this.y);
  }
};

const testObject = {
  x: 10,
  y: 20,
};

Object.setPrototypeOf(testObject, method);

//testObject.inheritedMethod();

// console.log(testObject.__proto__ === method);
// console.log(testObject.__proto__.__proto__ === Object.prototype);
// console.log(testObject.__proto__.__proto__.__proto__ === null);
// console.log(method.__proto__ === Object.prototype);

//==================================2)Function==================================//

const testFunction = function(){
  this.x = 10;
  this.y = 20;
}

testFunction.prototype.inheritedMethod = function () {
  console.log('The method was inherited!!!', 'x:', this.x, 'y:', this.y);
};
testFunction.prototype.constructor = testFunction;

const testInstance = new testFunction();

//testInstance.inheritedMethod();

// console.log(testInstance.__proto__ === testFunction.prototype);
// console.log(testInstance.__proto__.constructor === testFunction);

//==================================3)Class==================================//

const testClass = class  {
  constructor() {
    this.x = 10;
    this.y = 20;
  }
  inheritedMethod() {
    console.log('The method was inherited!!!', 'x:', this.x, 'y:', this.y);
  };
}

const testInstance2 = new testClass();

//testInstance2.inheritedMethod()

// console.log(testInstance2.__proto__ === testClass.prototype);
// console.log(testInstance2.__proto__.constructor === testClass);