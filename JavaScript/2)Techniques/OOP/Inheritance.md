# Inheritance:
To make a long story short, when a child class inherits from a 
parent class, the child acquires all behaviors from the parent.
Inheritance will make a class hierarchy — you can imagine it as
a tree of classes.

![link](https://drive.google.com/uc?id=1vls6JT6D0kcrCJlYUex6bdwxaWBvCG9t)

## <ins>Inheritance in JS:</ins>
### 1) FUNCTION:
```js
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
  
  console.log(testInstance.isHuman());
  console.log(testInstance.isMonkey());

  console.log(testInstance.__proto__ === Human.prototype)
  console.log(testInstance.__proto__.__proto__ === Monkey.prototype)
```

### 2) CLASS:
```js
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
  
  console.log(testInstance2.isHuman());
  console.log(testInstance2.isMonkey());

  console.log(testInstance2.__proto__ === HumanClass.prototype)
  console.log(testInstance2.__proto__.__proto__ === MonkeyClass.prototype)
```
## <ins>Anti pattern:</ins> Multiple Inheritance:
An object or class can inherit features from more than one parent object or parent 
class. It is distinct from single inheritance, where an object or class may only 
inherit from one particular object or class.

Multiple inheritance has been a controversial issue for many years, with opponents 
pointing to its increased complexity and ambiguity in situations such as the 
"diamond problem", where it may be ambiguous as to which parent class a particular 
feature is inherited from if more than one parent class implements said feature.

![link](https://drive.google.com/uc?id=1asfT5sCfZxaP1LKNqZuqGLNDVdIRofoA)

```js
const LithiumBattery = (state) => {
  const price$ = 1000; // !!!!!!!!!!!!!!!!!
  const volumeW = 500;

  return { price$, volumeW };
}

const AluminiumEngine = (state) => {
  const price$ = 10000; // !!!!!!!!!!!!!!!!!
  const horsePower = 697;

  return { price$, horsePower };
}

const testlaS = (state) => {
  return Object.assign(state, AluminiumEngine(state), LithiumBattery(state)) // price of the Engine will be overwritten !!!!!!!!!!!!!!!
}
```

## <ins>Inheritance vs Composition:</ins>

![link](https://drive.google.com/uc?id=17OO0yVMWC6LDhBj7R6nTsiglUfmjKony)

The main difference between inheritance and composition is in
the relationship between objects.
- **Inheritance:** “is a.” E.g. The car is a vehicle.
- **Composition:** “has a.” E.g. The car has a steering wheel.

They’re different in purpose too.
- **Inheritance:** To design a class on what it is.
- **Composition:** To design a class on what it does.

### COMPOSITION PROS:
- Composition is a far looser coupling. Combining with Dependency Injection (here), it brings more flexibility and also allows us to change runtime behavior.
### INHERITANCE CONS:
- The tightest form of coupling in object-oriented programming.
- Changing a base class can cause unwanted side effects on its subclasses or even all over the codebase.

