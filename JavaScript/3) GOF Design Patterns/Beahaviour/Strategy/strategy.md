# Strategy pattern
**The strategy** pattern is a behavioral design pattern that enables selecting an algorithm at runtime.  
The Strategy pattern encapsulates alternative algorithms (or strategies) for a particular task. It 
allows a method to be swapped out at runtime by any other method (strategy) without the client 
realizing it. Essentially, Strategy is a group of algorithms that are interchangeable.

![link](https://www.dofactory.com/img/diagrams/javascript/javascript-strategy.jpg)

## Components:
  - **Context:**
    - maintains a reference to the current Strategy object
    - supports interface to allow clients to request Strategy calculations
    - allows clients to change Strategy
  - **Strategy:**
    - implements the algorithm using the Strategy interface
  
## Example:
Shipping is the **Context** and the 3 shipping companies UPS, USPS, and Fedex are the Strategies. 
The shipping companies **(strategies)** are changed 3 times and each time we calculate the cost of 
shipping. In a real-world scenario the calculate methods may call into the shipper's Web service.
At the end we display the different costs.
```js
  var Shipping = function () {
      this.company = "";
  };
  
  Shipping.prototype = {
      setStrategy: function (company) {
          this.company = company;
      },
  
      calculate: function (package) {
          return this.company.calculate(package);
      }
  };
  
  var UPS = function () {
      this.calculate = function (package) {
          // calculations...
          return "$45.95";
      }
  };
  
  var USPS = function () {
      this.calculate = function (package) {
          // calculations...
          return "$39.40";
      }
  };
  
  var Fedex = function () {
      this.calculate = function (package) {
          // calculations...
          return "$43.20";
      }
  };
  
  function run() {
  
      var package = { from: "76712", to: "10012", weigth: "lkg" };
  
      // the 3 strategies
  
      var ups = new UPS();
      var usps = new USPS();
      var fedex = new Fedex();
  
      var shipping = new Shipping();
  
      shipping.setStrategy(ups);
      console.log("UPS Strategy: " + shipping.calculate(package));
      shipping.setStrategy(usps);
      console.log("USPS Strategy: " + shipping.calculate(package));
      shipping.setStrategy(fedex);
      console.log("Fedex Strategy: " + shipping.calculate(package));
  }
```

## When To Use:
  - The problem which resolve Strategy Pattern is when you need use **several algorithms which have
    different variations.** In that moment, you need create a concrete class to implement your 
    algorithm (which can consists in a or some functions).
  - Another interesting moment in which you detect that need this pattern is when there are
    **conditional statements around a several algorithm** which are related between them.
  - Finally you must to use this pattern when most of your **classes have related behaviours**.

## Advantages:
  - It’s **easy switching between different algorithms** (strategies) in runtime because you’re using 
    polymorphism using the interfaces.
  - **Clean code** because you avoid conditional-infested code (not complex).
  - **More clean code** because you separate the concerns into classes (a class to each strategy).