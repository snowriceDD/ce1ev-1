import * as Api from "/api.js";

const productList = document.querySelector(".section_box");

// 데이터를 받아 요소를 만든 후, html에 삽입
insertProductElement();

let ref = {};

async function insertProductElement() {
  const products = await Api.get("/api/products"); //백엔드 url
  // const products = await res.json();

  products.forEach((product) => {
    const brand = product.brand;
    const name = product.name;
    const price = product.price;
    const img = product.img;
    const category = product.category;
    const description = product.description;
    const num = product.num;

    const updateProduct = `updateProduct-${num}`;

    productList.insertAdjacentHTML(
      "beforeend",
      `
      <section class="pd_block" id="${category}">
      <img src="${img}"class="box" id="${num}"/>
      <article class="pd_text">
        <p class="pd_brd" id="${brand}">${brand}</p>
        <p class="${updateProduct}" id="${name}">
          ${name}
        </p>

        <div class="tag_box">
        <a class="tag_category">${category}</a>
        <a class="tag_name" id="${description}">${description}</a>
        </div>
        <p class="pd_price">${price} 원</p>
      </article>
    </section>
      `
    );

    ref[updateProduct] = document.querySelector(`.${updateProduct}`);

    ref[updateProduct].addEventListener("click", (event) => updateProductFunc(event, product));
  });
}

async function updateProductFunc(e, product) {
  e.preventDefault();

  console.log(product);

  //function moveToadminMember() {
    window.location.assign(`/admin/adminProductDetail/${product.num}`);


  //adminMember.addEventListener("click", moveToadminMember);

  /*
  try {
    const data = { orderNo: orderNo, productNo: productNo, userId: userData.email };

    const result = await Api.delete(`/api/mypage/myPageReview`, '', data);

    if (result) {
      alert(`후기가 성공적으로 삭제되었습니다!`);
      window.location.reload();
    }
  } catch (err) {
    console.log(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  } */
}
