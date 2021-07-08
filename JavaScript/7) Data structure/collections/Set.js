/*
Объекты Set позволяют вам сохранять уникальные значения любого типа, как примитивы, так и другие типы объектов.
 */

//==========================1)Example:==========================//

const cities = new Set();

//Setting:
cities.add('Beijing');

['Kiev', 'London', 'Baghdad'].forEach(city => cities.add(city));

// Iterable:
// for (const city of cities) {
//   console.log(city);
// }

//Deleting:
cities.delete('Baghdad');

// console.dir({ cities });
//
// //Has:
// if (cities.has('Kiev')) {
//   console.log('cities contains Kiev');
// }
// //Getting:
// console.dir({ keys: cities.keys() });
// console.dir({ values: cities.values() });
// console.dir({ entries: cities.entries() });
//
// cities.clear();

//==========================2)Weakness of Set for objects (because each object has an unique refer)==========================//
{

  const distinct = dataset => {
    const keys = new Set();
    return dataset.filter(record => {
      const cols = Object.keys(record).sort();
      const key = cols.map(field => record[field]).join('\x00');
      const has = keys.has(key);
      if (!has) keys.add(key);
      return !has;
    });
  };

// Usage

  const flights = [
    { from: 'Kiev', to: 'Rome' },
    { from: 'Kiev', to: 'Warsaw' },
    { from: 'Dublin', to: 'Riga' },
    { from: 'Riga', to: 'Dublin' },
    { from: 'Kiev', to: 'Rome' },
    { from: 'Cairo', to: 'Paris' },
  ];

  //console.dir({ flights });

  const directions1 = new Set(flights);
  const directions2 = distinct(flights);

  // { from: 'Kiev', to: 'Rome' } x2 duplicating
  // console.log(directions1)
  // { from: 'Kiev', to: 'Rome' } x1
  //console.log(directions2)
}
//==========================3)Usage:==========================//

// 1)Without Set:

const union = (s1, s2) => {
  const ds = [...s1];

  for (let i = 0; i < s2.length; i++) {
    const item = s2[i];
    if (!ds.includes(item)) ds.push(item);
  }
  return ds;
};

const intersection = (s1, s2) => {
  const ds = [];
  for (let i = 0; i < s1.length; i++) {
    const item = s1[i];
    if (s2.includes(item)) ds.push(item);
  }
  return ds;
};

const difference = (s1, s2) => {
  const ds = [...s1, ...s2];
  return ds.filter(item => !s2.includes(item) || !s1.includes(item));
};

// Usage

const cities1 = ['Beijing', 'Kiev'];
const cities2 = ['Kiev', 'London', 'Baghdad'];

const operations = [union, intersection, difference];

const results = operations.map(operation => ({
  [operation.name]: operation(cities1, cities2)
}));

// console.dir({ cities1, cities2 });
// console.dir(results);

// 2)Set:
{
  const union = (s1, s2) => new Set([...s1, ...s2]);

  const intersection = (s1, s2) => new Set(
    [...s1].filter(v => s2.has(v))
  );

  const difference = (s1, s2) => new Set(
    [...s1, ...s2].filter(v => !s2.has(v) || !s1.has(v))
  );

// Usage

  const cities1 = new Set(['Beijing', 'Kiev']);
  const cities2 = new Set(['Kiev', 'London', 'Baghdad']);

  const operations = [union, intersection, difference];

  const results = operations.map(operation => ({
    [operation.name]: operation(cities1, cities2)
  }));

  console.dir({ cities1, cities2 });
  console.dir(results);
}
