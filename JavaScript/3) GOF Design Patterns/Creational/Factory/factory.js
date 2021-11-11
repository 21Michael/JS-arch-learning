//Factory allows to create a common interface (super-class) for creating different types of objects (from sub-classes).

class Rock {
  constructor() {
    this.bands = ['The Beatles', 'Rolling Stones', 'Nirvana']
  }
  play(){
    console.log(this.bands)
  }
}

class Punk {
  constructor() {
    this.bands = ['Sex Pistols', 'Sum 41', 'Blink-182']
  }
  play(){
    console.log(this.bands)
  }
}

class Indie {
  constructor() {
    this.bands = ['Radiohead', 'Teleman', 'Sirotkin']
  }
  play(){
    console.log(this.bands)
  }
}

class Rap {
  constructor() {
    this.bands = ['Eminem', 'Dr.Dre', 'Kaney West']
  }
  play(){
    console.log(this.bands)
  }
}

class Factory {
  static #DEFAULTS = {
    'funny': Rap,
    'brave': Rock,
    'lyric': Indie,
    'angry': Punk
  };
  constructor() {
  }
  create(mood) {
   this.mood = mood;
   this.music = new Factory.#DEFAULTS[this.mood];
   return this.music;
  }
}

const funnyMusic = (new Factory()).create('funny');
const angryMusic = (new Factory()).create('angry');
const lyricMusic = (new Factory()).create('lyric');
const braveMusic = (new Factory()).create('brave');

funnyMusic.play();
braveMusic.play();
lyricMusic.play();
angryMusic.play();


//Object usage:
const object = new Object();
const number = new Object(1);
const string = new Object('123');
const array = new Object([1,2,3]);
const bool = new Object(true);

console.log(object.constructor === Object);
console.log(number.constructor === Number);
console.log(string.constructor === String);
console.log(bool.constructor === Boolean);
console.log(array.constructor === Array);