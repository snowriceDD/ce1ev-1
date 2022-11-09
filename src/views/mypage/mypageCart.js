
let cart = JSON.parse(localStorage.getItem('product'))
// 데이터를 받아 요소를 만든 후, html에 삽입
insertOrderElement();

async function insertOrderElement() {
  console.log("asdasd")

    // const orderForm =  document.querySelector(".content");
    // const name = cart.name;
    // const price = cart.price;
    // console.log(price)
    // const img = cart.img;
    // const category = cart.category;
    // const description = cart.description;
    // const num = cart.num;
    // console.log(name)
    // orderForm.insertAdjacentHTML(
    //     "beforeend",
    //     `
    //     <div class="first">
    //       <img class="product_img" src="${img}" />
    //       <div class="product_script">
    //         <p>
    //           상품명 : ${name}
    //         </p>
    //       </div>
    //     </div>
    //     <div class="product_price">
    //       ${price}원<br />
    //       (1개)
    //     </div>
    //     <div class="status">배송중</div>
    //   `
    //   );
}
