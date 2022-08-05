/*
Creating or destroying an object is never free and JavaScript is no exception.
Generally, the cost of creating/destroying an object in JIT-optimized JavaScript runtimes doesn't affect performance.
The real culprit is the increase in your application's memory footprint. Pools allow to allocate certain amount of
memory to each instance before processing. It allows managing memory that optimizing creating (allocating memory) and
destroying objects (garbage collection) by programming engine.
Real usage: timers, sockets, file-readers..
*/

//================================1)Simple================================//

const pool = item => {
  //pool.items = [[0,0,0,0,0...] x 10];
  //pool.items.length = 10;
  pool.items = pool.items || new Array(10).fill(new Array(1000).fill(0));

  if (item) {
    //pool.items.length = 9;
    pool.items.push(item);
    //pool.items = [[0,0,0,0,0...], item];
    //pool.items.length = 10;
    console.log('Recycle item, count =', pool.items.length);
    return;
  }
  //res = [0,0,0,0,0...];
  //pool.items.length = 10 - 1;
  const res = pool.items.pop() || new Array(1000).fill(0);// after popping 10 el it starts creating new object and becoming useless.

  console.log('Get from pool, count =', pool.items.length);
  return res;
};

// Usage

// const a1 = pool();
// const b1 = a1.map((x, i) => i).reduce((x, y) => x + y);
// console.log(b1);
//
// const a2 = pool();
// const b2 = a2.map((x, i) => i).reduce((x, y) => x + y);
// console.log(b2);
//
// pool(a1);
// pool(a2);
//
// const a3 = pool();
// const b3 = a3.map((x, i) => i).reduce((x, y) => x + y);
// console.log(b3);

//================================Allocation size of pool and data constructor================================//

const poolify = (factory, size) => {
  // items = [[0,0,0,0,0...] x size];
  const items = new Array(size).fill(null).map(() => factory());

  return item => {
    if (item) {
      items.push(item);
      console.log('Recycle item, count =', items.length);
      return;
    }
    const res = items.pop() || factory();// after popping > size el it starts creating new object and becoming useless.

    console.log('Get from pool, count =', items.length);
    return res;
  };
};

// Usage

// Factory to allocate 4kb buffer - constructor
const buffer = () => new Uint32Array(1024);

// Allocate pool of 10 buffers
const pool2 = poolify(buffer, 10);

// for (let i = 0; i < 15; i++) {
//   const a = pool2();
//   console.log('Buffer size', a.length * 32);
// }

//================================Allocation size of pool and data constructor improved================================//

const poolify2 = (factory, min, norm, max) => {
  const duplicate = n => new Array(n).fill().map(() => factory());
  const items = duplicate(norm);

  return item => {
    if (item) {
      // if allocated data don't filled (< max) + add item
      // pool.items = [[0,0,0,0,0...], item];
      if (items.length < max) {
        items.push(item);
      }
      console.log('Recycle item, count =', items.length);
      return;
    }
    // if allocated data running out (< min) + add new to normal size
    if (items.length < min) {
      const instances = duplicate(norm - items.length);
      items.push(...instances);
    }
    // if allocated data filled (=== max) - get data
    const res = items.pop();
    console.log('Get from pool, count =', items.length);
    return res;
  };
};

// Usage

// Factory to allocate 4kb buffer
const buffer2 = () => new Uint32Array(1024);

// Allocate pool of 10 buffers
const pool3 = poolify2(buffer2, 5, 10, 15);

let i = 0;

// const next = () => {
//   const item = pool3();
//   console.log('Buffer size', item.length * 32);
//   i++;
//   if (i < 20) {
//     setTimeout(next, i * 10);
//     setTimeout(() => pool3(item), i * 100);
//   }
// };
//
// next();

//================================Async================================//

const duplicate = (factory, n) => (
  new Array(n).fill().map(() => factory())
);

const poolify3 = (factory, min, norm, max) => {
  let allocated = norm;
  const items = duplicate(factory, norm);
  const delayed = [];

  return par => {
    if (typeof par !== 'function') {
      if (items.length < max) {
        const request = delayed.shift();
        if (request) {
          const c1 = items.length;
          console.log(`${c1}->${c1} Recycle item, pass to delayed`);
          request(par);
        } else {
          const c1 = items.length;
          items.push(par);
          const c2 = items.length;
          console.log(`${c1}->${c2} Recycle item, add to pool`);
        }
      }
      return;
    }
    if (items.length < min && allocated < max) {
      const grow = Math.min(max - allocated, norm - items.length);
      allocated += grow;
      const instances = duplicate(factory, grow);
      items.push(...instances);
    }
    const c1 = items.length;
    const res = items.pop();
    const c2 = items.length;
    if (res) {
      console.log(`${c1}->${c2} Get from pool, pass to callback`);
      par(res);
    } else {
      console.log(`${c1}->${c2} Get from pool, add callback to queue`);
      delayed.push(par);
    }
  };
};

// Usage

// Factory to allocate 4kb buffer
const buffer3 = () => new Uint32Array(1024);

// Allocate pool of 10 buffers
const pool4 = poolify3(buffer3, 3, 5, 7);

// // 7 callbacks will be get from allocated pool, 8 callbacks will be added to "callback queue"
// for (let i = 0; i < 15; i++) {
//   pool4(() => 1);
// }
// console.log('-------------------')
// // first 8 calls will process callback from "callback queue", other 7 (max === 7) calls will fill allocated pool, 10 calls will be ignored
// for (let i = 0; i < 25; i++) {
//   pool4();
// }