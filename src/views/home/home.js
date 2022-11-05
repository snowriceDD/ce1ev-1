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

    productList.insertAdjacentHTML(
      "beforeend",
      `
    <section class="pd_block" id="${category}">
    <img src="${img}"class="box" id="${num}"/>
    <article class="pd_text">
      <p class="pd_brd" id="${brand}">${brand}</p>
      <p class="pd_name" id="${name}">
        ${name}
      </p>
  
      <div class="tag_box">
      <a class="tag_category">${category}</a>
      <a class="tag_name" id="${description}">${description}</a>
      </div>
      <p class="pd_price">${price}</p>
    </article>
  </section>
    `
    );
    const productItem = document.getElementById(`${num}`);

  function a () {
    window.location.assign(`/productDetail/${num}`)
    // window.location.assign(/productDetail")
  }

  productItem.addEventListener(
    "click", a

    
  );}

  );

}
