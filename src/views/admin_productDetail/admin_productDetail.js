import * as Api from "/api.js";

const productId = window.location.pathname.split("/")[3];

let product = {};
const ref = {
  sizeBlockTag: document.querySelector(".size_block"),
  sizeTag: document.querySelector("selectBox"),
  productImageTag: document.querySelector(".bb2"),
  brandTag: document.querySelector(".pd_brd"),
  nameTag: document.querySelector(".pd_name"),
  categoryTag: document.querySelector(".tag_category"),
  descriptionTag: document.querySelector(".tag_name"),
  priceTag: document.querySelector(".price_li"),

  addButtonTag: document.querySelector(".pd_add"),
  updateButtonTag: document.querySelector(".pd_fix"),
  deleteButtonTag: document.querySelector(".pd_delete")
};
const body = document.querySelector(".body");

const drawProduct = async () => {
  ref.productImageTag.setAttribute("src", product.img);
  ref.brandTag.innerHTML = product.brand;
  ref.nameTag.innerHTML = product.name;
  ref.categoryTag.innerHTML = product.category;
  ref.descriptionTag.innerHTML = product.description;
  ref.priceTag.innerHTML = product.price;
  // TODO] 사이즈 및 색상 추가 해야됨

  const name = ref.nameTag.innerHTML;
  const brand = ref.brandTag.innerHTML;
  const price = ref.priceTag.innerHTML;
  const category = ref.categoryTag.innerHTML;
  // TODO] 사이즈 및 색상 추가 해야됨
};

function addProduct() {
  window.location.assign("/products");
}

function moveToadminProductUpdate() {
  location.href = `/adminProductDetail/${productId}/updateProduct`
}

async function deleteProduct() {
  const value = confirm("진짜 삭제하시겠습니까?");

  if (value === true) {
    try {
      await Api.delete("/api/products", productId);

      alert("상품이 삭제되었습니다.");
      window.location.href = "/";
    } catch (err) {
      next(err);
    }
  }
}

ref.addButtonTag.addEventListener("click", addProduct);
ref.updateButtonTag.addEventListener("click", moveToadminProductUpdate);
ref.deleteButtonTag.addEventListener("click", deleteProduct);

const render = () => {
  drawProduct();
};

const initialize = async () => {
  const res = await fetch(`/api/productDetail/${productId}`);

  product = await res.json();
  product = product.data
};

window.addEventListener("load", () => {

  console.log()
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
      <ul class="header_right" id="admin">
        <li id="header_addProduct">
        <a href="/products">
          ADD-PRODUCT
        </a>  
      </li>
    <li id="header_mypage">
      <a href="/admin">
        ADMIN-PAGE
      </a>  
    </li>
    <li id="header_logout">
      <a href="/#" id="logout1">
        LOG OUT
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
});

initialize().then(() => render());