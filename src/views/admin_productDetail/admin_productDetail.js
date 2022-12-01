import * as Api from "/api.js";

const productId = window.location.pathname.split("/")[3];

let product = {};
const ref = {
  sizeBlockTag: document.querySelector(".size_block"),
  //sizeTag: document.querySelector("selectBox"),
  sizeTag: document.querySelector("#sizeTag"),
  colorTag: document.querySelector("#colorTag"),
  productImageTag: document.querySelector(".bb2"),
  brandTag: document.querySelector(".pd_brd"),
  nameTag: document.querySelector(".pd_name"),
  categoryTag: document.querySelector(".tag_category"),
  descriptionTag: document.querySelector(".tag_name"),
  priceTag: document.querySelector(".total_price"),

  addButtonTag: document.querySelector(".pd_add"),
  updateButtonTag: document.querySelector(".pd_fix"),
  deleteButtonTag: document.querySelector(".pd_delete"),
};
const body = document.querySelector(".body");

const drawProduct = async () => {
  ref.productImageTag.setAttribute("src", product.img);
  ref.brandTag.innerHTML = product.brand;
  ref.nameTag.innerHTML = product.name;
  ref.categoryTag.innerHTML = product.category;
  ref.descriptionTag.innerHTML = product.description;
  ref.priceTag.innerHTML = product.price;

  product.size.forEach((size, index) => {
    ref.sizeTag.insertAdjacentHTML(
      "beforeend",
      `
          <option value="${index}">${size}</option>
          `
    );
  });

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
  const category = ref.categoryTag.innerHTML;
};

function addProduct() {
  window.location.assign("/products");
}

function moveToadminProductUpdate() {
  location.href = `/adminProductDetail/${productId}/updateProduct`;
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
  product = product.data;
};

initialize().then(() => render());
