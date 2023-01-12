// import { productService } from "../../services";

let cart = JSON.parse(localStorage.getItem("products"));
// 데이터를 받아 요소를 만든 후, html에 삽입

insertOrderElement();
funcTotalPrice();
funcTotalAmount();
async function insertOrderElement() {
  cart.forEach((product) => {
    const orderForm = document.querySelector(".content_box");
    const _id = product._id;
    const name = product.name;
    const price = product.price;
    const img = product.img;
    const size = product.selectSize;
    const color = product.selectColor;
    const category = product.category;
    const description = product.description;
    const num = product.num;
    const quantity = product.quantity;

    orderForm.insertAdjacentHTML(
      "beforeend",
      `
      
      <div class="content">
        <div class="first ${_id}">
          <img class="product_img" src="${img}" id="image${_id}"/>
        </div> 
        <div class="product_box">
          <p class="product_name">
            상품명 : ${name}
          </p>
          <p class="product_size">
              사이즈 : ${size}
          </p>
          <p class="product_color">
              색상 : ${color}
          </p>
        </div>
        <div>
        </div>

        <div class="productPrice">
          <button class="button minus" id="minus-${_id}">-</button>
          <input class="input" 
            id="quantityInput-${_id}" 
           type="number" 
            min=1 
            max=99
            value="1"/>
             <button class="button plus" id="plus-${_id}">+</button>
              <p class=initial-${_id}>${price}</p>
              <div class="price-${_id}">${price}</div>
             
        </div>

          <div class="status">
           <button class="delete-button" id="delete-${_id}">delete
           </button>
          </div> 
      </div>
        
      `
    );

    document.querySelector(`#delete-${_id}`).addEventListener("click", () => {
      deleteItem(_id);
      window.location.assign("/mypage/myPageCart");
    });

    document.querySelector(`#plus-${_id}`).addEventListener("click", () => {
      if (
        parseInt(document.querySelector(`#quantityInput-${_id}`).value) < 99
      ) {
        increaseItemQuantity(_id);
        funcTotalPrice();
      }
    });

    document.querySelector(`#minus-${_id}`).addEventListener("click", () => {
      if (parseInt(document.querySelector(`#quantityInput-${_id}`).value) > 1) {
        decreaseItemQuantity(_id);
        funcTotalPrice();
      }
    });
    document
      .querySelector(`#quantityInput-${_id}`)
      .addEventListener("change", () => handleQuantityInput(_id));
  });
}
async function increaseItemQuantity(_id) {
  // indexedDB의 cart 데이터 업데이트
  let perPrice = document.querySelector(`.initial-${_id}`).innerHTML;
  let amount = ++document.querySelector(`#quantityInput-${_id}`).value;
  let totalPrice = document.querySelector(`.price-${_id}`).innerHTML;
  //prPrice는 , 뺀 값
  totalPrice = parseInt(perPrice.replace(/(,|개|원)/g, "")) * amount;

  document.querySelector(`.price-${_id}`).innerHTML = totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return;
}

// 수량 변경박스(-버튼, 입력칸, +버튼) 상태 업데이트
async function decreaseItemQuantity(_id) {
  let perPrice = document.querySelector(`.initial-${_id}`).innerHTML;
  let amount = --document.querySelector(`#quantityInput-${_id}`).value;

  let totalPrice = document.querySelector(`.price-${_id}`).innerHTML;
  totalPrice = parseInt(perPrice.replace(/(,|개|원)/g, "")) * amount;
  document.querySelector(`.price-${_id}`).innerHTML = totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return;
}
async function funcTotalPrice() {
  let totalPrice = 0;
  cart.forEach((product) => {
    const _id = product._id;
    let pPrice = document.querySelector(`.price-${_id}`).innerHTML;
    totalPrice = totalPrice + parseInt(pPrice.replace(/(,|개|원)/g, ""));
  });
  document.querySelector(".totalPrice").innerHTML = totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
async function deleteItem(_id) {
  const btn = document.querySelector(`#delete-${_id}`);
  const deleteForm = btn.parentNode.parentNode;
  document.querySelector(".content_box").removeChild(deleteForm);
  const cleanStorage = cart.filter(function (x) {
    return x._id !== _id;
  });

  cart = cleanStorage;
  localStorage.setItem("products", JSON.stringify(cart));
}

async function moveToOrder() {
  let a = [];
  cart.forEach((item, i) => {
    const id = item._id;
    const newPrice = document.querySelector(`.price-${id}`).innerHTML;
    const newCount = document.querySelector(`#quantityInput-${id}`).value;

    item.totalPrice = newPrice;
    item.totalCount = newCount;

    a.push(item);

    localStorage.setItem("orderProducts", JSON.stringify(a));
  });

  location.href = "/order";
}

document.querySelector(".payNow").addEventListener("click", moveToOrder);

async function funcTotalAmount() {
  document.querySelector(".totalAmount").innerHTML = cart.length;
}
