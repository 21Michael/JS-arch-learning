/*
Mixin is object creational patter from Functional. Breaking complex problems into simpler and smaller ones and providing a
solution is what software development is all about. Encapsulating and reusing expressive code lets us write less code
that is more readable and keeps us from polluting the global namespace by defining variables in the global context.
So what if we wanted to write a bunch of methods that we intend to reuse but aren’t necessarily based on any particular object?
The mixin design pattern gives us a form of object composition without having a class from which to inherit.
*/

//==========================1)Basic usage from Functional==========================//

const g1 = {};
const g2 = {};
const g3 = { area: 300 };

// Add property area to g2
g2.area = 200;

// Mixin as a function
const mixinCalculateCost = obj => {
  obj.area = obj.area || 0;
  obj.calculateCost = function (price) {
    return this.area * price;
  };
};

// Mixin to single object
mixinCalculateCost(g1);

// Mixin to array of objects
[g1, g2, g3].forEach(mixinCalculateCost);

// metasync
//   .for([g1, g2, g3])
//   .each(mixinCalculateCost);

// Use mixed methods
// console.log(g1.calculateCost(5));
// console.log(g2.calculateCost(5));
// console.log(g3.calculateCost(5));

// Use with first class object (JS functions):
// const t1 = setTimeout(() => {
//   console.log('Hello from timer');
// }, 1000);
//
// mixinCalculateCost(t1);
//
// t1.area = 12;
// console.log(t1.calculateCost(100));

//==========================2)Extend function==========================//

const extend = (obj, mixin) => {
  const keys = Object.keys(mixin);
  for (const key of keys) {
    obj[key] = mixin[key];
  }
  return obj;
};

// Usage

const obj1 = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  born: '121-04-26',
};

const mix1 = {
  toString() {
    return `${this.name} was born in ${this.city} in ${this.born}`;
  },
  age() {
    const year = new Date().getFullYear();
    const born = new Date(this.born).getFullYear();
    return year - born;
  }
};

// Analogy to Object.assign(obj1, mix1);
// extend(obj1, mix1);
// console.log(obj1);
// console.log(obj1.toString());
// console.log(`His age is ${obj1.age()} as of today`);

//==========================3)Extend function methods with saving existing logic (decoration)==========================//

const scalable = image => {
  image.scale = () => console.log('Image scaled 2');
};

const lazy = image => {
  const scale = image.scale;
  image.scale = () => setTimeout(() => scale(), 5000);
};

const image = {};

// console.log('Mixin scalable() adds method: scale');
// scalable(image);
// console.log('Before scale 1');
// image.scale();
// console.log('After scale 3\n');
//
// console.log('Mixin lazy() adds lazy behavior');
// lazy(image);
// console.log('Before scale 1');
// image.scale();
// console.log('After scale 3');

//==========================4)Extending classes==========================//

const Rect = class {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  toString() {
    return `[${this.x}, ${this.y}, ${this.width}, ${this.height}]`;
  }
};

const equilateral = Category => class extends Category {
  constructor(x, y, side) {
    super(x, y, side, side);
  }
};

// const Square = equilateral(Rect);
//
// const p1 = new Square(10, 20, 50);
// console.log(p1.toString());

//==========================5)Extending obj by event emitters==========================//

// Defining supporting events
const emitable = (obj, events = {}) => Object.assign(obj, {
  on(name, fn) {
    const event = events[name] || [];
    events[name] = event;
    event.push(fn);
  },
  emit(name, ...data) {
    const event = events[name];
    if (event) {
      for (const fn of event) {
        fn(...data);
      }
    }
  }
});

//Defining event move
const movable = obj => {
  obj.on('move', (x, y) => {
    console.log('move', x, y);
    obj.x += x;
    obj.y += y;
    obj.emit('moved');
  });
  return obj;
};

// Usage

const Rect2 = class {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  toString() {
    return `[${this.x}, ${this.y}, ${this.width}, ${this.height}]`;
  }
};

// const r1 = movable(emitable(new Rect2(10, 20, 50, 150)));
// console.log(r1.toString());
// r1.on('moved', () => {
//   console.log(r1.toString());
// });
// r1.emit('move', 10, 20);

//==========================6)Extending or rebuilding new prototype (__proto__)==========================//

const accessors = {
  string(proto, name, index) {
    Object.defineProperty(proto.prototype, name, {
      get() {
        return this[index];
      },
      set(value) {
        this[index] = value;
      }
    });
  },

  Date(proto, name, index) {
    Object.defineProperty(proto.prototype, name, {
      get() {
        return new Date(this[index]);
      },
      set(value) {
        this[index] = value instanceof Date ? value.toISOString() : value;
      }
    });
  },

  function(proto, name, index, fieldDef) {
    Object.defineProperty(proto.prototype, name, { get: fieldDef });
  }

};

// Assign prototype to records array or single record
//   data - array of objects
//   proto - dynamically built prototipe to be assigned

const assignPrototype = (data, proto) => {
  if (Array.isArray(data)) {
    data.forEach(item => item.__proto__ = proto.prototype);
  } else {
    Object.setPrototypeOf(data, proto.prototype);
  }
};

// Build Prototype from Metadata

const buildPrototype = metadata => {
  const protoClass = function ProtoClass() {};
  let index = 0, fieldDef, buildGetter, fieldType;
  for (const name in metadata) {
    fieldDef = metadata[name];
    fieldType = typeof fieldDef;
    if (fieldType !== 'function') fieldType = fieldDef;
    buildGetter = accessors[fieldType];
    if (buildGetter) buildGetter(protoClass, name, index++, fieldDef);
  }
  return protoClass;
};

// Assign metadata to array elements
//   data - array of objects
//   metadata - data describes PrototypeClass structure
// Returns: built PrototypeClass

const assignMetadata = (data, metadata) => {
  const proto = buildPrototype(metadata);
  console.log(`
    1)buildPrototype():
      ƒ ProtoClass()
        arguments: null
        caller: null
        length: 0
        name: "ProtoClass"
        prototype:
          age: (...)
          born: (...)
          city: (...)
          constructor: ƒ ProtoClass()
          name: (...)
          toString: (...)
          get age: ƒ age()
          get born: ƒ get()
          set born: ƒ set(value)
          get city: ƒ get()
          set city: ƒ set(value)
          get name: ƒ get()
          set name: ƒ set(value)
          get toString: ƒ toString()
          __proto__: Object
  `)
  //Object.setPrototypeOf(data, proto);
  assignPrototype(data, proto);
  console.log(`
  2)assignPrototype():
    Array(5)
      0: Array(3)
      0: "Marcus Aurelius"
      1: "Rome"
      2: "212-04-26"
      age: (...)
      born: (...)
      city: (...)
      length: 3
      name: (...)
      toString: (...)
      __proto__:
        age: (...)
        born: (...)
        city: (...)
        constructor: ƒ ProtoClass()
        name: (...)
        toString: (...)
        get age: ƒ age()
        get born: ƒ get()
        set born: ƒ set(value)
        get city: ƒ get()
        set city: ƒ set(value)
        get name: ƒ get()
        set name: ƒ set(value)
        get toString: ƒ toString()
        __proto__: Object
      1: (3) ["Victor Glushkov", "Rostov on Don", "1923-08-24"]
      2: (3) ["Ibn Arabi", "Murcia", "1165-11-16"]
      3: (3) ["Mao Zedong", "Shaoshan", "1893-12-26"]
      4: (3) ["Rene Descartes", "La Haye en Touraine", "1596-03-31"]
      length: 5
  `);
  return proto;
};

// Usage

// Define Data Source

const data = [
  ['Marcus Aurelius', 'Rome', '212-04-26'],
  ['Victor Glushkov', 'Rostov on Don', '1923-08-24'],
  ['Ibn Arabi', 'Murcia', '1165-11-16'],
  ['Mao Zedong', 'Shaoshan', '1893-12-26'],
  ['Rene Descartes', 'La Haye en Touraine', '1596-03-31']
];

console.dir({ data });
console.log('data[0].__proto__ === Array.prototype:', data[0].__proto__ === Array.prototype);

// Define metadata to build prototype dynamically

const metadata = {
  name: 'string',
  city: 'string',
  born: 'Date',
  age() {
    return (
      new Date().getFullYear() -
      new Date(this.born).getFullYear()
    );
  },
  toString() {
    return [this.name, this.city, this.born, this.age].join(', ');
  }
};

// Define query using regular JavaScript syntax

const query = ({ name, age, city }) => (
  name !== '' &&
  age > 25 &&
  city === 'Rome'
);

// Build prototype and assign to array elements
console.log('\nResign prototype:')
assignMetadata(data, metadata);
console.log('data[0].__proto__ === Array.prototype:', data[0].__proto__ === Array.prototype);

// Apply query to dataset
// Now we can work with array ['Alex', 'New York', '1999'] like with object {name: 'Alex', city: 'New York', born: '1999'}
const res = data.filter(query);
console.dir({ res });
console.dir({ age: res[0].age });