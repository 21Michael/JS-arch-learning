/*
The Chain of Responsibility - pattern provides a chain of loosely coupled objects one of which can satisfy a request.
This pattern is essentially a linear search for an object that can handle a particular request.
 */

//=========================1)Build on prototypes========================//

const Text = function(s) {
  this.value = s;
};

Text.prototype.line = function(a) {
  this.value += '\n' + a;
  return this;
};

Text.prototype.toString = function() {
  return this.value;
};

// Usage

const txt = new Text('line1')
  .line('line2')
  .line('line3')
  .line('line4');

//console.log(`${txt}`);

//=========================2)Functional chaining: Functor=======================//
{
  const text = (s = '') => ({
    line: (a) => text(`${s}\n${a}`),
    toString: () => s
  });

// Usage
  //Each times creates new instance it's not fast!!!
  const txt = text('line1')
    .line('line2')
    .line('line3')
    .line('line4');

  //console.log(`${txt}`);
}
//=========================3)Functional chaining: Functor - optimized=======================//
{
  const text = (s = '', o = {
    line: (a) => (s += '\n' + a, o),
    toString: () => s
  }) => o;

// Usage
  //Each times we returning a refer on the object from closure.
  const txt = text('line1')
    .line('line2')
    .line('line3')
    .line('line4');

  //console.log(`${txt}`);
}
//=========================4)Promises=======================//
{
const request =  Promise.resolve('resolved');
  request
    .then(val => val + ' 1')
    .then(val => val + ' 2')
    .then(val => val + ' 3')
    .then(val => console.log(val))
    .finally(() => console.log('Promise finished!!!'))
    .catch((err) => console.log('Error:', err));
}