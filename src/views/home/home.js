import * as Api from "/api.js";

const productList = document.querySelector(".section_box");

// 데이터를 받아 요소를 만든 후, html에 삽입
insertProductElement();

async function insertProductElement() {
  const res = await fetch(`api/products`); //백엔드 url
  const products = await res.json();

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
          <img src="../image/like.png" alt="" width="30px" id="like_${num}">
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
    const likeCount = document.getElementById(`likeCount_${num}`)

    productItem.addEventListener("click", moveToProduct);
    likeBtn.addEventListener("click", countIncrease);

    function moveToProduct() {
      window.location.assign(`/productDetail/${num}`);
    }

    async function countIncrease(e) {
      e.preventDefault();

      try{
        const data = {num, like}
      // console.log(data); {num: 2, like: 0}
      const newLike = like +1;

      if(like != newLike) {
        data.like = newLike;
        console.log(data);
        await Api.patch("/api/products", num, data);
        likeCount.innerText = data.like;
        likeBtn.src = "../image/like_hover.png" //새로고침하면 사라짐
      }
      } catch(err) {
        alert(`찜하는 중 오류 발생: ${err}`)
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
