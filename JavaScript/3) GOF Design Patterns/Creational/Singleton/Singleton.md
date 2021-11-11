# Singleton pattern

The Singleton Pattern limits the number of instances of a particular object to just one. This single 
instance is called the singleton.   
In software engineering, the **singleton pattern** is a software design pattern that restricts the
instantiation of a class to one “single” instance. This is useful when exactly one object is needed 
to coordinate actions across the system.

![link](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSas6BvKF2E6uVXCoP5q8_kz19qrS_BfLaM3g&usqp=CAU)

## Components:
  - **Singleton:** 
    - defines getInstance() which returns the unique instance;
    - responsible for creating and managing the instance object;
  
## Example:
```js
  var Singleton = (function () {
      var instance;
  
      function createInstance() {
          var object = new Object("I am the instance");
          return object;
      }
  
      return {
          getInstance: function () {
              if (!instance) {
                  instance = createInstance();
              }
              return instance;
          }
      };
  })();

  var instance1 = Singleton.getInstance();
  var instance2 = Singleton.getInstance();
  
  console.log(instance1 === instance2); // true
```

## When To Use:
  - There **must be a single instance of a class,** and this class must be accessible by clients from an
    access point known to them.
  - The **singleton class can be extended by inheritance,** and clients must be able to use extended 
    classes without making any changes to it.
    
## Advantages:
  - **Have a strict control over how and when clients access to singleton instance.** So, you have a 
    controlled access because the singleton class encapsulates its instance.
  - When you need to **restrict the number of instances that we create from a class in order to save
    the system resources.**
  - The singleton pattern is an improvement over global variables because it **avoids polluting the 
    name space with global variables** which only store the singleton instances.
  - **The code is more easier to use, understand and test since the singleton simplify the code.**