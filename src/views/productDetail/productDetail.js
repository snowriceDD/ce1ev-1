const productImageTag = document.querySelector(".bb2");
const brandTag = document.querySelector(".pd_brd");
const nameTag = document.querySelector(".pd_name");
const categoryTag = document.querySelector(".tag_category");
const descriptionTag = document.querySelector(".tag_name");

console.log(productImageTag);
const productId = window.location.pathname.split("/")[2];
let product = {};
let selectSize = "";

const drawProduct = () => {
  productImageTag.setAttribute("src", product.img);
  brandTag.innerHTML = product.brand;
  nameTag.innerHTML = product.name;
  categoryTag.innerHTML = product.category;
  descriptionTag.innerHTML = product.description;
};
const initialize = async () => {
  const res = await fetch(`/api/productDetail/${productId}`);
  product = await res.json();
  drawProduct();
};
initialize();

const cartBtn = document.querySelector(".button_cart");

function moveToMypage() {
  window.location.assign(`/mypage`);
  // window.location.assign(/productDetail")
}

cartBtn.addEventListener("click", moveToMypage);
