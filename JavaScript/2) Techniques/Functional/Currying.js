/*
Currying is an advanced technique of working with functions.
Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as
 - f(a)(b)(c).
 - f(a, b)(c).
 - f(a)(b, c).
 */

//=========================1) Currying simple========================//

const sum = (a, b, c, d) => (a + b + c + d);
const curry = (fn) => (...arg) => arg.length  ? curry((...arg2) => fn(...arg,  ...arg2)) : fn(...arg);
/*
  curry(sum):
     curry(fn = sum) => (...arg) => arg.length  ? curry((...arg2) => fn( ...arg,  ...arg2)) : fn( ...arg);
  f(1)(2)(3)(4)():
    f(1):  curry(fn = (1) => (fn = sum) => (...arg) => arg.length  ? curry((...arg2) => fn( ...arg,  ...arg2)) : fn( ...arg));
    f(1)(2):  curry(fn = (2) => (1) => (fn = sum) => (...arg) => arg.length  ? curry((...arg2) => fn( ...arg,  ...arg2)) : fn( ...arg));
    f(1)(2)(3):  curry(fn = (3) => (2) => (1) => (fn = sum) => (...arg) => arg.length  ? curry((...arg2) => fn( ...arg,  ...arg2)) : fn( ...arg));
    f(1)(2)(3)(4):  curry(fn = (4) => (3) => (2) => (1) => (fn = sum) => (...arg) => arg.length  ? curry((...arg2) => fn( ...arg,  ...arg2)) : fn( ...arg));
    f(1)(2)(3)(4)(): (4) => (3) => (2) => (1) => sum(..arg = [])
                     (3) => (2) => (1) => sum(..arg = [4])
                     (2) => (1) => sum(..arg = [4,3])
                     (1) => sum(..arg = [4,3,2])
                     sum(..arg = [4,3,2,1])
  response:          10
 */

const f = curry(sum);
const y1 = sum(1, 2, 3, 4);
const y2 = f(1, 2, 3, 4)();
const y3 = f(1, 2, 3)(4)();
const y4 = f(1, 2)(3)(4)();
const y5 = f(1)(2)(3)(4)();
const y6 = f(1)(2, 3, 4)();
const y7 = f(1)(2)(3, 4)();
const y8 = f(1, 2)(3, 4)();
//console.log(y1, y2, y3, y4, y5, y6, y7, y8);

//=========================2) Currying better + bind========================//

{
  const curry = (fn) => (...args) => (
    console.log('fn.length:',fn.length, 'args.length:', args.length),
    //without bind: curry((...arg2) => fn(...arg,  ...arg2)) we creating new closure witch length === 0
    fn.length > args.length ?
      curry(fn.bind(null, ...args)) :
      fn(...args)
  );

// Usage

  const sum4 = (a, b, c, d) => (a + b + c + d);

  const f = curry(sum4);
  const y1 = sum4(1, 2, 3, 4);
  const y2 = f(1, 2, 3, 4);
  const y3 = f(1, 2, 3)(4);
  const y4 = f(1, 2)(3)(4);
  const y5 = f(1)(2)(3)(4);
  const y6 = f(1)(2, 3, 4);
  const y7 = f(1)(2)(3, 4);
  const y8 = f(1, 2)(3, 4);
  //console.log(y1, y2, y3, y4, y5, y6, y7, y8);
}

//=========================3) Currying better + bind + partial app========================//
{
  const curry = (fn, ...par) => {
    const curried = (...args) => (
      fn.length > args.length ?
        curry(fn.bind(null, ...args)) :
        fn(...args)
    );
    return par.length ? curried(...par) : curried;
  };

// Usage

  const sum4 = (a, b, c, d) => (a + b + c + d);

  const f = curry(sum4, 1);
  const y1 = sum4( 1, 2, 3, 4);
  const y2 = f( 2, 3, 4);
  const y3 = f( 2, 3)(4);
  const y4 = f( 2)(3)(4);
  const y5 = f(2)(3)(4);
  const y6 = f(2, 3, 4);
  const y7 = f(2)(3, 4);
  const y8 = f( 2)(3, 4);
  console.log(y1, y2, y3, y4, y5, y6, y7, y8);
}