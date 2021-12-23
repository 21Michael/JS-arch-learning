# JS-arch-learning
Learning basic design principles, tech, patterns, templates, data structure...

**1) Paradigms:**
  - Imperative;
  - Non structured;
  - Structured:
    - Procedural:
      - OOP (class/prototype);
  - Declarative:
    - Functional;
    - Logical;
  - Data-driven;
  - Generic;
  - ...

**2) Techniques:**
  - Asynch programming;
  - Parallel programming;
  - Distributed programming;
  - OOP programming:
    - Objects and classes;
    - Class-based vs prototype-based creation;
    - Dynamic dispatch/message passing;
    - Encapsulation;
    - Composition;
    - Inheritance (Prototype); ✅
    - Delegation;
    - Polymorphism;
    - Open recursion;
  - Function programming:
    - First-class functions;
    - HOC functions; ✅
    - Recursion; ✅
    - Closures; ✅
    - Currying; ✅
    - Lazy evaluations;
    - Referential transparency;
    - Immutability;
    - Pure functions;
    - Partial application; ✅
  - Visual programming (ER/RUP/CAD/CAM);
  - Reactive programming:
    - RxJS;
  - Event oriented programming;
  - Functional-reactive programming;
  - Meta-programming;
  - Multyparadigm-programming;
  - ...

**3) GOF Design patterns:**
- Creational:
  - Abstract Factory;
  - Builder;
  - Factory; ✅
  - Prototype; ✅
  - Singleton; ✅
  - Pool; ✅
- Behaviour:
  - Chain of responsibility; ✅
  - Command;
  - Interpreter;
  - Iterator;
  - Mediator;
  - Memento;
  - Observer;
  - State;
  - Strategy; ✅
  - Template method;
  - Visitor;
- Structural:
  - Adapter;
  - Bridge;
  - Composite;
  - Decorator (Wrapper); ✅
  - Facade; ✅
  - Flyweight;
  - Proxy; ✅
  - Dependency injection;

**4) Programming language concepts (OOP):**
  - [module](); ✅
  - [mixin](); ✅

**5) Design Principles:**
  - [**Functional programming principles:**](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/5)%20Design%20Principles/Functional%20programming%20principles/Functional%20programming%20principles.md) ✅
    - `Pure Functions;` ✅
    - `No side effects;` ✅
    - `Immutability;` ✅
    - `Referential transparency;` ✅
    - `Functions as first-class entities;` ✅
    - `Higher order functions;` ✅
    - `Disciplined state;` ✅
  - **OOP programming principles:**
    - **GRASP:** ✅
      1. `Информационный эксперт (Information Expert);` ✅
      2. `Создатель (Creator);`  ✅
      3. `Контроллер (Controller);`  ✅
      4. `Слабое зацепление (Low Coupling);`  ✅
      5. `Высокая связность (High Cohesion);`  ✅
     	6. `Полиморфизм (Polymorphism);` ✅
      7. `Чистое изготовление (Pure Fabrication);` ✅
      8. `Перенаправление (Indirection);` ✅
      9. `Устойчивость к изменениям (Protected Variations);` ✅
    - **SOLID:** ✅
      1. `Принцип единственной ответственности (single responsibility principle);` ✅
      2. `Принцип открытости/закрытости (open–closed principle);` ✅
      3. `Принцип подстановки Лисков (Liskov substitution principle);` ✅
      4. `Принцип разделения интерфейса (interface segregation principle);` ✅
      5. `Принцип инверсии зависимостей (dependency inversion principle);` ✅
    - **DRY** (Don’t Repeat Yourself);
    - **YAGNI** (You aren't gonna need it);
    - **KISS** (KEEP IT SIMPLE, STUPID);
  - ...
  
**6) Optimization techniques:**
  - Algorithmic optimizations (https://habr.com/ru/post/350018/):
    - [Memoization](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/6)%20Optimization%20techniques/Algorithmic%20optimizations/Memoization/memoization.js); ✅
  - Language-specific optimizations:
    - [JIT](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/6)%20Optimization%20techniques/Language-specific%20optimizations/JIT/JIT.md);  ✅
    - [Garbage-collector](https://github.com/21Michael/Backend-arch-learning/blob/main/4)%20NodeJS/Engine%20mechanisms/NodeJS/Garbage%20collector.md);  ✅
  - Engine-specific optimizations:
    - V8;
    - ...
  - WebAssembly (WASM);
    
**7) Data structure:**
  - Collections:
    - [Object](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/7)%20Data%20structure/collections/object.js); ✅
    - [Dequeue (Array)](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/7)%20Data%20structure/collections/array.js);  ✅
    - [Map](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/7)%20Data%20structure/collections/Map.js);  ✅
    - [WeakMap](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/7)%20Data%20structure/collections/WeakMap.js);  ✅
    - [Set](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/7)%20Data%20structure/collections/Set.js);  ✅
    - [WeakSet](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/7)%20Data%20structure/collections/WeakSet.js);  ✅
  - [Linked List](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/7)%20Data%20structure/linkedList.js); ✅ 
  - [Stack](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/7)%20Data%20structure/stack.js);  ✅
  - [Queue](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/7)%20Data%20structure/queue.js); ✅
  - Binary Tree;
  - Binary Search Tree;
  - Heap;
  - Hashing;
  - Graph;
  - Matrix;
  - Misc;
  - ...

**8) Frameworks:**
  - Techniques:
    - Components:
      - communication:
        - [one-way-data-binding](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/8)%20Frameworks/Techniques/components/communication/oneWayDataBinding.js); ✅
        - [two-way-data-binding](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/8)%20Frameworks/Techniques/components/communication/twoWayDataBinding.js); ✅
      - [event handling](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/8)%20Frameworks/Techniques/components/eventHandling.js); ✅
      - conditional rendering:
        - [imperative (React)](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/8)%20Frameworks/Techniques/components/conditionalRendering/imperative%20(React).js); ✅
        - [declarative (Vue)](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/8)%20Frameworks/Techniques/components/conditionalRendering/declarative%20(Vue).js); ✅
    - Reactivity:
      - [Local (React/Vue)](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/8)%20Frameworks/Reactivity/Local/LocalState.js); ✅
  
**9) State management patterns:**  
  1. [MVC / MVP / MVVM](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/1.%20MVC_MVP_MVVM.md);  ✅
  2. [Flux](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Flux.md):  ✅
      - [Redux](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Redux/Redux.md): ✅
          - Hooks:
            - [useSelector (mapStateToProps)](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Redux/Hooks/useSelector.md); ✅
            - [useDispatch (mapDispatchToProps)](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Redux/Hooks/useDispatch.md6); ✅
            - [useStore](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Redux/Hooks/useStore.md); ✅
          - [React-Redux](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Redux/React-Redux.md); ✅
          - [Redux-thunk](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Redux/Redux-thunk.md); ✅
          - [Redux-promise](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Redux/Redux-promise.md); ✅
          - [Redux-saga](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Redux/Redux-saga.md); ✅   
          - [Redux-toolkit](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Redux/Redux-toolkit.md); ✅
      - [Dva](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/2.%20Flux/Dva.md); ✅
      - Reflux;
      - Fluxxor;
      - Alt;
  3. [Vuex](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/3.%20Vuex.md); ✅
  4. [MobX](https://github.com/21Michael/JS-arch-learning/blob/main/JavaScript/9)%20State%20Managment%20Patterns/4.%20MobX.md); ✅

**10) Refs:**
  - https://github.com/krasimir/react-in-patterns
  - https://learn-vuejs.github.io/vue-patterns/patterns/#component-communication
  - https://www.youtube.com/playlist?list=PLvTBThJr861yMBhpKafII3HZLAYujuNWw

**11) Books:**
  - React Design Patterns and Best Practices (Carlos Santana Roldán);
  - Vue.js 2 Design Patterns and Best Practices (Paul Halliday);
