// 요소 모음
const productList = document.getElementsByClassName("pd_block");
// console.log(productList)

// 데이터를 받아 요소를 만든 후, html에 삽입
// window.onload()

const insertProductElement = async () => {
  const res = await fetch("/api/showproducts");
  const products = await res.json();
  console.log(products); //백엔드 url

  products.forEach((product) => {
    const brand = product.brand;
    const name = product.name;
    const price = product.price;
    const img = product.img;
    const category = product.category;
    const description = product.description;
    console.log(brand, name, img, category, description);

    productList.insertAdjacentHTML(
      "beforeend",
      `
    <section class="pd_block">
    <img src="${img}"class="box"/>
    <article class="pd_text">
      <p class="pd_brd">${brand}</p>
      <p class="pd_name">
        ${name}
      </p>
  
      <div class="tag_box">
      <a class="tag_category">${category}</a>
      <a class="tag_name">${description}</a>
      </div>
      <p class="pd_price">${price}</p>
    </article>
  </section>
    `
    );
  });
};
insertProductElement();
