/*
Объект Map - содержит пары ключ-значение и сохраняет порядок вставки. Любое значение (как объекты, так и примитивы) могут быть использованы в качестве ключей.
  Отличия от простых объектов:
    - Ключами Объекта выступают Строки и Символы, в то время как любое значение может быть ключом Map, включая функции, объекты и примитивы.
    - В отличие от Объектов, ключи в Map упорядочены. Таким образом, во время итерации Map, ключи возвращаются в порядке вставки.
    - Вы легко можете получить количество элементов в Map с помощью свойства size, в то время как количество элементов Объекта может быть определено только вручную.
    - Map - итерируемый объект и может быть итерирован напрямую, в то время как Объект требует ручного получения списка ключей и их итерации.
    - Объект имеет прототип и поэтому имеет стандартный набор ключей, который, при неосторожности, может пересекаться с вашими ключами.
С момента выхода ES5 это может быть изменено с помощью map = Object.create(null).
    - Map может иметь более высокую производительность в случаях частого добавления или удаления ключей.
Использование:
    - преобразование данных не имеющих ключей;
    - добавление итерируемости;
 */

//==========================1)Inner build:==========================//

class Dictionary {
  constructor() {
    this.map = Object.create(null);
  }
  set(key, value) {
    this.map[key] = value;
    return this;
  }
  get(key) {
    return this.map[key];
  }
  has(key) {
    return !!this.map[key];
  }
  delete(key) {
    delete this.map[key];
  }
  get size() {
    return Object.keys(this.map).length;
  }
  keys() {
    return Object.keys(this.map);
  }
  clear() {
    this.map = Object.create(null);
  }
  static from(hash) {
    const instance = new Dictionary();
    for (const key in hash) {
      instance.set(key, hash[key]);
    }
    return instance;
  }
}

// Usage

const cities = {
  Shanghai: 24256800,
  Beijing: 21516000,
  Delhi: 16787941,
  Lagos: 16060303,
};

// const cityPopulation1 = Dictionary.from(cities);
// console.dir({ cityPopulation1 });
//
// const cityPopulation2 = new Dictionary();
// cityPopulation2.set('Shanghai', 24256800);
// cityPopulation2.set('Beijing',  21516000);
// cityPopulation2.set('Delhi',    16787941);
// cityPopulation2.set('Lagos',    16060303);
// console.dir({ cityPopulation2 });
//
// cityPopulation2.delete('Shanghai');
// console.dir({ cityPopulation2 });
//
// if (cityPopulation2.has('Beijing')) {
//   console.log('Beijing:', cityPopulation2.get('Beijing'));
// }
//
// if (!cityPopulation2.has('Shanghai')) {
//   console.log('no data for Shanghai');
// }
//
// console.log('size:', cityPopulation2.size);
// console.log('keys:', cityPopulation2.keys());

//==========================2)JS Map:==========================//
{
  const cityPopulation = new Map();

  //Setting:
  cityPopulation.set('Shanghai', 24256800);
  cityPopulation.set('Beijing',  21516000);
  cityPopulation.set('Delhi',    16787941);
  cityPopulation.set('Lagos',    16060303);

  // // Iterable:
  // for (const city of cityPopulation) {
  //   console.log(city);
  // }
  //
  // for (const [name, population] of cityPopulation) {
  //   console.log(`Population of ${name} is ${population}`);
  // }
  //
  // // Deleting:
  // cityPopulation.delete('Shanghai');
  //
  // // Has, getting:
  // cityPopulation.has('Beijing') && console.log('Beijing:', cityPopulation.get('Beijing'));
  // !cityPopulation.has('Shanghai') && console.log('no data for Shanghai');
  //
  // console.log('size:', cityPopulation.size);
  // console.log('keys:', [...cityPopulation.keys()]);
  // console.log('values:',[...cityPopulation.values()]);
  // console.log('entries:',[...cityPopulation.entries()]);
  //
  // //Clearing:
  // cityPopulation.clear();
  // console.log('entries after clear:',[...cityPopulation.entries()]);
}
//==========================3)Usage for optimization: make other data structure iterable by keys==========================//
{
  const buildIndex = (ds, col) => {
    const index = new Map();
    for (const record of ds) {
      index.set(record[col], record);
    }
    return index;
  };

// Usage

  const dataset = [
    ['Shanghai',	24256800,	6340,	3826,	'China'],
    ['Beijing',	21516000,	16411,	1311,	'China'],
    ['Delhi',	16787941,	1484,	11313,	'India'],
    ['Lagos',	16060303,	1171,	13712,	'Nigeria'],
    ['Tianjin',	15200000,	11760,	1293,	'China'],
    ['Karachi',	14910352,	3527,	4572,	'Pakistan'],
    ['Istanbul',	14160467,	5461,	2593,	'Turkey'],
    ['Tokyo',	13513734,	2191,	6168,	'Japan'],
  ];
  console.log(dataset);

  const byName = buildIndex(dataset, 0);
  console.log(byName);

  const byPopulation = buildIndex(dataset, 1);
  console.log(byPopulation);

  const delhi = byName.get('Delhi');
  console.log(delhi);

  const record = byPopulation.get(21516000);
  console.log(record, '\n');

  // Iterable:
  for (const city of byName) {
    console.log(city);
  }
}