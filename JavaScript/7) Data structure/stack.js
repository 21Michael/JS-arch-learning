/*
  Стек — это связанный список, элементы которой получают по принципу «последний вошел, первый вышел» (Last-In-First-Out или LIFO).
Это значит, что мы будем иметь доступ только к последнему добавленному элементу. В отличие от массивов мы не можем
получить доступ к произвольному элементу стека. Мы можем только добавлять или удалять элементы с помощью специальных методов.
 */

//==========================1)Realization on classes==========================//

class Stack {
  constructor() {
    this.last = null;
  }

  push(item) {
    const prev = this.last;
    const element = { prev, item };
    this.last = element;
  }

  pop() {
    const element = this.last;
    if (!element) return null;
    this.last = element.prev;
    return element.item;
  }
}

// Usage

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };
const obj4 = { name: 'fours' };

const list = new Stack();

list.push(obj1);
/* 1)Pushed 1 el;
{
  last: {
    value: { name: 'first' },
    prev: null
  }
}
 */

list.push(obj2);
list.push(obj3);
list.push(obj4);

/* 2)Pushed 4 el;
{
  last: {
    value: { name: 'fours' },
    prev: {
      value: { name: 'third' },
      prev: {
        value: { name: 'second' },
        prev: {
          value: { name: 'first' },
          prev: null
        },
      },
    }
  },
}
 */

console.dir(list.pop());

/* 3)Popped 1 el;
{
  last: {
    value: { name: 'third' },
    prev: {
      value: { name: 'second' },
      prev: {
        value: { name: 'first' },
        prev: null
      },
    },
  }
}
 */
console.dir(list.pop());
console.dir(list.pop());
console.dir(list.pop());
console.dir(list.pop());