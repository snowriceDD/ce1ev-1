import { checkAdmin } from "../useful-functions.js";
import * as Api from "/api.js";

const section = document.querySelector('.content')

checkAdmin();

let orderLists = {}
let reviewLists = {}
let ref = {}

const initialize = async () => {
  const orders = await Api.get('/api/orderlist/all');
  const reviews = await Api.get('/api/admin/adminReview-review');

  orderLists = orders;
  reviewLists = reviews;
};

async function getReviewList(){
  await reviewLists.forEach((reviewList) => {
    const reviewNo = reviewList.reviewNo;
    const orderNo = reviewList.orderNo;
    const productNo = reviewList.productNo;
    const userId = reviewList.userId;
    const review = reviewList.review;

    const order = orderLists.find((e) => e.orderNumber === orderNo).products;
    const productImg = order.find((e) => e.num === productNo).img;
    const productName = order.find((e) => e.num === productNo).name;
    const productColor = order.find((e) => e.num === productNo).selectColor;
    const productSize = order.find((e) => e.num === productNo).selectSize;
    const productPrice = order.find((e) => e.num === productNo).price;

    const reviewContent = `reviewContent${orderNo}-${productNo}`;
    const deleteBtn = `reviewDeleteBtn${orderNo}-${productNo}`;

    section.insertAdjacentHTML(
      "afterend",
      `<div class="content">
        <div id="${orderNo}-${productNo}">
          <img class="product_img" src="${productImg}"/>
          <div class="product_script">
            <p class="product_name">상품 명 : ${productName}</p>
            <p class="product_name">[사이즈 : ${productSize}, 색상 : ${productColor}]</p>
            <p class="product_name">가격 : ${productPrice}</p>
          </div>
          <div>
            <p>리뷰 번호: ${reviewNo}</p>
            <p>주문 번호: ${orderNo}</p>
            <p>고객 이메일: ${userId}</p>
            <p>후기 내용: ${review}</p>
            <button class="${deleteBtn}">삭제하기</button>
          </div>
        </div>
      </div>`
    )

    ref[deleteBtn] = document.querySelector(`.${deleteBtn}`);

    ref[deleteBtn].addEventListener("click", (event) => deleteReview(event, orderNo, productNo, userId));
  })
}

async function deleteReview(e, orderNo, productNo, userId) {
  e.preventDefault();

  try {
    const data = { orderNo: orderNo, productNo: productNo, userId: userId };

    const result = await Api.delete(`/api/mypage/myPageReview`, '', data);

    if (result) {
      alert(`후기가 성공적으로 삭제되었습니다!`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

const render = () => {
  getReviewList()
};

initialize().then(() => render());