/*
  Дек (от англ. deque — double ended queue) — структура данных, представляющая из себя список элементов, в которой
добавление новых элементов и удаление существующих производится с обоих концов. Эта структура поддерживает как FIFO,
так и LIFO, поэтому на ней можно реализовать как стек, так и очередь. В первом случае нужно использовать только методы
головы или хвоста, во втором — методы push и pop двух разных концов. Дек можно воспринимать как двустороннюю очередь.
 */

//==========================1)Realization on classes:==========================//
class Dequeue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  push(item) {
    const last = this.last;
    const element = { prev: last, next: null, item };
    if (last) {
      last.next = element;
      this.last = element;
    } else {
      this.first = element;
      this.last = element;
    }
  }

  pop() {
    const element = this.last;
    if (!element) return null;
    if (this.first === element) {
      this.first = null;
      this.last = null;
    } else {
      this.last = element.prev;
      this.last.next = null;
    }
    return element.item;
  }

  unshift(item) {
    const first = this.first;
    const element = { prev: null, next: first, item };
    if (first) {
      first.prev = element;
      this.first = element;
    } else {
      this.first = element;
      this.last = element;
    }
  }

  shift() {
    const element = this.first;
    if (!element) return null;
    if (this.last === element) {
      this.first = null;
      this.last = null;
    } else {
      this.first = element.next;
      this.first.prev = null;
    }
    return element.item;
  }
}

// Usage

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };

const list = new Dequeue();
list.push(obj1);
list.push(obj2);
list.unshift(obj3);

console.dir(list.pop());
console.dir(list.shift());
console.dir(list.shift());

//==========================2)JS array:==========================//

const letters = [];
letters.push('B');
console.dir({ letters });
letters.unshift('A');
console.dir({ letters });
letters.push('C');
console.dir({ letters });

const numbers = [1, 2, 3];
numbers.push(4);
console.dir({ numbers });

const languages = ['C++', 'JavaScript', 'Python', 'Haskell', 'Swift'];

console.dir({
  length: languages.length,
  'languages[0]': languages[0],
  'languages[languages.length - 1]': languages[languages.length - 1]
});