/*
Отличие от Map:
 - ключи в WeakMap должны быть объектами, а не примитивными значениями;
 - не предотвращает удаление объектов сборщиком мусора, когда эти объекты выступают в качестве ключей;
 */

//==========================1)Example:==========================//

// 1)Object:
console.log('Object:')

let obj = {'city': 'London'};
const array = [obj];

console.log('obj:',obj)
console.log('array:',array[0])

obj = null;

//obj wasn't cleared by garbage collection because refer on it exists in array
console.log('cleared obj:',obj)
console.log('array:', array[0])

// 2)Map:
{
  console.log('\nMap:');

  let obj = {'city': 'London'};
  const map = new Map();
  map.set('city', obj);

  console.log('obj:', obj)
  console.log('map:', map.get('city'));

  obj = null;

  //obj wasn't cleared by garbage collection because refer on it exists in array
  console.log('cleared obj:', obj)
  console.log('map:', map.get('city'));
}
// 3)WeakMap:
{
  console.log('\nWeakMap:');

  let obj = {};
  const map = new WeakMap();
  map.set(obj, 'London');

  console.log('obj:', obj)
  console.log('map:', map.get(obj));

   bj = null;

  //obj was cleared by garbage collection because refer on it exists in array
  console.log('cleared obj:', obj)
  console.log('map:', map.get(obj));
}