import * as Api from "../../api.js";

// 요소(element), input 혹은 상수
const productImageTag = document.querySelector(".bb2");
const brandTag = document.querySelector(".pd_brd");
const nameTag = document.querySelector(".pd_name");
const categoryTag = document.querySelector('.tag_category');
const descriptionTag = document.querySelector('.tag_name');


const productList = document.querySelector(".container");

checkUrlParams("num");
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllElements() {
  createNavbar();
  insertProductData();
}

// addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

async function insertProductData() {
  const { num } = getUrlParams();
  const product = await Api.get(`/api/products/${num}`);

  // 객체 destructuring
//   const {
//     brand,
//     name,
//     price,
//     size,
//     color,
//     category,
//     description,
//     img
//   } = product;


//   productImageTag.src = imageUrl;
//   titleTag.innerText = title;
//   detailDescriptionTag.innerText = detailDescription;
//   manufacturerTag.innerText = manufacturer;
//   priceTag.innerText = `${addCommas(price)}원`;


    const brand = product.brand;
    const name = product.name;
    const price = product.price;
    const img = product.img;
    const category = product.category;
    const description = product.description;
    const number = product.num;

    productList.insertAdjacentHTML(
      "beforeend",
      `
      <div class="box bb1"></div>
      <div class="box bb2">
        <img src=${img}>
      </div>
      <div class="box bb3">
        <p class="pd_brd">${brand}</p>
        <p class="pd_name">
        ${name}
        </p>
      </div>
      <div class="box bb4">
        
        <div class="tag_block">
          <a class="tag_category">${category}</a>
          <a class="tag_name">${description}</a>
        </div>
      </div>
      <div class="box bb5">
        <p>사이즈</p>
        <div class="size_block">
          <button id="content_box" class="size_s" type="button">S</button>
          <button id="content_box" class="size_m" type="button">M</button>
          <button id="content_box" class="size_l" type="button">L</button>
          <button id="content_box" class="size_xl" type="button">XL</button>
          <!-- <button id="content_box" class="size_xxl" type="button">XXL</button> -->
        </div>
      </div>
      <div class="box bb6">
        <span>{color/size}</span>
        <span class="counter">
          <button type="button" class="minus">-</button>
          <span class="count_num">1</span>
          <button type="button" class="plus">+</button>
        </span>
        <span class="price_li">11,111 원</span>
        <button class="delete">X</button>
      </div>
      <div class="box bb7">
        <span class="total_price_title">총가격</span>
        <span class="total_price">111,111원</span>
      </div>
      <div class="box bb8">
        <button class="button_buy" type="button">BUY NOW</button>
        <button class="button_cart" type="button">cart</button>
      </div>
      <div class="box bb9">추천상품 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima quae animi corrupti totam sint dolore facere ipsam adipisci voluptate optio, vero repellendus amet alias tempora aspernatur beatae, ut voluptatem autem?</div>
      <div class="box bb10">추천상품2</div>
      <div class="box bb11">추천상품3 lo</div>
      <div class="box bb12">추천상품4</div>
      <div class="box bb13">상품상세</div>
      <div class="box bb14">배송및반품</div>
      <div class="box bb15">리뷰</div>
      <div class="box bb16">리뷰2</div>
      <div class="box bb17">리뷰3</div>
      `
    );
  }

//   addToCartButton.addEventListener("click", async () => {
//     try {
//       await insertDb(product);

//       alert("장바구니에 추가되었습니다.");
//     } catch (err) {
//       // Key already exists 에러면 아래와 같이 alert함
//       if (err.message.includes("Key")) {
//         alert("이미 장바구니에 추가되어 있습니다.");
//       }

//       console.log(err);
//     }
//   });

//   purchaseButton.addEventListener("click", async () => {
//     try {
//       await insertDb(product);

//       window.location.href = "/order";
//     } catch (err) {
//       console.log(err);

//       //insertDb가 에러가 되는 경우는 이미 제품이 장바구니에 있던 경우임
//       //따라서 다시 추가 안 하고 바로 order 페이지로 이동함
//       window.location.href = "/order";
//     }
//   });
// }

// async function insertDb(product) {
//   // 객체 destructuring
//   const { _id: id, price } = product;

//   // 장바구니 추가 시, indexedDB에 제품 데이터 및
//   // 주문수량 (기본값 1)을 저장함.
//   await addToDb("cart", { ...product, quantity: 1 }, id);

//   // 장바구니 요약(=전체 총합)을 업데이트함.
//   await putToDb("order", "summary", (data) => {
//     // 기존 데이터를 가져옴
//     const count = data.productsCount;
//     const total = data.productsTotal;
//     const ids = data.ids;
//     const selectedIds = data.selectedIds;

//     // 기존 데이터가 있다면 1을 추가하고, 없다면 초기값 1을 줌
//     data.productsCount = count ? count + 1 : 1;

//     // 기존 데이터가 있다면 가격만큼 추가하고, 없다면 초기값으로 해당 가격을 줌
//     data.productsTotal = total ? total + price : price;

//     // 기존 데이터(배열)가 있다면 id만 추가하고, 없다면 배열 새로 만듦
//     data.ids = ids ? [...ids, id] : [id];

//     // 위와 마찬가지 방식
//     data.selectedIds = selectedIds ? [...selectedIds, id] : [id];
//   });
// }
