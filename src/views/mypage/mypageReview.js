import { checkLogin } from "../useful-functions.js";
import * as Api from "/api.js";

const section = document.querySelector('.content')

checkLogin();

const userData = await Api.get("/api/user");

let orderLists = {}
let reviewLists = {}

const initialize = async () => {
  const orders = await Api.get('/api/myOrders', userData.email);
  const reviews = await Api.get('/api/mypage/myPageReview', userData.email);

  orderLists = orders;
  reviewLists = reviews;
};

async function getReviewList(){
  await orderLists.forEach((orderList) => {
    for(let i=0; i<orderList.products.length; i++) {
      const product = orderList.products[i]

      const productNo = product.num;
      const img = product.img;
      const name = product.name;
      const size = product.selectSize;
      const color = product.selectColor;
      const price = product.price;
      const review = reviewLists.find((e) => e.orderNo === orderList.orderNumber && e.productNo === productNo);

      let html = ``;

      if (review !== undefined) {
        html = `
          <p>${review.review}</p>
          <button class="deleteReview">삭제하기</button>
        `;
      } else {
        html = `
          <input class="reviewContent" type="text" placeholder="내용을 작성해주세요." required />
          <button class="reviewCreateBtn" >글쓰기</button>
        `;
      }

      section.insertAdjacentHTML(
        "afterend",
        `<div class="content">
          <div class="first">
            <img class="product_img" src="${img}"/>
            <div class="product_script">
              <p class="product_name">상품 명 : ${name}</p>
              <p class="product_name">[사이즈 : ${size}, 색상 : ${color}]</p>
              <p class="product_name">가격 : ${price}</p>
            </div>
            <div>
              ${html}
            </div>
          </div>
        </div>`
      )
    }
  })
}

async function addReview(e) {
  e.preventDefault();

  console.log('do')
  const review = reviewContentTag.value;

  /*
  try {
    const data = { orderNo: review, userId: userData.email };

    const result = await Api.post(`/api/productDetail/${productId}`, data);

    if (result) {
      alert(`후기가 성공적으로 등록되었습니다!`);
      window.location.href = `/productDetail/${productId}`;
    }

  } catch (err) {
    console.log(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  } */
}

//reviewCreateBtn.addEventListener("click", addReview);

const render = () => {
  getReviewList().then(() => {
    //reviewCreateBtn.addEventListener("click", addReview);
  })
};

initialize().then(() => render());

window.onload = function () {
  console.log('as')
  const reviewContentTag = document.querySelector(".reviewContent")
  const reviewCreateBtn = document.querySelector(".reviewCreateBtn")

  console.log('as')

  reviewCreateBtn.addEventListener("click", addReview);

  console.log('as')
}