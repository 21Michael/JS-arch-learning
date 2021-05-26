// Decorator it's a function (wrapper) that get a function, adds additional functionality and return the function;

//=======================1)Simple=======================//

const wrap = (f) => {
  console.log('Wrap function:', f.name);
  return (...args) => {
    console.log('Called wrapper for:', f.name);
    console.dir({ args });
    const result = f(...args);
    console.log('Ended wrapper for:', f.name);
    console.dir({ result });
    return result;
  };
};

// Usage

// const func = (par1, par2) => {
//   console.dir({ par1, par2 });
//   return [par1, par2];
// };
//
// func('Uno', 'Due');
// console.log('----------------')
// const wrapped = wrap(func);
// console.log('----------------')
// wrapped('Tre', 'Quatro');

//=======================2)Before, after wrappers callbacks=======================//

const wrap2 = (before, after, f) => (...args) => after(f(...before(...args)));

// Usage

const func2 = (par1, par2) => {
  console.dir({ par1, par2 });
  return [par1, par2];
};

const before = (...args) => {
  console.log('before');
  return args;
};

const after = (res) => {
  console.log('after');
  return res;
};

// const wrapped2 = wrap2(before, after, func2);
// const res = wrapped2('Uno', 'Due');
// console.dir({
//   res,
//   func: func2.length,
//   wrapped: wrapped2.length,
// });

//=======================3)Wrap each method in object=======================//

const wrapFunction = (f) => {
  console.log('Wrap function:', f.name);
  return (...args) => {
    console.log('Called wrapper for:', f.name);
    console.dir({ args });
    const result = f(...args);
    console.log('Ended wrapper for:', f.name);
    console.dir({ result });
    return result;
  };
};

const cloneInterface = (anInterface) => {
  const clone = {};
  for (const key in anInterface) {
    const fn = anInterface[key];
    clone[key] = wrapFunction(fn);
  }
  return clone;
};

// Usage

const interfaceName = {
  methodSync(par1, par2) {
    console.dir({ method: { par1, par2 } });
    return [par1, par2];
  },
  methodAsync(par1, par2, callback) {
    console.dir({ method: { par1, par2 } });
    callback(null, { field: 'value' });
  }
};

//const cloned = cloneInterface(interfaceName);
//cloned.methodSync('Uno', 'Due');
//
// cloned.methodAsync('Tre', 'Quattro', (err, res) => {
//   if (err) throw err;
//   console.dir({ res });
// });

//=======================4)Timeout wrapper=======================//

const timeout = (msec, f) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timed out');
    timer = null;
  }, msec);
  return (...args) => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    return f(...args);
  };
};

// Usage

// const fn = (par) => {
//   console.log('Function called, par:', par);
// };
//
// const fn100 = timeout(100, fn);
// const fn200 = timeout(200, fn);
//
// setTimeout(() => {
//   fn100('first');
//   fn200('second');
// }, 150);

//=======================4)Async timeout wrapper=======================//

const timeout2 = (msec, f) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Function timedout');
    timer = null;
  }, msec);
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      return f(...args);
    }
  };
};

// Usage

// const fn = (par, callback) => {
//   console.log('Function called, par:', par);
//   callback(null, par);
// };
//
// const fn100 = timeout2(100, fn);
// const fn200 = timeout2(200, fn);
//
// setTimeout(() => {
//   fn100('first', (err, data) => {
//     console.log('Callback', data);
//   });
//   fn200('second', (err, data) => {
//     console.log('Callback', data);
//   });
// }, 150);

//=======================5)Wrapper that make your function calls limited times=======================//

const limit = (count, f) => {
  let counter = 0;
  return (...args) => {
    if (counter === count) return;
    counter++;
    return f(...args);
  };
};

// Usage

// const fn = (par) => {
//   console.log('Function called, par:', par);
// };
//
// const fn2 = limit(2, fn);
//
// fn2('first');
// fn2('second');
// fn2('third');

//=======================6)Wrapper that add additional method (cancel) that destroys function=======================//

const cancelable = (f) => {
  const wrapper = (...args) => {
    if (f) return f(...args);
  };
  wrapper.cancel = () => f = null;
  return wrapper;
};

// Usage

// const fn = (par) => {
//   console.log('Function called, par:', par);
// };
//
// const f2 = cancelable(fn);
//
// f2('first');
// f2.cancel();
// f2('second');

//=======================7)Wrapper that allows to make a functional chaining=======================//

const wrap3 = (f) => {
  let limit = 0;
  let counter = 0;

  const wrapper = (...args) => {
    if (limit && counter === limit) wrapper.cancel();
    if (f) {
      const res = f(...args);
      counter++;
      return res;
    }
  };

  wrapper.cancel = () => {
    f = null;
    return wrapper;
  };

  wrapper.timeout = (msec) => {
    setTimeout(() => {
      wrapper.cancel();
    }, msec);
    return wrapper;
  };

  wrapper.limit = (count) => {
    limit = count;
    return wrapper;
  };

  return wrapper;
};

// Usage

// const fn = (par) => {
//   console.log('Function called, par:', par);
// };
//
// const fn2 = wrap3(fn).timeout(200).limit(3);
// fn2('1st');
//
// setTimeout(() => {
//   fn2('2nd');
//   fn2('3rd');
//   fn2.cancel();
//   fn2('4th');
// }, 150);

//=======================8)Throttling + partly using=======================//

const throttle = (timeout, f, ...args) => {
  let timer;
  let wait = false;
  let wrapped = null;

  const throttled = (...par) => {
    timer = undefined;
    if (wait) wrapped(...par);
  };

  wrapped = (...par) => {
    if (!timer) {
      timer = setTimeout(throttled, timeout, ...par);
      wait = false;
      return f(...args.concat(par));
    } else {
      wait = true;
    }
  };

  return wrapped;
};

// Usage

const fn = (...args) => {
  console.log('Function called, args:', args);
};

// 1) partly usage of fn (hear we passing value1);
const ft = throttle(200, fn, 'value1');

const timer = setInterval(() => {
  // 2) partly usage of fn (hear we passing value2);
  fn('value2');
  ft('value3');
}, 50);

setTimeout(() => {
  clearInterval(timer);
}, 2000);