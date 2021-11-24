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
  - module;
  - mixin; ✅

**5) Design Principles:**
  - **Functional programming principles:** ✅
    - Pure Functions; ✅
    - No side effects; ✅
    - Immutability; ✅
    - Referential transparency; ✅
    - Functions as first-class entities; ✅
    - Higher order functions; ✅
    - Disciplined state; ✅
  - **OOP programming principles:**
    - Dependency Injection;
    - GRASP;
    - SOLID;
    - DRY;
    - YAGNI;
    - KISS;
  - ...
  
**6) Optimization techniques:**
  - Algorithmic optimizations (https://habr.com/ru/post/350018/):
    - Memoization; ✅
  - Language-specific optimizations:
    - JIT (https://habr.com/ru/company/oleg-bunin/blog/417459/);  ✅
    - Garbage-collector;
  - Engine-specific optimizations:
    - V8;
    - ...
  - WebAssembly (WASM);
    
**7) Data structure:**
  - Collections:
    - Object; ✅
    - Dequeue (Array);  ✅
    - Map;  ✅
    - WeakMap;  ✅
    - Set;  ✅
    - WeakSet;  ✅
  - Linked List; ✅ 
  - Stack;  ✅
  - Queue; ✅
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
      - declaration;
      - communication:
        - one-way-data-binding; ✅
        - two-way-data-binding; ✅
        - Context API (React);
        - Provide-inject (Vue);
        - Custom hooks;
      - event handling; ✅
      - conditional rendering:
        - imperative (React); ✅
        - declarative (Vue); ✅
      - composition;
      - HOC;
      - mixins;
    - Reactivity:
      - Local (React/Vue); ✅
      - State managers:
        - Rendering through changing props (Flux, Redux...);
        - Observers (MobX, VueX);
  
**9) State management patterns:**  
  1. MVC / MVP / MVVM;  ✅
  2. Flux:  ✅
      - Redux: ✅
          - Hooks:
            - useSelector (mapStateToProps); ✅
            - useDispatch (mapDispatchToProps); ✅
            - useStore; ✅
          - React-Redux; ✅
          - Redux-thunk; ✅
          - Redux-promise; ✅
          - Redux-saga; ✅   
          - Redux-toolkit; ✅
      - Dva; ✅
      - Reflux;
      - Fluxxor;
      - Alt;
  3. Vuex; ✅
  4. MobX; ✅

**10) Refs:**
  - https://github.com/krasimir/react-in-patterns
  - https://learn-vuejs.github.io/vue-patterns/patterns/#component-communication
  - https://www.youtube.com/playlist?list=PLvTBThJr861yMBhpKafII3HZLAYujuNWw

**11) Books:**
  - React Design Patterns and Best Practices (Carlos Santana Roldán);
  - Vue.js 2 Design Patterns and Best Practices (Paul Halliday);
