/*
  Очередь — это линейная структура последовательных и упорядоченных элементов, похожая на стек, с той разницей,
что она работает по принципу «первым пришел — первым вышел» (FIFO — first in first out).
 */

//==========================1)Realization on classes==========================//

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  put(item) {
    const last = this.last;
    const element = { next: null, item };
    if (last) {
      last.next = element;
      this.last = element;
    } else {
      this.first = element;
      this.last = element;
    }
  }

  pick() {
    const element = this.first;
    if (!element) return null;
    if (this.last === element) {
      this.first = null;
      this.last = null;
    } else {
      this.first = element.next;
    }
    return element.item;
  }
}

// Usage

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };

const queue = new Queue();
queue.put(obj1);
/* 1)Put 1 el;
{
  first: {
    value: { name: 'first' },
    next: null
  },
  last: {
    value: { name: 'first' },
    next: null
  },
}
 */
queue.put(obj2);
queue.put(obj3);

/* 2)Put 3 el;
{
  first: {
    value: { name: 'first' },
    next:{
      value: { name: 'second' },
      next: {
        value: { name: 'third' },
        next: null
      },
    },
  },
  last: {
    value: { name: 'third' },
    next: null
  },
}
 */

//console.dir(queue);

//console.dir(queue.pick());
/* 3)Picked 1 el;
{
  first: {
    value: { name: 'second' },
    next: {
      value: { name: 'third' },
      next: null
    },
  },
  last: {
    value: { name: 'third' },
    next: null
  },
}
 */
// console.dir(queue.pick());
// console.dir(queue.pick());
// console.dir(queue.pick());