/*
Facade  - pattern hides the complexities of the system and provides an interface to the client using which
the client can access the system.
 */

//=======================1)Facade=======================//

//Different complex logic:
const Bank = function() {
  this.verify = function(name, amount) {
    // complex logic ...
    return true;
  }
}

const Credit = function() {
  this.get = function(name) {
    // complex logic ...
    return true;
  }
}

const Background = function() {
  this.check = function(name) {
    // complex logic ...
    return true;
  }
}

//Facade constructor:
const Mortgage = function(name) {
  this.name = name;
}

Mortgage.prototype = {
  applyFor: function(amount) {
    // access multiple subsystems...
    let result = "approved";
    (!new Bank().verify(this.name, amount)) && (result = "denied");
    (!new Credit().get(this.name)) && (result = "denied");
    (!new Background().check(this.name)) && (result = "denied");

    return this.name + " has been " + result +
      " for a " + amount + " mortgage";
  }
}

const mortgage = new Mortgage("Joan Templeton");
const res = mortgage.applyFor("$100,000");

console.log(res)