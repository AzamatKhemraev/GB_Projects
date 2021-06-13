const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductsItem {
  constructor(product_name, price, id_product, product_count = 1) {
    this.product_name = product_name;
    this.price = price;
    this.id_product = id_product;
    this.product_count = product_count;
    // this.cartList = [];
  }

  render() {
    return `<div class="goods-item" id=${this.id_product} data-id=${this.id_product} data-productName=${this.product_name} data-productPrice=${this.price}  data-productCount=${
      this.product_count
    }>
                <img clas="goods-foto" src="https://picsum.photos/100?random=${Math.random()}">
                <div class='goods-description'>
                    <div class='goods-content'>
                        <h3>${this.product_name}</h3>
                        <p>${this.price}</p>
                    </div>
                    <button class="addToCart" data-idProduct="${this.id_product}"><i class="far fa-plus-square"></i></button>
                </div>
        </div>`;
  }
}

class ProductsList {
  constructor() {
    this.products = [];
    // this.cartList = [];
    this.totalPrice = 0;
  }

  async fetchProducts() {
    const responce = await fetch(`${API_URL}/catalogData.json`);
    if (responce.ok) {
      const catalogItems = await responce.json();
      this.products = catalogItems;
    } else {
      alert("Ошибка при соединении с сервером");
    }
  }

  totalProductsPrice() {
    for (let i = 0; i < this.products.length; i++) {
      this.totalPrice += this.products[i].price;
    }
    return this.totalPrice;
  }

  render() {
    let listHtml = "";
    this.products.forEach((product) => {
      const productItem = new ProductsItem(product.product_name, product.price, product.id_product);
      listHtml += productItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
}

class ProductsCartItem {
  constructor(product_name, price, id_product, product_count = 1) {
    this.product_name = product_name;
    this.price = price;
    this.id_product = id_product;
    this.product_count = product_count;
  }

  render() {
    return `<div class="cart-item cart-item-${this.id_product}" data-id="${this.id_product}" data-count="${this.product_count}">
              <div class="product-description">
                <h2 class="product-name">${this.product_name}(<span id="count" class="gradient-style">${this.product_count}</span>)</h2>
                <h3 class="product-price" id="totalPrice">${this.price * this.product_count}</h3>
              </div>
              <div class="cart-item-buttons">
                <button class="cart-item-btn-increase" data-idproduct="${this.id_product}"><i class="far fa-plus-square"></i></button>
                <button class="cart-item-btn-decrease" data-idproduct="${this.id_product}"><i class="far fa-minus-square"></i></button>
                <button class="cart-item-btn-delete" data-idproduct="${this.id_product}"><i class="far fa-trash-alt"></i></button>
              </div>
            </div>`;
  }
}

class ProductsCartList {
  constructor() {
    this.totalCartPrice = 0;
    this.cartList = {};
  }

  addToCart(id, product) {
    if (this.cartList[id]) {
      this.cartList[id].product_count++;
    } else {
      this.cartList[id] = product;
    }

    this.render();
  }

  increaseProduct(id) {
    this.cartList[id].product_count++;

    this.render();
  }

  decreaseProduct(id) {
    if (this.cartList[id].product_count == 1) {
      delete this.cartList[id];
    } else {
      this.cartList[id].product_count--;
    }

    this.render();
  }

  delete(id) {
    delete this.cartList[id];

    this.render();
  }

  render() {
    let cart = "";

    for (let id in this.cartList) {
      cart += this.cartList[id].render();
    }

    document.querySelector(".cart-body").innerHTML = cart;
    this.setDecreaseFromCartHandlers();
    this.setIncreaseFromCartHandlers();
    this.setDeleteFromCartHandlers();
  }

  setIncreaseFromCartHandlers() {
    let increaseButtons = document.querySelectorAll(".cart-item-btn-increase");
    increaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let product = document.querySelector(`.cart-item-${event.target.closest("button").dataset.idproduct}`);
        let productId = product.dataset.id;
        this.increaseProduct(productId);
      });
    });
  }

  setDecreaseFromCartHandlers() {
    let decreaseButtons = document.querySelectorAll(".cart-item-btn-decrease");
    decreaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let product = document.querySelector(`.cart-item-${event.target.closest("button").dataset.idproduct}`);
        let productId = product.dataset.id;
        this.decreaseProduct(productId);
      });
    });
  }

  setDeleteFromCartHandlers() {
    let deleteButtons = document.querySelectorAll(".cart-item-btn-delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let product = document.querySelector(`.cart-item-${event.target.closest("button").dataset.idproduct}`);
        let productId = product.dataset.id;
        this.delete(productId);
      });
    });
  }

  setAddToCartHandlers() {
    let addButtons = document.querySelectorAll(".addToCart");

    addButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let product = document.getElementById(event.target.closest("button").dataset.idproduct);
        let productId = product.dataset.id;
        let productName = product.dataset.productname;
        let productPrice = product.dataset.productprice;
        let productCount = product.dataset.productcount;
        let cartItem = new ProductsCartItem(productName, productPrice, productId, +productCount);

        this.addToCart(productId, cartItem);
      });
    });
  }
}

const init = async () => {
  let list = new ProductsList();
  let cartList = new ProductsCartList();

  await list.fetchProducts();
  list.render();

  cartList.setAddToCartHandlers();
};

window.onload = init;
