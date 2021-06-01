class GoodsItem {
  constructor(goodsName, goodsPrice, goodsId) {
    this.goodsName = goodsName;
    this.goodsPrice = goodsPrice;
    this.goodsId = goodsId;
  }

  render() {
    return `<div class="goods-item">
                <img clas="goods-foto" src="https://picsum.photos/100?random=${Math.random()}">
                <div class='goods-description'>
                    <div class='goods-content'>
                        <h3>${this.goodsName}</h3>
                        <p>${this.goodsPrice}</p>
                    </div>
                    <button id='addToCart'><i class="far fa-plus-square"></i></button>
                </div>
        </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.totalPrice = 0;
  }

  fetchGoods() {
    this.goods = [
      { goodsName: "Shirt", goodsPrice: 150 },
      { goodsName: "Socks", goodsPrice: 50 },
      { goodsName: "Jacket", goodsPrice: 350 },
      { goodsName: "Shoes", goodsPrice: 250 },
    ];
  }

  totalGoodsPrice() {
    for (let i = 0; i < this.goods.length; i++) {
      this.totalPrice += this.goods[i].goodsPrice;
    }
    return this.totalPrice;
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.goodsName, good.goodsPrice);
      listHtml += goodItem.render();
      document.querySelector(".goods-list").innerHTML = listHtml;
    });
  }
}

class GoodsCartList {
  constructor() {
    this.cartGoods = [];
    this.totalCartPrice = 0;
  }

  addToCart() {
    return;
  }

  removeFromCart() {
    return;
  }

  totalCartPrice() {
    for (let i = 0; i < this.cartGoods.length; i++) {
      this.totalCartPrice += this.cartGoods[i].goodsPrice;
    }
    return this.totalCartPrice;
  }
}

class GoodsCartItem {
  constructor(goodsName, goodsPrice, goodsId, goodsCount = 1) {
    this.goodsName = goodsName;
    this.goodsPrice = goodsPrice;
    this.goodsId = goodsId;
    this.goodsCount = goodsCount;
  }

  increaseGoods() {
    this.goodsCount += 1;
  }

  decreaseGoods() {
    this.goodsCount -= 1;
  }

  deleteGoods() {
    return;
  }
}

const init = () => {
  const list = new GoodsList();
  list.fetchGoods();
  list.render();

  totalPrice = list.totalGoodsPrice();
  console.log(totalPrice);
};

window.onload = init;
