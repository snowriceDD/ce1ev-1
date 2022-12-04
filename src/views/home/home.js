import * as Api from "/api.js";
import { checkLogin } from "../useful-functions.js";
const productList = document.querySelector(".section_box");
const token = sessionStorage.getItem("token");

// console.log(userId)
// const email = userData.email;

// 데이터를 받아 요소를 만든 후, html에 삽입
insertProductElement();

async function insertProductElement() {
  const res = await fetch(`api/products`); //백엔드 url
  const products = await res.json();
  let userData = await Api.get("/api/user");
  const likeProduct = userData.likeProduct;
  console.log(likeProduct)

  products.forEach((product) => {
    const brand = product.brand;
    const name = product.name;
    const price = product.price;
    const img = product.img;
    const category = product.category;
    const description = product.description;
    const num = product.num;
    const like = product.like;
   
    
    productList.insertAdjacentHTML(
      "beforeend",
      `
    <section class="pd_block" id="${category}">
    <img src="${img}"class="box" id="${num}"/>
    <article class="pd_text">
      <p class="pd_brd" id="${brand}">${brand}</p>
      <p class="pd_name" id="${name}">${name}</p>
      <div class="tag_box">
        <a class="tag_category">${category}</a>
        <a class="tag_name" id="${description}">${description}</a>
        <div class="tag_like">
          <img class="like_src" src="../image/like.png" alt="" width="30px" id="like_${num}">
        </div>
      </div>
      <p class="like_count" id="likeCount_${num}">${like}</p>
      <p class="pd_price">${price} 원</p>
    </article>
  </section>
    `
    );
  
    const productItem = document.getElementById(`${num}`);
    const likeBtn = document.getElementById(`like_${num}`);
    const likeCount = document.getElementById(`likeCount_${num}`);

    productItem.addEventListener("click", moveToProduct);
    likeBtn.addEventListener("click", toggle);
    function moveToProduct() {
      window.location.assign(`/productDetail/${num}`);
    }
    async function toggle(e) {

      e.preventDefault();
      console.log(likeBtn.src.split("/")[4]);
      if (likeBtn.src.split("/")[4] === "like.png") {
        countIncrease(e);
        console.log("인크리즈");
      } else {
        countDecrease(e);
        console.log(likeBtn.src);
        console.log("디크리즈");
      }
    }
    async function countIncrease(e) {
      e.preventDefault();
      if (token) {
        checkLogin();
        let userData = await Api.get("/api/user");
        const { likeProduct } = userData;
        const userId = userData._id;

        const data = { num, like };
        likeProduct.push(num);
        const newLike = like + 1;
        console.log("인크리즈", newLike);
        if (like != newLike) {
          data.like = newLike;
          await Api.patch("/api/products", num, data);
          await Api.patch("/api/usersLike/like", userId, {
            likeProduct: likeProduct,
          });
          console.log(userId);
          likeCount.innerText = data.like;
          likeBtn.src = "../image/like_hover.png";
        }
      } else {
        alert("로그인이 필요합니다.");
        window.location.href = "/login";
      }
    }
    async function countDecrease(e) {
      e.preventDefault();
      if (token) {
        checkLogin();
        let userData = await Api.get("/api/user");
        const { likeProduct } = userData;
        const userId = userData._id;
        const data = { num, like };
        likeProduct.pop(num);
        const newLike = like - 1;
        console.log("디크리즈", newLike);
        if (like != newLike) {
          data.like = like;
          await Api.patch("/api/products", num, data);
          await Api.patch("/api/usersLike/like", userId, {
            likeProduct: likeProduct,
          });
          console.log(userId);
          likeCount.innerText = data.like;
          likeBtn.src = "../image/like.png";
        }
      } else {
        alert("로그인이 필요합니다.");
        window.location.href = "/login";
      }
    }
  });

  const logoutBtn1 = document.querySelector("#logout1");
  const logoutBtn2 = document.querySelector("#logout2");

  logoutBtn1.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  });

  logoutBtn2.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  });
}
