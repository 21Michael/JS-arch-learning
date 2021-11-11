# Decorator (Wrapper) pattern
In object-oriented programming, the decorator pattern is a design pattern that allows behavior to 
be added to an individual object, dynamically, without affecting the behavior of other objects from
the same class.

![link](https://www.dofactory.com/img/diagrams/javascript/javascript-decorator.jpg)

## Components:
  - **Client:**
    - maintains a reference to the decorated Component;
  - **Component:**
    - object to which additional functionality is added;
  - **Decorator:**
    - 'wraps around' Component by maintaining a reference to it;
    - defines an interface that conforms to Component's interface;
    - implements the additional functionality (addedMembers in diagram);

## Example:
```js
  class IceCream { 
      constructor(flavor) {
          this.flavor = flavor
      }
  
      describe() {
          console.log("Normal ice cream,", this.flavor, " flavored")
      }
  };
  
  function decorateWith(object, decoration) {
      object.decoration = decoration
      let oldDescr = object.describe //saving the reference to the method so we can use it later
      object.describe = function() {
          oldDescr.apply(object)
          console.log("With extra", this.decoration)
      }
      return object
  };
  
  let oIce = new IceCream("vanilla"); //A normal vanilla flavored ice cream...
  oIce.describe(); 
  
  let vanillaWithNuts = decorateWith(oIce, "nuts"); //... and now we add some nuts on top of it
  vanillaWithNuts.describe();
```

## When To Use:
  - When you need to be able to assign extra behaviors to objects at runtime without breaking the 
    code that uses these objects.
  - When it is not possible to extend a class using inheritance.

## Advantages:
  - The code is **easier to use, understand and test** since the decorator uses the Single 
    Responsibility, because you can split the behaviour into several smaller classes (decorators).
  - The **behaviour of an object is extended without the need to create a new subclass,** due 
    to aggregation being used.
  - The responsibilities can be **added or removed from an object at runtime.**
  - The responsibilities can be **combined by wrapping an object into multiple decorators.**