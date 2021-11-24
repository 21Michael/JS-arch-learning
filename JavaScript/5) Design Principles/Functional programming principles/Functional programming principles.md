# Functional programming principles:

**Functional Programming** is a paradigm. It follows the declarative pattern, which means, it
focuses on what the program wants to achieve without indicating how.

**The primary aim** of this style of programming is to avoid the problems that come with
<ins>shared state</ins>, <ins>mutable data</ins> and <ins>side effects</ins> which are common
place in object oriented programming.

### FP advantages:
  - **Easy to develop ang logical**  
    Code written using this approach is very easy to read and memorize making it easier to
    write too. It’s easy to predict what goes into your function, and what its result will 
    be. You’ll know exactly what your function can and can’t do. You won’t be dealing with 
    states which makes it much easier to comprehend.
  - **Easy to test**  
    With pure functions, the debugging process is very simple. As previously mentioned, 
    pure functions depend only on the user input values, so it’s really easy to trace any 
    mistakes. You’ll only need to follow the values and you’ll know exactly where it all 
    went wrong.
  - **Enables Concurrency**  
    Due to the nature of pure functions to avoid changing variables or any data outside it,
    implementing concurrency becomes efficacious
  - **Lazy evaluation**  
    Functional programs only store values when you require them to do so. This means that 
    you’ll avoid any repeated evaluation which improves efficiency.  
    This also means that working with infinite arrays and values is easy. Let’s say for 
    example that you made a function that represents a list with an infinite number of 
    elements. In functional programming, the list won’t be evaluated or calculated until 
    you require a real value from it (for example an indexed element).  
    It’s a good way of making your program more efficient by avoiding unnecessary 
    evaluations.

### FP disadvantages: 
    
  - **Reduction in performance**  
    Immutable values combined with recursion might lead to a reduction in performance and 
    engagement of memory.  
    <ins>**Example:**</ins>
    ```js
      const map1 = { a: 1, b: 2, c:3 };
      const map2 = map1.map(...);
    ```
    **Heap:**  
    ![link](https://drive.google.com/uc?id=1YkzgT8Bo60_Z8MswRh5-tnMLGdutxvdE)
    
    <ins>**Solution:**</ins> Immutable.js lib.
    **Heap:**  
    ![link](https://drive.google.com/uc?id=1-iHuY6ffLzbZ_YGJehKuY97f_eclpdZZ)
    
## 1) Pure Functions:

**Corresponds to rules:**  
  - **Same input/output:**   
      The pure function returns the same result if given the same arguments.   
  - **No side effects:**   
    It can't mutate and use external data, it can only mutate arguments and private
    variables and use functions and methods from shared state, not global.

**Example:**  
  - **Not pore function:**
  ```js
    const name = 'Alice'
    const sayHi = () => {
        console.log(`Hi ${name}`) // side effect (uses varable from globale scope)
    };

    sayHi();
  ```  
  - **Pure function:**  
  ```js
    const sayHi = (name) => `Hi ${name}`;
    sayHi(‘Alice’);
  ```
    
## 2) No side effects (Idempotent):
Side effects are treated as evil by the functional programming paradigm. Side effects are 
things such as I/O, logging to the console, thrown and halted errors, network calls and the
alteration of an external data structure or variable. Basically anything which makes a
system unpredictable.

In saying this, functional programming doesn't say you can't have side effects since they 
are required at times but it aims to reduce the occurrence of such effects as much as is 
possible.

**Example:**  
  - **notIdempotence:**
    ```js
        function notIdempotence(num) {
          return Math.random(num);
        }
        
        notIdempotence(8); // 4
        notIdempotence(8); // 6
    ```

  - **Idempotence:**
    ```js
        function idempotent(num) {
          console.log(num);
        }
        
        idempotent(8);
    ```

If a function contains side effects, it is called a **procedure.**

## 3) Immutability:
Immutability is a concept that has its roots in Functional Programming. Whenever we want 
to introduce changes to some data, we should get a new object back with the updated data,
instead of modifying the original one. You might think of immutability as “save as” because
it returns a new object while traditional in-place mutation would be like “save” — updating
original and letting go of the earlier state. It gives stricter control over your data, 
immediately making your code safer and more predictable.

**Example:**
  - **Mutation**
  ```js
    const mass = [1, 2, 3];
    mass[0] = -1;
    
    console.log(mass); // [-1, 2, 3];
  ```  
  - **Immutable:**
  ```js
    const mass = [1, 2, 3];
    const newMass = mass.map((e, i) => (i === 0 && -1 || e));
    
    console.log(mass); // [1, 2, 3];
    console.log(newMass); // [-1, 2, 3];
  ```

**Immutability in JS:**
  - **Array methods**
    - slice / filter / concat / map:
    ```js
    let fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
    let citrus = fruits.slice(1, 3);
    
    console.log(citrus); // Outputs: Orange,Lemon
    console.log(fruits); // Outputs: Banana, Orange, Lemon, Apple, Mango
    ```
  - **JS operators:**
    - Spread operator;
    ```js
    let fruits = ["Banana", "Orange"];
    let updatedFruits = […fruits, 'Mango']; // Outputs: Banana, Orange, Mango
    ```
  - **Object methods:**
    - Object.freeze()
    ```js
    const person = Object.freeze({
      name: "John",
      lastName: "Dell"
    });
    
    person.name = "Max"; //Outputs: Cannot assign to read-only property 'name'
    ```
    !!! The nested objects can be changed. Object.freeze() does only a **shallow freeze.**

## 4) Referential transparency (side effects relied on logic outside of function):
Referential transparency is another concept closely related to pure functions and 
side-effects. Referential Transparency means that functions do not rely on anything beyond
their parameters, and consequence of this is that it becomes predictable in its behavior.
It means that given the same parameters will return the same answer. It makes our code very
testable.

**Example:**
  - **Referential transparency:**
```js
let a = (num1,num2) => {
return num1+num2;
}

let b = (num) => {
return num*3;
}

console.log(b(a(6,4))) //output will be 30
// here you can replace a(6,4) expression with value 10 and this will not effect to the result of the program because it returns the same value: 10
// Hence you can replace console.log(b(a(6,4))) to console.log(b(10)) as the function is referentially transparent.
```
  - **No Referential transparency:**
```js
let c = (num1,num2) => {
    console.log(`Value of num1 is:${num1} and value of num2 is:${num2}`);
    return num1+num2;
}

console.log(b(c(6,4))) //output will be 30
// here you cannot replace expression c(3,4) with value 10 as it affects the result of the program
// function c has console.log(), which is one type of side effect. So, the function ‘c’ is not referentially transparent
```

## 5) Functions as first-class entities:
This just means that functions are able to be passed as arguments to other functions, 
returned as values from other functions, stored in data structures and assigned to 
variables.

  - Functions in JS can be assigned to variables:
```js
const sayHi = () => {
  return 'Hi ';
}

console.log(sayHi()); // Outputs: Hi
```

  - Functions in JS can be passed as arguments to a function:
```js
const sayHiToSomeone = (callback, name) => {
  return callback() + ' ' + name;
}

console.log(sayHiToSomeone(sayHi, 'Max')); // Outputs: Hi Max
```

  - Functions in JS can be returned from a function:
```js
const greeterConstructor = greeting => {
  return country => {
    return greeting + ' ' + country;
  }
}

const engGreeter = greeterConstructor('Welcome to ');
console.log(engGreeter('England.')); // Outputs: Welcome to England.

const gerGreeter = greeterConstructor('Welkom Bij ');
console.log(gerGreeter('Duits.')) // Outputs: Welkom Bij Duits.
```

## 6) Higher order functions:
Higher order functions are functions which do at least one of the following:
  - Takes one or more functions as arguments;
  - Returns a function as its result;

**Example:** Array Map, Array Filter, Array Reduce and Array Sort.
```js

const hoFunc = function() {
  return function() {
    return 88;
  }
}
hoFunc() // will return function
hoFunc()() // will return 88
// hoFunc returns a function because it is a Higher-Order Function
 
const fn = function(x) {
  return x*2;
}
 
const hoFunc2 = function(fn) {
  return fn(8);
}
 
hoFunc2(fn); // will return 16
// hoFunc2 accepts the function as an argument. Hence, it is a Higher-Order Fun
```

## 7) Disciplined state:
Disciplined state is the opposite of shared, mutable state.  

**Example:**
  - Shared + mutable state:
```js
function logElements(arr) {
  while (arr.length > 0) {
    console.log(arr.shift());
  }
}

const arr = ['banana', 'orange', 'apple'];

function main() {
  console.log('Before sorting:');
  logElements(arr);

  arr.sort();

  console.log('After sorting:');
  logElements(arr);
}

main();
// Before sorting:
// "banana"
// "orange"
// "apple"
// After sorting:
// undefined
```

  - Disciplined state:
```js
function logElements(arr) {
  while (arr.length > 0) {
    console.log(arr.shift());
  }
}

function main() {
  const arr = ['banana', 'orange', 'apple'];

  console.log('Before sorting:');
  logElements([...arr]);

  const sorted = [...arr].sort();

  console.log('After sorting:');
  logElements([...sorted]);
}

main();
// Before sorting:
// "banana"
// "orange"
// "apple"
// After sorting:
// "apple"
// "banana"
// "orange"
```
