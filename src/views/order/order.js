import * as Api from "../api.js";
// import { addCommas, checkLogin } from "../useful-functions";

let cart = JSON.parse(localStorage.getItem("orderProducts"));
console.log(cart);
insertOrderElement();

async function insertOrderElement() {
  let cost = 0;
  cart.forEach((product) => {
    const orderForm = document.querySelector(".total");
    const _id = product._id;
    const name = product.name;
    const price = product.totalPrice;
    const img = product.img;
    const size = product.selectSize;
    const color = product.selectColor;
    const category = product.category;
    const description = product.description;
    const count = product.totalCount;
    const num = product.num;
    const quantity = product.quantity;
    console.log(product);
    orderForm.insertAdjacentHTML(
      "beforeend",
      `
    <div class="product">
      <img class="box" src="${img}"></img>
      <div class="info">
        <ul class="productInfo">
            <li id="name">
                ${name}
            </li>
            <li id="color">
                color: 
                <div>
                    ${color}
                </div>
            </li>
            <li id="size">
                size:
                <div>
                    ${size}
                </div>
            </li>
            <li id="count">
                count:
                <div>
                    ${count}
                </div>
            </li>
            <li id="price">
                price:
                <div>
                    ${price}
                </div>
            </li>
        </ul>
      </div>
    `
    );
    cost += parseInt(price.replace(/(,|개|원)/g, ""));
  });
  const totalPrice = document.querySelector(".AllPrice");
  totalPrice.innerHTML = cost;
  document.querySelector(".totalCount").innerHTML = cart.length;
}
document.querySelector(".payButton").addEventListener("click", handleSubmit);
async function handleSubmit(e) {
  e.preventDefault();
  let payments = document.getElementsByName("payment");
  let payment = null; // 체크된 값(checked value)
  //const submitBtn = document.querySelector("#submitButton");
  for (let i = 0; i < payments.length; i++) {
    if (payments[i].checked == true) {
      payment = payments[i].value;
    }
  }
  const check = confirm("결제 진행 하시겠습니까?");

  if (check) {
    try {
      const orderNumber = Number(
        String(Date.now()) + String(Math.random() * 1000000000)
      );
      const payMethod = payment;
      const products = cart;

      const cost = parseInt(document.querySelector(".AllPrice").innerHTML);
      // orderProducts.forEach((product) => {
      //   costs.push(convertToNumber(product.price));
      // });
      // const cost = addCommas(costs.reduce((a, b) => a + b));
      // console.log(cost);

      const count = cart.length;
      const data = { orderNumber, products, cost, count, payMethod };
      const result = await Api.post("/api/orders", data);
      console.log(result);
      if (result) {
        window.location.href = "/mypage";
      }
    } catch (err) {
      console.error(err.stack);
      alert(`${err.message}`);
    }
  } else {
  }
}
