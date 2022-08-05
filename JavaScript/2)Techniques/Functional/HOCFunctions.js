/*
HOC -  is a function that does at least one of the following:
  - takes one or more functions as arguments (i.e. procedural parameters),
  - returns a function as its result.
Because all functions in JS are HOC (even more than HOC, they are first-class-objects) it allows to use such constructions:
 */


//=========================1)Callbacks========================//

const fn = (par, callback) => {
  if (!par) {
    callback(new Error('Parameter needed'));
    return;
  }
  callback(null, `Data ${par}`);
  return 'Value';
};

const res = fn('example', (err, data) => {
  if (err) throw err;
  console.dir({ data });
});

console.dir({ res });

//=========================2)Closure========================//
{
  const fn = a => {
    const b = 'Closure variable';
    return c =>  {
      console.dir({ a, b, c });
    };
  };

  const f1 = fn('Parameter 1');
  f1('Parameter 2');

  const f2 = fn('Parameter X');
  f2('Parameter Y');
}

//=========================3)Closure========================//
{
  function fn(a) {
    return function(b) {
      return function(c) {
        return a + b + c;
      };
    };
  }

// const fn = a => b => c => a + b + c;

  const f1 = fn(1);
  const f2 = f1(2);
  const res1 = f2(3);
  const res2 = fn(1)(2)(3);

  if (res1 === res2) {
    console.log('a + b + c =', res1);
  }
}
//=========================4)Wrapper========================//
{
  const logable = fn => (...args) => {
    const res = fn(...args);
    console.log(`Call: ${fn.name}(${args.join(', ')}) Result: ${res}`);
    return res;
  };

// Usage

  const sum = (a, b) => a + b;

  const logableSum = logable(sum);
  const a = logableSum(3, 5);
  const b = logableSum(7, 2);
  const c = logableSum(1, -1);
  console.dir({ a, b, c });
}