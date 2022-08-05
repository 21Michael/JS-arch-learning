/*
Partial Application - the process of applying a function to some of its arguments.
The partially applied function gets returned for later use. In other words, a function
that takes a function with multiple parameters and returns a function with fewer parameters.
Partial application fixes (partially applies the function to) one or more arguments inside
the returned function, and the returned function takes the remaining parameters as arguments
in order to complete the function application.
*/

//=========================1) Through the closure========================//

const { log: ln } = Math;
const log = (base, n) => ln(n) / ln(base);
// closure:
const createLog = base => n => log(base, n);

// Usage
{
  // const lg = createLog(10);
  // const ln = createLog(Math.E);
  //
  // // partial usage:
  // console.log('lg(5) =', lg(5));
  // console.log('ln(5) =', ln(5));
}

//=========================2) Through the bind method========================//

const { log: ln2 } = Math;
const log2 = (base, n) => ln2(n) / ln2(base);

// Usage
{
  //bind method:
  // const lg = log2.bind(null, 10);
  // const ln = log2.bind(null, Math.E);
  //
  // console.log('lg(5) = ' + lg(5));
  // console.log('ln(5) = ' + ln(5));
}

//=========================3.1) Through the currying /bad/========================//

const partial = (fn, x) => (...args) =>  fn(x, ...args);

// Usage

const sum4 = (a, b, c, d) => (a + b + c + d);

const f31 = partial(sum4, 1);
const y3 = f31(2, 3, 4);
//console.log(y3) // 10

const f11 = partial(sum4, 1); // (...args) =>  sum(1, ...args); // x = 1; args = [];
const f12 = partial(f11, 2); // (...args) => (2) => sum(1, ...args); // x = 1; args = [2];
const f13 = partial(f12, 3); // (...args) => (3) => (2) => sum(1, ...args); // x = 1; args = [2, 3];
const f14 = partial(f13,4); // (...args) => (4) => (3) => (2) => sum(1, ...args); // x = 1; args = [2, 3, 4];
const y1 = f14(); // sum(1, [2, 3, 4]);
//console.log(y1); // 10

const f21 = partial(sum4, 1, 2); // (...args) =>  sum(1, ...args); // x = 1; args = [];
const f22 = partial(f21, 3); // (...args) => (3) => sum(1, ...args); // x = 1; args = [3];
const y2 = f22(4); // (4) => (3) => sum(1, ...args); // x = 1; args = [3, 4];
//console.log(y2); // 8 + undefined = NaN !!!!!!!!!

//=========================3.2) Through the currying /better/========================//

{
  //  const partial = (fn, ...args) => (...args2) => fn(...args.concat(args2));
  const partial = (fn, ...args) => (...args2) => fn(...args, ...args2);

  const f21 = partial(sum4, 1, 2); // (...args2) =>  sum(1, 2); //args2 = []; args = [1, 2];
  const f22 = partial(f21, 3); // (...args2) => (3) => sum(1, 2); // args2 = []; args = [1, 2, 3];
  const y2 = f22(4); // (4) => (3) => sum(1, 2); // args2 = [4]; args = [1, 2, 3];
  console.log(y2); // 10

}