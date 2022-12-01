import { checkLogin } from "../useful-functions.js";
import * as Api from "/api.js";

const section = document.querySelector(".title");

checkLogin();

const userData = await Api.get("/api/user");

let orderLists = {};
let reviewLists = {};
let ref = {};

const initialize = async () => {
  const orders = await Api.get("/api/myOrders", userData.email);
  const reviews = await Api.get("/api/mypage/myPageReview", userData.email);

  orderLists = orders;
  reviewLists = reviews;
};

async function getReviewList() {
  await orderLists.forEach((orderList) => {
    for (let i = 0; i < orderList.products.length; i++) {
      const product = orderList.products[i];

      const orderNo = orderList.orderNumber;
      const productNo = product.num;
      const img = product.img;
      const name = product.name;
      const size = product.selectSize;
      const color = product.selectColor;
      const price = product.price;
      const review = reviewLists.find(
        (e) => e.orderNo === orderNo && e.productNo === productNo
      );

      const createBtn = `reviewCreateBtn${orderNo}-${productNo}`;
      const reviewContent = `reviewContent${orderNo}-${productNo}`;
      const deleteBtn = `reviewDeleteBtn${orderNo}-${productNo}`;

      let html = ``;

      if (review !== undefined) {
        html = `
          <p>${review.review}</p>
          <button class="${deleteBtn}">삭제하기</button>
        `;
      } else {
        html = `
          <input class="${reviewContent}" type="text" placeholder="내용을 작성해주세요." required />
          <button class="${createBtn}" >글쓰기</button>
        `;
      }

      section.insertAdjacentHTML(
        "afterend",
        `<div class="content">
          <div id="${orderNo}-${productNo}" class="first">
            <img class="product_img" src="${img}"/>
            <div class="product_script">
              <p class="product_name">
              상품명 : ${name}
              </p>
              <p class="product_name">[사이즈 : ${size}, 색상 : ${color}]</p>
            </div>
          </div>
            <div class="product_price">
            가격 : ${price}원 <br>
            ${productNo}(개)
            </div>
            <div class="product_review">${html}</div>
        </div>`
      );

      if (review !== undefined) {
        ref[deleteBtn] = document.querySelector(`.${deleteBtn}`);

        ref[deleteBtn].addEventListener("click", (event) =>
          deleteReview(event, orderNo, productNo)
        );
      } else {
        ref[createBtn] = document.querySelector(`.${createBtn}`);
        ref[reviewContent] = document.querySelector(`.${reviewContent}`);

        ref[createBtn].addEventListener("click", (event) =>
          addReview(event, orderNo, productNo)
        );
      }
    }
  });
}

async function addReview(e, orderNo, productNo) {
  e.preventDefault();

  const tagName = `reviewContent${orderNo}-${productNo}`;
  const review = ref[tagName].value;

  try {
    const data = {
      orderNo: orderNo,
      productNo: productNo,
      userId: userData.email,
      review: review,
    };

    const result = await Api.post(`/api/mypage/myPageReview`, data);

    if (result) {
      alert(`후기가 성공적으로 등록되었습니다!`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function deleteReview(e, orderNo, productNo) {
  e.preventDefault();

  try {
    const data = {
      orderNo: orderNo,
      productNo: productNo,
      userId: userData.email,
    };

    const result = await Api.delete(`/api/mypage/myPageReview`, "", data);

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
  getReviewList();
};

initialize().then(() => render());
