/*
Decorator pattern - is a design pattern that allows behavior to be added to an individual object,
dynamically, without affecting the behavior of other objects from the same class.
 */

//=======================1)Realization throughout inheritance parent instance bad!!!=======================//

function Sale(price) {
  this.price = price || 100;
}

Sale.prototype.getPrice = function () {
  return this.price;
};

Sale.decorators = {
  fedtax: {
    getPrice: function () {
      var price = this.parent.getPrice();
      price += price * 5 / 100;
      return price;
    }
  },
  quebec: {
    getPrice: function () {
      var price = this.parent.getPrice();
      price += price * 7.5 / 100;
      return price;
    }
  },
  money: {
    getPrice: function () {
      return '$' + this.parent.getPrice().toFixed(2);
    }
  },
  cdn: {
    getPrice: function () {
      return 'CDN$ ' + this.parent.getPrice().toFixed(2);
    }
  }
};

Sale.prototype.decorate = function (decorator) {
  const F = function () {};
  const overrides = this.constructor.decorators[decorator];

  F.prototype = this;

  const newobj = new F();
  newobj.parent = F.prototype;
  for (const key in overrides) {
    if (overrides.hasOwnProperty(key)) {
      newobj[key] = overrides[key];
    }
  }
  return newobj;
};

let sale = new Sale(100);

// this = { price: 100 }
sale = sale.decorate('fedtax');
// this = { parent: Sale { price: 100 }, getPrice: [Function: getPrice] }
sale = sale.decorate('quebec');
// this = {
//   parent: Sale { parent: Sale { price: 100 }, getPrice: [Function: getPrice] }, parents inheritance growing!!!!!!!!!!!!!!!!!!!!!!
//   getPrice: [Function: getPrice]
// }
sale = sale.decorate('money');
//console.log(sale.getPrice());

//=======================2)Optimized variant without inheritance (modifying instances)=======================//
{
  function Sale(price) {
    this.price = price || 100;
  }

  Sale.prototype.getPrice = function () {
    return this.price;
  };

  Sale.decorators = {
    fedtax: {
      getPrice: function () {
        this.price += this.price * 5 / 100;
        return this.price;
      }
    },
    quebec: {
      getPrice: function () {
        this.price += this.price * 7.5 / 100;
        return this.price;
      }
    },
    money: {
      getPrice: function () {
        this.price = '$' + this.price.toFixed(2);
        return this.price;
      }
    },
    cdn: {
      getPrice: function () {
        this.price = 'CDN$ ' + this.price.toFixed(2);
        return this.price;
      }
    }
  };

  Sale.prototype.decorate = function (decorator) {
    const overrides = Sale.decorators[decorator];
    this.price = overrides.getPrice.call(this);
  };

//Usage:

  const sale = new Sale(100); // цена 100 долларов

  sale.decorate('fedtax'); // добавить федеральный налог
  sale.decorate('quebec'); // добавить местный налог
  sale.decorate('money'); // форматировать как денежную сумму

  console.log(sale.getPrice());
}

