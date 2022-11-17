// import { checkLogin } from "../useful-functions.js";
import * as Api from "/api.js";

const section = document.querySelector('.title')
const product = document.querySelector('.product_name')
const userEmail = window.location.pathname.split("/")[2];
console.log(userEmail)
// checkLogin();
insertOrderListElement();

// let userData;
let orderLists = {}
async function insertOrderListElement(){
    // const userData = await Api.get('/api/user');
    // const {email} = userData;
    // console.log(email)
    const res = await fetch(`/api/myOrders/${userEmail}`);
    orderLists = await res.json();
    orderLists.forEach((orderList) =>{
        const name = orderList.products[0].name;
        const img = orderList.products[0].img;
        const orderNumber = orderList.orderNumber
        const num = orderList.products.length-1;
        const orderDate = orderList.createdAt.substr(0,10)
        const price = orderList.cost;
        const count = orderList.count;
        const status = orderList.status;
        section.insertAdjacentHTML(
            "afterend",
            `<div class="content">
            <div class="first">
              <img class="product_img" src="${img}"/>
              <div class="product_script">
                <p class="product_name">
                  상품명 : ${name} 외 ${num}
                </p>
                <div class="order_number">주문 번호 : ${orderNumber}</div>
                <div class="order_date">주문 일자 : ${orderDate}</div>
              </div>
            </div>
            <div class="product_price">
              ${price}원<br />
              (${count}개)
            </div>
            <div>${status}</div>
          </div>`
        )
    })
}   