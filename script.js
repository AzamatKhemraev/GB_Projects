const goods = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
];

const renderGoodsItem = (title, price) => {
  return `<div class="goods-item">
            <img clas="good-foto" src="https://picsum.photos/100?random=${Math.random()}">
            <h3>${title}</h3>
            <p>${price}</p>
        </div>`;
};

const renderGoodsList = (list = goods) => {
  let goodsList = list.map((item) => renderGoodsItem(item.title, item.price));

  goodsList.forEach((element) => {
    document.querySelector(".goods-list").innerHTML += element;
  });
  //   document.querySelector(".goods-list").innerHTML = goodsList;
};

const init = () => {
  renderGoodsList(); //если в renderGoodsList не передать список/массив, то поумолчанию будет использован список goods
};

window.onload = init;
