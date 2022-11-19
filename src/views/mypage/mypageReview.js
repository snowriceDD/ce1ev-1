import { checkLogin } from "../useful-functions.js";
import * as Api from "/api.js";

const section = document.querySelector('.content')

checkLogin();

const userData = await Api.get("/api/user");

/*

const product = document.querySelector('.product_name')
*/

let reviewLists = {}

const initialize = async () => {
  const reviews = await Api.get('/api/mypage/myPageReview', userData.email);

  //reviewLists = await reviews.json();
  reviewLists = reviews;
};

async function getReviewList(){
  reviewLists.forEach((reviewList) =>{
    const reviewNo = reviewList.reviewNo;
    const productNo = reviewList.productNo;
    const review = reviewList.review;
    section.insertAdjacentHTML(
      "afterend",
      `<div class="content">
            <div class="first">
              <!--<img class="product_img" src=""/>-->
              <div class="product_script">
                <p class="product_name">
                  상품명 : ${reviewNo}
                </p>
                <div class="order_number">상품 : ${productNo}</div>
                <div class="order_date">후기 : ${review}</div>
              </div>
            </div>
            <div class="product_price">
              0원<br />
              (0개)
            </div>
            <div>0</div>
          </div>`
    )
  })
}

const render = () => {
  getReviewList();
};

initialize().then(() => render());