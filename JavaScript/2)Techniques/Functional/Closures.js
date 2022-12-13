/*
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (scope).
 */

//=========================1) Closure========================//

const add = (x) => (y) => {
  const z = x + y;
  console.log(x + '+' + y + '=' + z);
  return z;
};

// const add = x => y => x + y;

// Usage

const res = add(3)(6);
console.log(res);

//=========================2) Closure recursive + valueOf()========================//

{
  const add = (x) => {
    const next = (y) => add(x + y);
    next.valueOf = () => x;

    return next;
  }

// const add = x => y => add(x + y);

// Usage

  const add5 = add(5);
  console.log([1,2,3,4,5].map(v => Number(add5(v))))


  const res = Number(add(1)(4)(8)(8));
  console.log(res);
}
