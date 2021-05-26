/*
The Proxy - pattern provides a surrogate or placeholder object for another object and controls access to this other object.
  Objects (first-class-object) methods:
    handler.getPrototypeOf() - Ловушка для Object.getPrototypeOf.
    handler.setPrototypeOf() - Ловушка для Object.setPrototypeOf.
    handler.isExtensible() - Ловушка для Object.isExtensible.
    handler.preventExtensions() - Ловушка для Object.preventExtensions.
    handler.getOwnPropertyDescriptor() - Ловушка для Object.getOwnPropertyDescriptor.
    handler.defineProperty() - Ловушка для Object.defineProperty.
    handler.has() - Ловушка для оператора in.
    handler.get() - Ловушка для получения значений из свойств.
    handler.set() - Ловушка для установки значений в свойства.
    handler.deleteProperty() - Ловушка для оператора delete.
    handler.ownKeys() - Ловушка для Object.getOwnPropertyNames и Object.getOwnPropertySymbols.
    handler.apply() - Ловушка для вызова функции.
    handler.construct() - Ловушка для оператора new.
 */

//=======================1)Proxy methods: get, set=======================//

const data = { name: 'Marcus Aurelius', city: 'Rome', born: 121 };

const person = new Proxy(data, {
  get(obj, key) {
    console.log('get', key);
    return obj[key];
  },
  set(obj, key, val) {
    console.log('set', key, val);
    obj[key] = val;
    return true;
  }
});

// console.log('person.born:', person.born);
// console.log('person.year:', person.year);
//
// person.name = 'Marcus';

//=======================2)Proxy method: has=======================//
{
  const data = {name: 'Marcus Aurelius', city: 'Rome', born: 121};

  const person = new Proxy(data, {
    has(obj, key) {
      console.log('check', key);
      return (key in obj || key === 'age');
    },
    get(obj, key) {
      console.log('get', key);
      if (key === 'age') {
        return (
          new Date().getFullYear() -
          new Date(obj.born.toString()).getFullYear()
        );
      }
      return obj[key];
    }
  });

  // if ('age' in person) {
  //   console.log(person.age);
  // }
}
//=======================3)Proxy method: delete=======================//
{
  const data = { name: 'Marcus Aurelius', city: 'Rome', born: 121 };

  const person = new Proxy(data, {
    deleteProperty(obj, key) {
      console.log('delete', key);
      return true;
    }
  });

  // console.log(person);
  // delete person.name;
  // console.log(person);
}
//=======================4)Proxy method: keys=======================//
{
  const data = { name: 'Marcus Aurelius', city: 'Rome', _born: 121 };

  const person = new Proxy(data, {
    ownKeys(obj) {
      return Object.keys(obj).filter(name => !name.startsWith('_'));
    }
  });

  //console.dir(Object.keys(person));
}
//=======================5)Proxy method first-calls objects: intercept function call=======================//

//Method apply responds for function call it's not an apply from (call, apply, bind);
{
  const max = (a, b) => (a > b ? a : b);

  const amax = new Proxy(max, {
    apply(target, context, args) {
      console.log('apply', target.name, args, context);
      return args.reduce(target);
    }
  });

  // console.log(max(7, 3, 12, 5, 0, 4, 8, 5));
  // console.log(amax(7, 3, 12, 5, 0, 4, 8, 5));
}