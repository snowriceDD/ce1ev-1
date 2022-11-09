// import * as Api from "../api";
const sizeBlockTag = document.querySelector(".size_block");
const sizeTag = document.querySelector("size");
const buyButttonTag = document.querySelector(".button_buy");
const cartButtonTag = document.querySelector(".button_cart");
const productImageTag = document.querySelector(".bb2");
const brandTag = document.querySelector(".pd_brd");
const nameTag = document.querySelector(".pd_name");
const categoryTag = document.querySelector(".tag_category");
const descriptionTag = document.querySelector(".tag_name");
const priceTag = document.querySelector(".total_price");

const productId = window.location.pathname.split("/")[2];
let product = {};
let selectSize = "";

const drawProduct = async () => {
  const res = await fetch(`/api/productDetail/${productId}`);
  product = await res.json();
  productImageTag.setAttribute("src", product.img);
  brandTag.innerHTML = product.brand;
  nameTag.innerHTML = product.name;
  categoryTag.innerHTML = product.category;
  descriptionTag.innerHTML = product.description;
  priceTag.innerHTML = product.price;
  console.log(product.size);

  buyButttonTag.addEventListener("click", () => (location.href = `/order`));

  // 제품 데이터 로컬에 담기

  localStorage.setItem("product", JSON.stringify(product));
  cartButtonTag.addEventListener(
    "click",
    () => (location.href = "/mypage/myPageCart")
  );

  // [product.size].forEach((size)=>{
  //     sizeBlockTag.insertAdjacentHTML(
  //         "beforeend",
  //         `
  //         <button id="content_box" class="size" type="button">${size}</button>
  //         `
  //     )
  // });
};
// product.size.forEach((a)=>{
//     const sizeselect = product.size;
drawProduct();

const body = document.querySelector(".body");

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
