class Humburger {
  constructor(size, stuffing) {
    this.menu = {
      size: { medium: [50, 20], large: [100, 40] },
      stuffing: { cheese: [10, 20], salad: [20, 5], potatoes: [15, 10] },
      topping: { seasoning: [15, 0], sauce: [20, 5] },
    };
    this.size = size;
    this.stuffing = stuffing;
    this.topping = "";
    this.totalPrice = 0;
    this.totalCalories = 0;
    this.toppingList = [];
  }

  addTopping(yourTopping) {
    if (yourTopping in this.menu.topping) {
      this.toppingList.push(yourTopping);
    } else {
      alert("Данный топинг закончился, могу предложить seasoning или sauce :)");
    }
  } // Добавить добавку }

  removeTopping(topping) {
    if (this.toppingList.includes(topping)) {
      this.toppingList.splice(this.toppingList.indexOf(topping), 1);
    }
  } // Убрать добавку }

  getToppings() {
    return this.toppingList;
  } // Получить список добавок }

  getSize() {
    return this.size;
  } // Узнать размер гамбургера }

  getStuffing() {
    return this.stuffing;
  } // Узнать начинку гамбургера }

  calculatePrice() {
    if (this.toppingList.length > 0) {
      for (let i = 0; i < this.toppingList.length; i++) {
        let currentTopping = this.toppingList[i];
        this.totalPrice += this.menu.topping[currentTopping][0];
      }
    }
    this.totalPrice += this.menu.size[this.size][0] + this.menu.stuffing[this.stuffing][0];
    return this.totalPrice;
  } // Узнать цену }

  calculateCalories() {
    if (this.toppingList.length > 0) {
      for (let i = 0; i < this.toppingList.length; i++) {
        let currentTopping = this.toppingList[i];
        this.totalCalories += this.menu.topping[currentTopping][1];
      }
    }

    this.totalCalories += this.menu.size[this.size][1] + this.menu.stuffing[this.stuffing][1];
    return this.totalCalories;
  } // Узнать калорийность }
}

const __init__ = () => {
  let myHumburger = new Humburger("large", "cheese");

  console.log(myHumburger.getSize());
  console.log(myHumburger.getStuffing());
  myHumburger.addTopping("sauce");
  myHumburger.addTopping("seasoning");
  console.log(myHumburger.getToppings());
  //   myHumburger.removeTopping("sauce");
  //   console.log(myHumburger.getToppings());
  console.log(myHumburger.calculatePrice());
  console.log(myHumburger.calculateCalories());
};

window.onload = __init__;
