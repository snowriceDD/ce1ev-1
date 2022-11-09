// import { name } from "ejs";

// import * as Api from "/api.js";

window.onload = () => {
  body.insertAdjacentHTML(
    "afterBegin",
    `
    <header class="header">
      <div class="header_logo">
        <a href="/">
          Ce1ev.
        </a>
      </div>
      <ul class="search">
        <li>
          <input type="text" placeholder="검색어를 입력하세요." class="header_search" id="text" />
          <button type="button">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </li>
      </ul>
      <ul class="header_right" id="loginBox">
        <li id="header_login">
            <a href="/login">
                LOGIN
            </a>
        </li>
        <li id="header_wish">
            <a href="/register">
              REGISTER
            </a>
        </li>
        <li id="header_cart">            
            <a href="/guest">
                GUEST
            </a>
        </li>
      </ul>
    </header>
    `
  );

  body.insertAdjacentHTML(
    "beforeEnd",
    `
  <footer class="footer">
  <address class="address_left">
    <ul class="addressLink">
      <li>
        <a href="/" id="footer_logo">
          Ce1ev.
        </a>
      </li>
      <li>
        <a href="#">개인정보 취급방침</a>
      </li>
      <li>
        <a href="#">이용약관</a>
      </li>
    </ul>

    <div class="addressText">
      <p>셀레브 주식회사 · 대표 김원송 사업자등록번호 : 000-00-00000</p>
      <p>
        사업장소재지 : 경기도 성남시 분당구 분당내곡로 131 판교테크원 타워1, 8층
      </p>
      <p>ⓒ CELEV. Corp.</p>
    </div>
  </address>
  <address class="address_right">
    <p>
      <strong style="font-size: 20px; font-weight: 600">
        고객센터 1588-0000
      </strong>
    </p>
    <p>
      운영시간 평일 11:00 - 18:00 (토∙일, 공휴일 휴무)
      <br />
      점심시간 평일 13:00 - 14:00
      <br />
      1:1 문의하기는 앱에서만 가능합니다.
    </p>
  </address>
</footer>
  `
  );
};
const ref = {
  sizeBlockTag: document.querySelector(".size_block"),
  sizeTag: document.querySelector("selectBox"),
  buyButttonTag: document.querySelector(".button_buy"),
  cartButtonTag: document.querySelector(".button_cart"),
  productImageTag: document.querySelector(".bb2"),
  brandTag: document.querySelector(".pd_brd"),
  nameTag: document.querySelector(".pd_name"),
  categoryTag: document.querySelector(".tag_category"),
  descriptionTag: document.querySelector(".tag_name"),
  priceTag: document.querySelector(".total_price"),
};
const productId = window.location.pathname.split("/")[2];
let product = {};
let selectSize = "";

//상품상세페이지 구현
const drawProduct = async () => {
  ref.productImageTag.setAttribute("src", product.img);
  ref.brandTag.innerHTML = product.brand;
  ref.nameTag.innerHTML = product.name;
  ref.categoryTag.innerHTML = product.category;
  ref.descriptionTag.innerHTML = product.description;
  ref.priceTag.innerHTML = product.price;
  // [product.size].forEach((size)=>{
  //     sizeBlockTag.insertAdjacentHTML(
  //         "beforeend",
  //         `
  //         <button id="content_box" class="size" type="button">${size}</button>
  //         `
  //     )
  // });
  const name = ref.nameTag.innerHTML;
  const brand = ref.brandTag.innerHTML;
  const price = ref.priceTag.innerHTML;
  // const size =
  // const color =
  const category = ref.categoryTag.innerHTML;

  const data = {
    name,
    brand,
    price,
    // size,
    // color,
    category,
  };
  const result = await fetch("/api/selectedProducts", data);
  console.log(result);
};
//localStorage 저장하기
const addCart = () => {
  ref.cartButtonTag.addEventListener("click", () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    location.href = "/mypage/myPageCart";
  });
};
async function insertSizeList() {}
//함수 실행
const render = () => {
  drawProduct();
  addCart();
};

const initialize = async () => {
  const res = await fetch(`/api/productDetail/${productId}`);
  product = await res.json();
  console.log(product);
};
initialize().then(() => render());
ref.buyButttonTag.addEventListener("click", () => (location.href = `/order`));

// Header&Footer
const body = document.querySelector(".body");
