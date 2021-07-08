
//==========================1)Defining:==========================//

const person1 = {};
person1.name = 'Marcus';
person1.city = 'Roma';
person1.born = 121;

const person2 = new Object();
person2.name = 'Marcus';
person2.city = 'Roma';
person2.born = 121;

const person3 = {
  name: 'Marcus',
  city: 'Roma',
  born: 121,
};

//==========================2)Accessors:==========================//
{
  const person = {
    name: 'Marcus',
    city: 'Roma',
    born: 121,
  };

// console.log('Person name is: ' + person.name);
// console.log('Person name is: ' + person['name']);

  delete person.name;
// console.dir({ person });

  delete person['city'];
// console.dir({ person });

// With getter
  const person2 = {
    name: 'Marcus Aurelius',
    get city() {
      return 'Roma';
    },
    set city(value) {
      console.log('Marcus remains in Roma');
    },
  };

 // person2.city = 'Kiev';

// console.dir({ person2 });
}
//==========================3)Work with properties:==========================//
{
  const person = {
    name: 'Marcus',
    city: 'Roma',
    born: 121,
  };

  if ('name' in person) {
    console.log('Person name is: ' + person.name);
  }

  for (const key in person) {
    const value = person[key];
    console.dir({key, value});
  }

// Variables to hash
  const name = 'Marcus Aurelius';
  const city = 'Rome';

  {
    const person = {name, city};
    console.dir({person});
  }

// Dynamic field name
  {
    const fieldName = 'city';
    const fieldValue = 'Roma';
    const person = {
      name: 'Marcus Aurelius',
      [fieldName]: fieldValue,
    };
    console.dir({person});
  }

// Expression in field name
  {
    const prefix = 'city';
    const person = {
      name: 'Marcus Aurelius',
      [prefix + 'Born']: 'Roma',
    };
    console.dir({person});
  }

// Function in field name
  {
    const fn = (s) => s + 'Born';
    const person = {
      name: 'Marcus Aurelius',
      [fn('city')]: 'Roma',
    };
    console.dir({person});
  }
}