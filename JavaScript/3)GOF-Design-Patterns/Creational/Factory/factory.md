# Factory pattern

**The factory method** pattern is a creational pattern that uses factory methods to deal with the problem
of creating objects without having to specify the exact class of the object that will be created. 
This is done by creating objects by calling a factory method — either specified in an interface and
implemented by child classes, or implemented in a base class and optionally overridden by derived 
classes — rather than by calling a constructor. 

![link](https://www.dofactory.com/img/diagrams/javascript/javascript-factory-method.jpg)

## Components:
  - **Creator:**
    - the 'factory' object that creates new products;
    - implements 'factoryMethod' which returns newly created products;
  - **AbstractProduct (not implemented by vanilla JS):**
    - declares an interface for products;
  - **ConcreteProduct:**
    - the product being created;
    - all products support the same interface (properties and methods);
  
## Example:
```js
  var Factory = function () {
      this.createEmployee = function (type) {
          var employee;
  
          if (type === "fulltime") {
              employee = new FullTime();
          } else if (type === "parttime") {
              employee = new PartTime();
          } else if (type === "temporary") {
              employee = new Temporary();
          } else if (type === "contractor") {
              employee = new Contractor();
          }
  
          employee.type = type;
  
          employee.say = function () {
              console.log(this.type + ": rate " + this.hourly + "/hour");
          }
  
          return employee;
      }
  }
  
  var FullTime = function () {
      this.hourly = "$12";
  };
  
  var PartTime = function () {
      this.hourly = "$11";
  };
  
  var Temporary = function () {
      this.hourly = "$10";
  };
  
  var Contractor = function () {
      this.hourly = "$15";
  };

var factory = new Factory();

const fullTimeJob = factory.createEmployee("fulltime");
const partTimeJob = factory.createEmployee("parttime");
const temporaryJob = factory.createEmployee("temporary");
const contractorJob = factory.createEmployee("contractor");
```

## When To Use:
  - The problem solved by the pattern Factory-Method is easy to identify: **The object with which the
    client must work is not known a priori,** but this knowledge depends directly on the interaction 
    of another user with the system (end-user or system). The traditional example where the need for
    this pattern arises is when the user selects an object type from a list of options.
  - In the event that **it is necessary to extend the internal components** (the number of objects that 
    are created) without the need to have the code attached, but instead there is an interface that 
    must be implemented and it should only be extended by creating a class relative to the new object
    to be included and its specific creator.
    
## Advantages:
  - **The code is more maintainable** because it is less coupled between the client classes and their
    dependencies.
  - **Clean code since the Open-Closed Principle** is guaranteed due to new concrete classes of 
    Product can be introduced without having to break the existing code.
  - **Cleaner code since the Single Responsibility Principle (SRP)** is respected because the 
    responsibility of creating the concrete Product is transferred to the concrete creator class
    instead of the client class having this responsibility.