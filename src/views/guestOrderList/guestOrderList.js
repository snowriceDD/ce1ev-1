// import { checkLogin } from "../useful-functions.js";
import * as Api from "/api.js";

const section = document.querySelector(".title");
const product = document.querySelector(".product_name");
const orderNumber = window.location.pathname.split("/")[2];
const innerStatus = document.querySelector(".status");
console.log(orderNumber)
// checkLogin();
insertOrderListElement();

// let userData;
let orderLists = {};
async function insertOrderListElement() {
  // const userData = await Api.get('/api/user');
  // const {email} = userData;
  // console.log(email)
  const res = await fetch(`/api/orders/${orderNumber}`);
  orderLists = await res.json();
  const orderList = orderLists.products
  
      orderList.forEach((productList) => {
        const name = productList.name;
        const img = productList.img;
        const orderNumber = orderLists.orderNumber;
        const num = productList.totalCount;
        const orderDate = productList.updatedAt.substr(0, 10);
        const price = productList.totalPrice;
        const status = orderLists.status;
        section.insertAdjacentHTML(
          "afterend",
          `<div class="content">
              <div class="first">
                <img class="product_img" src="${img}"/>
                <div class="product_script">
                  <p class="product_name">
                    상품명 : ${name}
                  </p>
                  <div class="order_number">주문 번호 : ${orderNumber}</div>
                  <div class="order_date">주문 일자 : ${orderDate}</div>
                </div>
              </div>
              <div class="product_price">
                ${price}원<br />
                (${num}개)
              </div>
              <div class="status">${status}</div>
            </div>`
        );
    });
}
