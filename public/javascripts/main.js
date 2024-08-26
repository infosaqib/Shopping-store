let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("record")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, poster, img, price } = x;

      let search = basket.find((y) => y.id == id) || [];
      return `
      <div id=product-id-${id} class="item">
      <div class = "productImg" style = "background: url(${poster}) no-repeat center;background-size: cover;">
      <img src=${img} alt="${name}" >
      </div>
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price">
          <h2>$ ${price} </h2>
          <div class="buttons">
          <img src="/assets/icons/dash-lg.svg" onclick="decrement(${id})" alt="">
            <div id=${id} class="quantity">
            ${search.item === undefined ? 0 : search.item}
</div>
          <img src="/assets/icons/plus-lg.svg" onclick="increment(${id})" alt="">
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = { id: id };
  // let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  // "search" will search if the selected item is exist in basket or not

  if (search === undefined) {
    //if item doesn't exist, then push the object
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1; //if item is exist, then increment its value
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("record", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = { id: id };
  // let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  localStorage.setItem("record", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

//! Images optimization
document.addEventListener("DOMContentLoaded", () => {
  let imgDivs = document.querySelectorAll(".productImg");

  imgDivs.forEach((div) => {
    let img = div.querySelector("img");

    function loaded() {
      div.classList.add('loaded')
    }

    if (img.complete) {
      loaded();
    } else {
      img.addEventListener("load", loaded);
    }
  });
});
