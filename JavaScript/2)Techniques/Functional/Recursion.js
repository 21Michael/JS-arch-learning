/*
 A recursive function can be defined as a routine that calls itself directly or indirectly.
 */

//=========================1)Simple========================//

const getMaxCallStackSize = i => {
  try {
    return getMaxCallStackSize(++i);
  } catch (e) {
    return i;
  }
};

//console.log(getMaxCallStackSize(0));

//=========================2)Indirect========================//

function f(x) {
  return g(x);
}

function g(x) {
  return f(x);
}

//console.log(f(0));

//=========================3)Usage:========================//

// 1)Pow:

const pow = (base, power) => {
  if (power === 1) return base;
  else return pow(base, power - 1) * base;
};

//console.log(pow(2, 3));

// 2)Factorial:

const factorial = n => {
  if (n === 0) return 1;
  else return n * factorial(n - 1);
};

//console.log(factorial(10));

// 3)Fibonacci:

const fibonacci = n => (n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));

//console.log(fibonacci(10));

// 4)Reduce:

const reduce = (fn, acc, [cur, ...rest]) => (
  cur === undefined ? acc : reduce(fn, fn(acc, cur), rest)
);

const res = reduce((a, b) => a + b, 0, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
//console.log({ res });

//=========================4)Simple tail recursion optimization========================//


const add = (n, acc = 0) => {
  if (n === 0) return acc;
  return add(n - 1, acc + n);
};

//console.log(add(3));

//For processing a recursion each function called repeatedly has to be placed in stack, processed and returned the result,
//meanwhile loop gets in stack just one time, therefore such difference makes loop faster!!!

const tail = (n, acc = 0) => {
  while (true) {
    if (n === 0) return acc;
    acc += n;
    n--;
  }
};

//console.log(tail(3));

//=========================5)More difficult recursion optimization========================//

const fibonacci1 = n => {
  if (n <= 2) return 1;
  return fibonacci1(n - 1) + fibonacci1(n - 2);
};

console.log(fibonacci1(14));

const fibonacci2 = n => {
  let a = 1;
  let b = 0;
  let c = 0;
  while (n > 0) {
    c = a + b;
    b = a;
    a = c;
    n--;
  }
  return b;
};

console.log(fibonacci2(14));