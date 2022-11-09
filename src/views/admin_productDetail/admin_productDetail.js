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
