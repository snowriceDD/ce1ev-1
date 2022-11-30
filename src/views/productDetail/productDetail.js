// import { name } from "ejs";
// import { convertToNumber } from "../useful-functions.js";
import * as Api from "/api.js";
const productEdit = document.querySelector(".product_edit");
const deleteButton = document.querySelector(".product_delete");

function moveToadminProductUpdate() {
  window.location.assign("/updateProduct");
}

const productId = window.location.pathname.split("/")[2];

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

deleteButton.addEventListener("click", deleteProduct);
productEdit.addEventListener("click", moveToadminProductUpdate);

const ref = {
  sizeBlockTag: document.querySelector(".size_block"),
  sizeTag: document.querySelector("#sizeTag"),
  colorTag: document.querySelector("#colorTag"),
  buyButttonTag: document.querySelector(".button_buy"),
  cartButtonTag: document.querySelector(".button_cart"),
  productImageTag: document.querySelector(".bb2"),
  brandTag: document.querySelector(".pd_brd"),
  nameTag: document.querySelector(".pd_name"),
  categoryTag: document.querySelector(".tag_category"),
  descriptionTag: document.querySelector(".tag_name"),
  priceTag: document.querySelector(".total_price"),
  reviewListTag: document.querySelector(".bb17")
};

let product = {};
let review = {};
let selectSize = "";

window.addEventListener("load", async () => {
  const editButton = document.querySelector(".product_edit");
  const deleteButton = document.querySelector(".product_delete");
  const token = sessionStorage.getItem("token");

  function moveToUpdate() {
    window.location.assign(`/productDetail/${productId}/updateProduct`);
  }

  editButton.addEventListener("click", moveToUpdate);

  const res = await fetch("/api/admin/check", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { result } = await res.json();

  if (result === "success") {
    editButton.classList.remove("hidden");
    deleteButton.classList.remove("hidden");
    return;
  } else {
    editButton.classList.add("hidden");
    deleteButton.classList.add("hidden");
    return;
  }
});

//상품상세페이지 구현
const drawProduct = async () => {
  ref.productImageTag.setAttribute("src", product.img);
  ref.brandTag.innerHTML = product.brand;
  ref.nameTag.innerHTML = product.name;
  ref.categoryTag.innerHTML = product.category;
  ref.descriptionTag.innerHTML = product.description;
  ref.priceTag.innerHTML = product.price;
  //사이즈 셀렉박스로 넣기
  product.size.forEach((size, index) => {
    ref.sizeTag.insertAdjacentHTML(
      "beforeend",
      `
          <option value="${index}">${size}</option>
          `
    );
  });
  //컬러 셀렉박스로 넣기
  product.color.forEach((color, index) => {
    ref.colorTag.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${index}">${color}</option>
      `
    );
  });
  const name = ref.nameTag.innerHTML;
  const brand = ref.brandTag.innerHTML;
  const price = ref.priceTag.innerHTML;
  const size = value_size.options[value_size.selectedIndex].text;
  const color = value_color.options[value_color.selectedIndex].text;
  const category = ref.categoryTag.innerHTML;
  const num = productId;

  // FIX] 여기는 처음 로딩할때 실행되고 끝나는 함수라서 여기서 사이즈를 바꿀 수 없음
  // product.selectSize = size;
  // product.selectColor = color;

  review.forEach((review) => {
    const review_no = review.reviewNo;
    const review_email = review.userId;
    const review_content = review.review;

    ref.reviewListTag.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
          <th>번호: ${review_no}</th>
          <th>이메일: ${review_email}</th>
          <br>
          <th>후기: ${review_content}</th>
          <br>
        </tr>
        <br>
      `
    )
  })

  // const data = {
  //   num,
  //   name,
  //   brand,
  //   price,
  //   size,
  //   color,
  //   category,
  // };
  // console.log(data);

  // const result = await Api.post("/api/selectedProducts", data);
  // console.log(result)
};

//localStorage 저장하기
const addCart = (id) => {
  const size = sizeTag.options[sizeTag.selectedIndex].text;
  const color = colorTag.options[colorTag.selectedIndex].text;

  product.selectSize = size;
  product.selectColor = color;

  const products = JSON.parse(localStorage.getItem("products")) || [];
  var i = 0;
  for (i; i < products.length; i++) {
    if (products[i]._id == product._id) {
      alert("이미 담긴 상품입니다.");
      break;
    }
  }
  if (i == products.length) {
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    alert("장바구니에 담겼습니다.");
  }
  console.log("테스트");
  console.log(size);
  console.log(color);
};
ref.cartButtonTag.addEventListener("click", addCart);

//함수 실행
const render = () => {
  drawProduct();
};

const initialize = async () => {
  const value_size = document.querySelector("#sizeTag");
  const value_color = document.querySelector("#colorTag");
  const res = await fetch(`/api/productDetail/${productId}`);
  product = await res.json();
  review = product.review;
  product = product.data;
  console.log(product["size"].join());
};

initialize().then(() => render());
ref.buyButttonTag.addEventListener("click", () => (location.href = `/order`));

// Header&Footer
const body = document.querySelector(".body");

let randomNum = Math.floor(Math.random() * 10);
let imgName = [
  "https://www.giordano.co.kr/_gio_on/2022/05412944.jpg",
  "https://www.giordano.co.kr/_gio_on/2022/05372906.jpg",
  "https://www.giordano.co.kr/_gio_on/2021/05371913_eshop.jpg",
  "https://www.giordano.co.kr/_gio_on/2022/01112951.jpg",
  "https://www.giordano.co.kr/_gio_on/2022/01072930.jpg",
  "https://www.giordano.co.kr/_gio_on/2022/05372908.jpg",
  "https://www.giordano.co.kr/_gio_on/2022/05372915.jpg",
  "https://www.giordano.co.kr/_gio_on/2022/05372910_RDS%EC%A0%9C%EC%99%B8.jpg",
  "https://www.giordano.co.kr/_gio_on/2022/05352917.jpg",
  "https://www.giordano.co.kr/_gio_on/2022/01072920.jpg",
];

document.querySelector(".img_box img").setAttribute("src", imgName[randomNum]);
