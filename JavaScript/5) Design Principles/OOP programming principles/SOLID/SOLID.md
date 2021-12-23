# SOLID 

## 1. Принцип единственной ответственности (single responsibility principle):

```text
Каждый класс должен быть ответственен лишь за одну задачу.
```

Приписывание единоличной ответственности ведет к неправильному пониманию этого 
принципа. Фактически, это часто ошибочно означает, что класс должен делать только 
одно. Однако определение принципа гласит, что единственная причина, по которой класс 
или объект должны быть изменены, состоит в том, что они изменили свою ответственность.
Итак, неверно, что объект может делать только одну вещь, скорее он может делать больше
вещей, относящихся к тем же обязанностям. Другими словами, действия, назначенные 
объекту, должны соответствовать назначенной уникальной ответственности. Если есть две
разные причины, по которым объект или класс должны быть изменены, то мы должны
разделить эти две обязанности на как можно больше объектов или классов.

### Realization:
**Bad:**
```js
class Order {
  constructor(customerId) {
     this.customerId = customerId;
     this.dateTime = new Date();
     this.items = [];
  }
}

class OrderManager {
   constructor(customerId) {
      this.order = new Order(customerId);
   }

  addItem (item) {
    this.order.items.push(item);
  };
   
  sendOrder() {
    if (this.isValid(this.order)) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          handleResponse(response);
        }
      };
      xhr.open("POST", "/api/orders");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(order));
    }
    else {
      handleError({ message: "Not valid order!" });
    }
  };
  
  isValid(order) {
    return order.items.length > 0;
  };
};

var orderMngr = new OrderManager(1234);
orderMngr.addItem({ itemId: 111, description: "Item 111" });
orderMngr.sendOrder();
```
Analyzing the OrderManager constructor, we note that its **main responsibility is to 
manage the order,** as the name itself suggests. So its actions should be related to
the order life cycle. **If something changes in the way an order is managed, we expect
to change the constructor's code in order to adapt it to the new management mode.**  
__  
However, the sendOrder() method includes a responsibility that is not closely related to
order management—we are talking about the actual sending of the order. In the example,
the sendOrder() method takes care of sending the order to the server via an Ajax call to a
specific URL. For уxample, the server API specifications have changed or we no longer
want to use XMLHttpRequest to send the request to the server but a third-party library. 
We identified a second reason to change the OrderManager constructor function.   
__  
**So, the constructor is breaking the Single Responsibility Principle because, in 
addition to the responsibility for managing the order, it also has the responsibility
to take care of the technical details of sending the order to the server. !!!**  


**Good:**
```js
class Order {
   constructor(customerId) {
      this.customerId = customerId;
      this.dateTime = new Date();
      this.items = [];
   }
}

class OrderSender {
  constructor() {}
   
  send(order) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        handleResponse(response);
      }
    };
    xhr.open("POST", "/api/orders");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(order));
  }
};

class OrderManager {
  constructor(customerId) {
    this.order = new Order(customerId);
  };
  
  addItem(item) {
    this.order.items.push(item);
  };
  
  sendOrder() {
    if (this.isValid(this.order)) {
      var orderSender = new OrderSender();
      orderSender.send(order);
    }
    else {
      handleError({ message: "Not valid order!" });
    }
  };
  
  isValid(order) {
    return order.items.length > 0;
  };
};
```
The highlighted code shows the difference over the previous code: OrderManager assigns
to OrderSender the task of actually sending the order to the server. **In this way, the only
reason to modify the OrderManager constructor will be because something has changed in
the order management.**

## 2. Принцип открытости/закрытости (open–closed principle):
```text
Программные сущности (классы, модули, функции) должны быть открыты для расширения (add new),
но не для модификации (remove / update).
```
In the design of the components of our application, we have to take into account these two
aspects:
  - **Open for extension (add new):** The components should be adjustable to the changing needs
of the application;
  - **Closed for modifications (remove / update):** The required changes should not involve the original
component itself;

### Realization (Polymorphism):
1) **Liskov substitution principle:**  
   **Bad (for each new instance modify the AnimalSound function):**  
   ![link](https://miro.medium.com/max/1050/1*KZmuEmaWIm33cVA2CM-MmA.png)  
   ![link](https://miro.medium.com/max/1050/1*1_wo5O8p-IEzihuLmmcjTQ.png)  
   **Good (extend class by additional method + polymorphism):**  
   ![link](https://miro.medium.com/max/1050/1*8Jes0v0icrczStJFfPXXIQ.png)
   
2) **Polymorphism instead modification:**   
   **Bad (each time modify the class):**  
   ![link](https://miro.medium.com/max/1050/1*q9YdDcUbw6sVbjrXN5f-0w.png)  
   **Good (don't modifying the class, instead we extending it through the polymorphism):**  
   ![link](https://miro.medium.com/max/1050/1*X85RDmAaJpQ3qeIKl7-gHg.png)
   ![link](https://miro.medium.com/max/1050/1*q948ZrrpjEbycsZUnuRKDw.png)
   
## 3. Принцип подстановки Лисков (Liskov substitution principle):
```text
Необходимо, чтобы подклассы могли бы служить заменой для своих суперклассов придерживаясь
одного унифицированного интерфейса.
```
When we use inheritance, we extend a base component to create specialized components.
The principle of Liskov invites us to be careful not to disrupt the functionality of
the parent component when we define a derived component. Classes, objects, functions,
and other software entities that have to do with the components of an inheritance 
hierarchy must be able to interact in a uniform manner. In other words, a derived 
component must be semantically equivalent to its base component. Otherwise, the new
components can produce undesired effects when they interact with existing components.

**Examples of usage:**
   - Object like arrays that support iterations interface;
   - async func supports setTimeout, thenable interface;

### Realization (Polymorphism + Unified interface):
**Bad (for each new instance modify the useRect function):**
```js
class Rect {
   constructor(width, height) {
      this.width = width;
      this.height = height;
   }

   get area() {
      return this.width * this.height;
   }
}

class Square extends Rect {
   constructor(side) {
      super();
      this.side = side;
   }

   get areaSquare() {
      this.width = this.side;
      this.height = this.side;
      return this.area;
   }
}

// Usage

const useRect = rect => {
   if (rect instanceof Square) { // violation !!!!!!!!!!!!!!!!!!!!!!
      console.log({ rect }); 
      console.log({ area: rect.areaSquare });
   }
   else if(rect instanceof Rect) { // violation !!!!!!!!!!!!!!!!!!!!!!
      console.log({ rect });
      console.log({ area: rect.area });
   }
};

useRect(new Rect(100, 50));
useRect(new Square(100));
```
**Good (Polymorphism + Unified interface):**  
```js
class Rect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

class Square extends Rect {
  constructor(side) {
    super();
    this.side = side;
  }

  get width() {
    return this.side;
  }

  set width(value) {
    this.side = value;
  }

  get height() {
    return this.side;
  }

  set height(value) {
    this.side = value;
  }
}

// Usage

const useRect = rect => {
  rect.width = 10;
  console.log({ rect });
  console.log({ area: rect.area });
};

useRect(new Rect(100, 50)); 
useRect(new Square(100));
```

## 4. Принцип разделения интерфейса (interface segregation principle):
```text
 Клиенты не должны зависеть от интерфейсов, которые они не используют.
```

In the definition of our object interfaces, therefore, we should be careful to only define what
actually is necessary. This avoids the exposure of members that could create ambiguity and
confusion.

### Realization (Polymorphism + Unified interface):  
**Bad:**
```js
class Discounter {
  constructor(min, max, discountPercentage, gadget) {
     this.min = min;
     this.max = max;
     this.discountPercentage = discountPercentage;
     this.gadget = gadget;
  }
  
   isApplicable(order) {
      var itemsCount = order.items.length;
      return (itemsCount >= this.min && itemsCount < this.max)
   };
  
   apply(order) {
      order.totalAmount = order.totalAmount - order.totalAmount * discountPercentage / 100;
   };
   
   addGadget(order) {
      order.items.push(this.gadget);
   }
}
```

Using this definition all object instances will have the gadgets property and the 
addGadget() method, even if most of these objects will not use them.

**Good:**
   - **Separate to the own Class:**
      ```js
     class GadgetDiscounter {
        constructor(min, max, gadget) {
          this.min = min;
          this.max = max;
          this.gadget = gadget;
        }
     
         isApplicable(order) {
            var itemsCount = order.items.length;
            return (itemsCount >= this.min && itemsCount < this.max)
         };
        
         addGadget(order) {
            order.items.push(this.gadget);
         }
      }
      ```
   - **Mixin approach:**
      ```js
      class Discounter {
        constructor(min, max, discountPercentage, gadget) {
           this.min = min;
           this.max = max;
           this.discountPercentage = discountPercentage;
        }
        
         isApplicable(order) {
            var itemsCount = order.items.length;
            return (itemsCount >= this.min && itemsCount < this.max)
         };
        
         apply(order) {
            order.totalAmount = order.totalAmount - order.totalAmount * discountPercentage / 100;
         };
      }
   
      var gadgetMixin = {
         gadget: {},
         addGadget: function(order) {
            order.items.push(this.gadget);
         }
      };
      var discounter = new Discounter(10, 20, 0);
      var gadgetDiscounter = { ...discounter, gadgetMixin }; // mixin !!!!!!!!!!!!!!!!
      gadgetDiscounter.gadget = { name: "A nice gadget!" };
      ```
     
## 5. Принцип инверсии зависимостей (dependency inversion principle):
```text
1. Модули верхних уровней не должны зависеть от модулей нижних уровней. Оба типа 
модулей должны зависеть от абстракций.
2. Абстракции не должны зависеть от деталей. Детали должны зависеть от абстракций.
```

### 1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
This is the Dependency Inversion Principle, and it consists of two recommendations. The
first one concerns the classic layered architecture of an application, where in general the
components of the high level are strictly dependent on the components at the low level. A
possible modification to a low-level component may require a change to one or more high-
level components. The first recommendation suggests to reverse this dependency, changing
it toward an intermediate abstraction, such as an interface. So, a low-level component must
implement an interface used by the components of the higher level.

### 2. Abstractions should not depend upon details. Details should depend on abstractions.
The second recommendation says to make sure that the implementation details do not
affect an abstraction. An abstraction, such as an interface, must describe a behavior and
implementation details must follow the behavior defined by abstraction. The
implementation can change without affecting the referred abstraction. In other words, if, for
example, we defined an abstraction to access a persistence system, the implementation must
comply with the abstraction, but its internal implementation can change at will.

### Notions:
1) **Principle:** 
   - **<ins>Dependency inversion:</ins>** high-level modules should not depend on low-level modules.
2) **Approach for realization dependency inversion principle (mechanism):** 
   - **<ins>Inversion of control:</ins>** is the actual mechanism using which we can use to make 
     the higher level components depend on abstractions rather than concrete implementation of 
     lower level components.
3) **Technique:**
   - **<ins>Dependency injection:</ins>** is a technique to implement inversion of control. It 
     injects the concrete implementation of a low-level component into a high-level component.
     So, dependency injection concretely applies the Dependency Inversion Principle in the
     software development by moving the binding of abstraction and concrete implementation out
     of the dependent component.
4) **Approach for realization dependency injection technique:**
   - **<ins>Constructor injection:</ins>** The constructor injection is suitable when the same 
     dependency is valid for all the object's lifetime. In other words, if the orderManager 
     object will use httporderSender during its life, the constructor injection approach is 
     appropriate.
      ```js
      const orderSender = new OrderSender();
      const orderManager = new OrderManager(orderSender); // !!!!!!!!!!!!!!!!!!!!
      ```
   - **<ins>Method injection:</ins>** If we need to pass different dependencies on every method 
     call, then we use method. injection.
      ```js
      const orderSender = new OrderSender();
      const httpOrderSender = new HttpOrderSender();
     
      const orderManager = new OrderManager();
     
      orderManager.send(orderSender); // !!!!!!!!!!!!!!!!!!!!
      orderManager.send(httpOrderSender); // !!!!!!!!!!!!!!!!!!!!
     ```
   - **<ins>Property injection:</ins>** The property injection approach allows us to specify the 
     dependency by assigning it to a property of the object. This gives the flexibility of 
     changing dependency during the lifetime of the object and at the same time avoids having to
     specify the dependency for each method's call.
      ```js
      const orderSender = new OrderSender();
      const httpOrderSender = new HttpOrderSender();
     
      const orderManager = new OrderManager();
     
      orderManager.sender = orderSender; // !!!!!!!!!!!!!!!!!!!!
      orderManager.sendOrder(); 
     
      orderManager.sender = httpOrderSender; // !!!!!!!!!!!!!!!!!!!!
      orderManager.sendOrder(); 
     ```

### Realization:
**Bad:**
```js
class Order {
   constructor(customerId) {
      this.customerId = customerId;
      this.dateTime = new Date();
      this.items = [];
   }
}

class OrderSender {
  constructor() {}
   
  send(order) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        handleResponse(response);
      }
    };
    xhr.open("POST", "/api/orders");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(order));
  }
};

class OrderManager {
  constructor(customerId) {
    this.order = new Order(customerId);
  };
  
  addItem(item) {
    this.order.items.push(item);
  };
  
  sendOrder() {
    if (this.isValid(this.order)) {
      var orderSender = new OrderSender(); // hidden state !!!!!!!!!!!!!!!!!!!!!!!!!
      orderSender.send(order);
    }
    else {
      handleError({ message: "Not valid order!" });
    }
  };
  
  isValid(order) {
    return order.items.length > 0;
  };
};
```

**Good:**
   - **Dependency injection:**
```js
class Order {
   constructor(customerId) {
      this.customerId = customerId;
      this.dateTime = new Date();
      this.items = [];
   }
}

class OrderSender {
  constructor() {}
   
  send(order) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        handleResponse(response);
      }
    };
    xhr.open("POST", "/api/orders");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(order));
  }
};

class OrderManager {
  constructor(customerId, sender) {
    this.order = new Order(customerId);
    this.orderSender = sender; // dependency injection !!!!!!!!!!!!!!!!!!!!!!!!!!!
  };
  
  addItem(item) {
    this.order.items.push(item);
  };
  
  sendOrder() {
    if (this.isValid(this.order)) {
       this.orderSender.send(order);
    }
    else {
      handleError({ message: "Not valid order!" });
    }
  };
  
  isValid(order) {
    return order.items.length > 0;
  };
};
```