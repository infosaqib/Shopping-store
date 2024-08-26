let shoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let basket = JSON.parse(localStorage.getItem("record")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateCardItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id == id) || [];
        let { name, price, poster, img } = search;
        return `
          <div class="cart-item">
  <div class = "cartImages" style = "background: url(${poster}) no-repeat center;background-size: cover;">
            <img id="cart-img" src=${img} loading="lazy" alt="" />
</div>
            <div class="details">
              <div class="title-price-x">
                <h4 class="title-price">
                  <p>${name}</p>
                  <p class="card-item-price"> $ ${price}</p>
                </h4>
                <p class="x-btn" onclick="removeItem(${id})">x</p>
              </div>
              <div class="buttons">
          <img src="icons/dash-lg.svg" onclick="decrement(${id})" alt="">
            <div id=${id} class="quantity">
            ${item}
            </div>
          <img src="icons/plus-lg.svg" onclick="increment(${id})" alt="">
          </div> 
          <h3>Total:    $ ${item * search.price}</h3>
            </div>
          </div>
`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href='index.html'>
    <button class = 'homeBtn'> Back to Home</button>
    </a>
    `;
  }
};
generateCardItems();

let increment = (id) => {
  let selectedItem = { id: id };
  // let selectedItem = id;
  let search = basket.find((x) => x.id == selectedItem.id);
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

  generateCardItems();
  update(selectedItem.id);
  localStorage.setItem("record", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = { id: id };
  let search = basket.find((x) => x.id == selectedItem.id);

  if (search === undefined) return;
  else if (search.item == 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item != 0);
  generateCardItems();
  localStorage.setItem("record", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id == id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = { id: id };
  basket = basket.filter((x) => x.id != selectedItem.id);
  calculation();
  generateCardItems();
  totalAmount();
  localStorage.setItem("record", JSON.stringify(basket));
};


let totalAmount = () => {
  if (basket.length != 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id == id);

        return item * filterData.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    return (label.innerHTML = `
    <h2>Total bill: $ ${amount}</h2>
    <button class = "checkout">Checkout</button>
    <button onclick = "clearCart()" class = "clear">Clear cart</button>
    `);
  } else return;
};

totalAmount();

let clearCart = () => {
  basket = [];
  generateCardItems();
  calculation();
  localStorage.setItem("record", JSON.stringify(basket));
};


//! Images optimization
document.addEventListener("DOMContentLoaded", () => {
  let imgDivs = document.querySelectorAll(".cartImages");

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
