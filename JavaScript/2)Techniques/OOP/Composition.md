# Composition:

Composition is in contrast to inheritance, it enables the creation
of complex types by combining objects (components) of other types,
rather than inheriting from a base or parent class. To put it 
simply, composition contains instances of other classes that 
implement the desired functionality.  
Composition is when one object refer to another object.

![link](https://drive.google.com/uc?id=1_nD8aoxrphMmt0QpxKfDrCrs0rcPvNJi)

## <ins>Composition in JS:</ins>

```ts
interface Valuable {
  price$: number;
}

class Lithium {
  private _price: number
  constructor(price: number) {
    this._price = price;
  }

  get price$() {
    return this._price;
  }
}

class Steel {
  private _price: number
  constructor(price: number) {
    this._price = price;
  }

  get price$() {
    return this._price;
  }
}

class Battery {
  material: Lithium;
  volumeA: number;
  constructor(material: Lithium, volumeA: number) {
    this.material = material;
    this.volumeA = volumeA;
  }

  get price$() {
    return this.material.price$ + 800;
  }
}

class ElectricEngine {
  material: Steel;
  powerW: number;
  constructor(material: Steel, powerW: number) {
    this.material = material;
    this.powerW = powerW;
  }

  get price$() {
    return this.material.price$ + 10000;
  }
}

class ElectricCar {
  construction: Valuable[];
  speed: number;
  constructor(construction: Valuable[]) {
    this.construction = construction;
    this.speed = 300;
  }

  get price$() {
    return this.construction.reduce((c, n) => c += n.price$, 0)
  }
}


const steel = new Steel(300);
const lithium = new Lithium(800);

const electricEngine = new ElectricEngine(steel, 700);
const battery = new Battery(lithium, 5000);

const teslaS = new ElectricCar([electricEngine, battery]);

console.log(teslaS.price$)
```

## <ins>Inheritance vs Composition:</ins>

![link](https://drive.google.com/uc?id=17OO0yVMWC6LDhBj7R6nTsiglUfmjKony)

The main difference between inheritance and composition is in
the relationship between objects.
 - **Inheritance:** “is a.” E.g. The car is a vehicle.
 - **Composition:** “has a.” E.g. The car has a steering wheel.
   
They’re different in purpose too.
  - **Inheritance:** To design a class on what it is.
  - **Composition:** To design a class on what it does.

### COMPOSITION PROS:
- Composition is a far looser coupling. Combining with Dependency Injection (here), it brings more flexibility and also allows us to change runtime behavior.
### INHERITANCE CONS:
- The tightest form of coupling in object-oriented programming.
- Changing a base class can cause unwanted side effects on its subclasses or even all over the codebase.
