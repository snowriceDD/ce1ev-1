// import { productService } from "../../services";

let cart = JSON.parse(localStorage.getItem("products"));
// 데이터를 받아 요소를 만든 후, html에 삽입

insertOrderElement();
funcTotalPrice();
async function insertOrderElement() {
  cart.forEach((product) => {
    const orderForm = document.querySelector(".content_box");
    const _id = product._id;
    const name = product.name;
    const price = product.price;
    const img = product.img;
    const category = product.category;
    const description = product.description;
    const num = product.num;
    const quantity = product.quantity;
    console.log(img);
    orderForm.insertAdjacentHTML(
      "beforeend",
      `
      
      <div class="content">
        <div class="first ${_id}">
          <img class="product_img" src="${img}" id="image${_id}"/>
        </div> 
        <p class="product_name">
          상품명 : ${name}
        </p>
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
             <div class="price-${_id}">
               ${price}
             </div>
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
    });

    // document
    //   .querySelector(`#image-${_id}`)
    //   .addEventListener("click", window.location.assign("/"));

    // document
    //   .querySelector(`#title-${_id}`)
    //   .addEventListener("click", window.location.assign(`/productDetail/${num}`));

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
  console.log(_id);
  // indexedDB의 cart 데이터 업데이트
  let perPrice = document.querySelector(`.initial-${_id}`).innerHTML;
  let amount = ++document.querySelector(`#quantityInput-${_id}`).value;
  let totalPrice = document.querySelector(`.product_price-${_id}`).innerHTML;
  //prPrice는 , 뺀 값
  totalPrice = parseInt(perPrice) * amount;

  document.querySelector(`.product_price-${_id}`).innerHTML = totalPrice;
  // this.funcTotalPrice();
  return;
}

// 수량 변경박스(-버튼, 입력칸, +버튼) 상태 업데이트
async function decreaseItemQuantity(_id) {
  let perPrice = document.querySelector(`.initial-${_id}`).innerHTML;
  let amount = --document.querySelector(`#quantityInput-${_id}`).value;

  let totalPrice = document.querySelector(`.product_price-${_id}`).innerHTML;
  totalPrice = parseInt(perPrice) * amount;
  document.querySelector(`.product_price-${_id}`).innerHTML = totalPrice;
  // this.funcTotalPrice()
  return;
}
async function funcTotalPrice() {
  // const allPrice = document.querySelector('.totalPrice').innerHTML;
  // console.log(allPrice)
  let totalPrice = 0;
  cart.forEach((product) => {
    const _id = product._id;
    let pPrice = document.querySelector(`.product_price-${_id}`).innerHTML;
    console.log(pPrice);
    totalPrice = totalPrice + parseInt(pPrice);
  });
  document.querySelector(".totalPrice").innerHTML = totalPrice;
}
// console.log(Object.)
async function deleteItem(_id) {
  const btn = document.querySelector(`#delete-${_id}`);
  const deleteForm = btn.parentNode.parentNode;
  document.querySelector(".content").removeChild(deleteForm);
  const cleanStorage = cart.filter(function (x) {
    console.log(x);
    return x._id !== _id;
  });

  console.log(cleanStorage);
  cart = cleanStorage;
  localStorage.setItem("products", JSON.stringify(cart));
}

async function funcTotalAmount(_id) {
  document.querySelector("totalAmount").innerHTML;
}
// 수량 변경박스(-버튼, 입력칸, +버튼) 상태 업데이트
