/*
  Связный список (linked list) - это структура данных, в которой несколько значений хранятся линейно.
Каждое значение содержит своё собственное значение узла, а также содержит данные вместе со ссылкой на следующий
узел в списке. Ссылка - это указатель на другой объект узла или на null, если следующего узла нет. Если у каждого
узла есть только один указатель на другой узел (чаще всего называется next), то этот список считается односвязный
(singly linked list); тогда как если у каждого узла есть две ссылки (обычно previous и next), то он считается
двусвязный (doubly linked list).
  Основное преимущество связных списков состоит в том, что они могут содержать произвольное количество значений,
используя необходимый объем памяти. Связные списки стали популярными, когда разработчики не знали, сколько
элементов в конечном итоге будет содержать массив. Было гораздо проще использовать связный список и добавлять
значения по мере необходимости, чем точно угадывать максимальное количество значений, которое может содержать массив
(под массив выднлается память). Такие связные списки часто используются в качестве основы для встроенных структур
данных в различных языках программирования.
 */

//==========================1)Single-related on prototype==========================//

function Node(prev, data) {
  this.prev = prev;
  this.data = data;
}

// Usage

const n1 = new Node(null, { name: 'first' });
const n2 = new Node(n1, { name: 'second' });
const n3 = new Node(n2, { name: 'third' });

/* Single-related:
{
  value: 3,
  prev: {
    value: 2,
    prev: {
      value: 1,
      prev: null
    },
  },
}
 */

// console.dir(n1);
// console.dir(n2);
// console.dir(n3);

//==========================2)Single-related on closures==========================//

const node = data => {
  const element = data => {
    console.log('Prev el in closure:', element);
    const next = node(data);

    console.log('Next el in closure:', next)
    next.prev = element;
    return next;
  };
  element.data = data;
  return element;
};

// Usage

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };

//const list = node(obj1)(obj2)(obj3);

//console.dir(list, { depth: 3 });

//==========================3)Single-related iterable=========================//
{
  const list = () => {
    let element;
    return {
      push(data) {
        element = { prev: element, data, };
        return element;
      },

      last: () => element,

      [Symbol.iterator]: () => ({
        current: element,
        next() {
          const element = this.current;
          if (!element) return {
            done: true,
            value: null
          };
          this.current = element.prev;
          return {
            done: false,
            value: element.data
          };
        }
      })
    };
  };

  // Usage

  const obj1 = { name: 'first' };
  const obj2 = { name: 'second' };
  const obj3 = { name: 'third' };
  //
  // const l1 = list();
  // l1.push(obj1);
  // l1.push(obj2);
  // l1.push(obj3);
  //
  // console.dir(l1.last());
  //
  // console.dir([...l1]);
  //
  // for (const element of l1) {
  //   console.log(element);
  // }
}
//==========================4)Single-related on classes=========================//
{
  class List {
    constructor() {
      this.last = null;
    }

    push(data) {
      const prev = this.last;
      const element = { prev, data };
      this.last = element;
      return element;
    }
  }

// Usage

  // const obj1 = { name: 'first' };
  // const obj2 = { name: 'second' };
  // const obj3 = { name: 'third' };
  //
  // const list = new List();
  // list.push(obj1);
  // list.push(obj2);
  // list.push(obj3);
  //
  // console.dir(list.last, { depth: 3 });
}
//==========================5)Double-related on prototype (Stack)=========================//
{
  function Node(list, data) {
    this.list = list;
    this.data = data;
    this.prev = null;
    this.next = null;
  }

  function LinkedList() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  LinkedList.prototype.push = function(data) {
    const node = new Node(this, data)
    //console.log('New Node:', node);

    node.prev = this.last;
    //console.log('Add last to current.prev: last === current.prev:', this.last && this.last === node.prev);

    if (this.length === 0) this.first = node;
    else this.last.next = node;
    //console.log('Add next to last: last.next === current:', this.last && this.last.next === node);

    this.last = node;
    //console.log('Add new last: last === current:', this.last && this.last === node);

    this.length++;
    return node;
  };

  LinkedList.prototype.pop = function() {
    if (this.length === 0) return null;
    const node = this.last;
    this.last = node.prev;
    if (this.last) this.last.next = null;
    node.list = null;
    node.prev = null;
    node.next = null;
    this.length--;
    return node.data;
  };

// Usage

  const list = new LinkedList();
  list.push({ name: 'first' });
/* 1)Pushed 1 el;
  {
    first: {
      next: null,
      value: { name: 'first' },
      prev: null,
    },
    last: {
      next: null,
      value: { name: 'first' },
      prev: null,
    },
  }
 */
  list.push({ name: 'second' });
  list.push({ name: 'third' });
/* 2)Pushed 3 el:
  {
    first: {
      next: {
        next:{
          next: null,
          value: { name: 'third' },
          prev: firs.next,
        },
        value: { name: 'second' },
        prev: first,
      },
      value: { name: 'first' },
      prev: null,
    },
    last: {
      next: null,
      value: { name: 'third' },
      prev: first.next,
    },
  }
 */

  //console.dir(list);

  console.dir(list.pop());
/* 3)Popped 1 el:
  {
    first: {
      next: {
        next: null
        value: { name: 'second' },
        prev: first,
      },
      value: { name: 'first' },
      prev: null,
    },
    last: {
      next: null,
      value: { name: 'second' },
      prev: first.next,
    },
  }
*/

  // console.dir(list.pop());
  // console.dir(list.pop());
  // console.dir(list.pop());
  //
  // list.push({ name: 'uno' });
  // list.push({ name: 'due' });
  // console.dir(list.pop());
  // list.push({ name: 'tre' });
  // console.dir(list.pop());
  // console.dir(list.pop());
}