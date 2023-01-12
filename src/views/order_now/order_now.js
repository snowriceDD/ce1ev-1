import * as Api from "../api.js";
import { checkLogin, getToday , validateEmail} from "../useful-functions.js";
// import { addCommas, checkLogin } from "../useful-functions";

let cart = JSON.parse(localStorage.getItem("buyNowProducts"));
const inputnameTag = document.querySelector("#fullNameInput");
const addressTag = document.querySelector("#addressInput");
const emailTag = document.querySelector("#emailInput");
const phoneNumTag = document.querySelector("#phoneNumberInput");
const token = sessionStorage.getItem("token");
cart[0].totalPrice=cart[0].price;
cart[0].totalCount=1;
if (token) {
  checkLogin();
  insertUserData();
  insertOrderElement();

  document.querySelector(".payButton").addEventListener("click", handleSubmit);
  async function handleSubmit(e) {
    e.preventDefault();
    let payments = document.getElementsByName("payment");
    let payment = null; // 체크된 값(checked value)
    //const submitBtn = document.querySelector("#submitButton");
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].checked == true) {
        payment = payments[i].value;
      }
    }
    const check = confirm("결제 진행 하시겠습니까?");

    if (check) {
      try {
        const orderNumber = Number(
          String(getToday()) + String(Math.random() * 1000000000)
        );
        const email = emailTag.value;
        const payMethod = payment;
        const products = cart;
        const cost = parseInt(document.querySelector(".AllPrice").innerHTML.replace(/(,|개|원)/g, ""))
        const count = cart.length;
        const data = { orderNumber, products, cost, count, payMethod, email };
        const result = await Api.post("/api/orders", data);
        alert(`주문이 완료 되었습니다.`)
        localStorage.clear();
        if (result) {
          window.location.href = "/";
        }
      } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
      }
    } else {
    }
  }
} else {
  insertOrderElement();
  document.querySelector(".payButton").addEventListener("click", handleSubmit);


  async function handleSubmit(e) {
    e.preventDefault();
    let payments = document.getElementsByName("payment");
    let payment = null; 
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].checked == true) {
        payment = payments[i].value;
      }
    }
    const check = confirm("결제 진행 하시겠습니까?");
    //order 삽입
    if (check) {
      try {
        const orderNumber = Number(
          String(getToday()) + String(Math.random() * 1000000000)
        );
        const email = emailTag.value;
        const payMethod = payment;
        const products = cart;
        const cost = parseInt(document.querySelector(".AllPrice").innerHTML.replace(/(,|개|원)/g, ""))
        const count = products.length;
        const data = { orderNumber, products, cost, count, payMethod, email };

          //user 정보 확인
        const name = inputnameTag.value;
        const password = String(orderNumber);
        const phoneNum = phoneNumTag.value;
        const address = addressTag.value;
        const role = "guest"
        const isMember = false;

        //잘 입력했는지
        const isnameValid = name.length >=2;
        const isEmailValid = validateEmail(email);
        const isAddressValid = address.length >=1;
        const isNumberValid = phoneNum.length >=8;

        if(!isnameValid) {
          return alert("이름은 2글자 이상이어야 합니다.");
        }

        if(!isEmailValid) {
          return alert("이메일 형식이 맞지 않습니다.");
        }

        if(!isAddressValid) {
          return alert("주소 형식이 아닙니다.");
        }
        
        if(!isNumberValid) {
          return alert("전화번호 형식이 아닙니다.");
        }
        

        try {
          alert(`guest 주문이 완료 되었습니다. 주문번호(${password})를 꼭 기억하여 주문조회 시 입력해주십시오.`)
          localStorage.clear();
        } catch (err) {
          console.error(err.stack);
          alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err}`)
        }

        const result = await Api.post("/api/orders", data);

        if (result) {
          window.location.href = "/";
        }
      } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
      }
    } else {
    }
  }
}



let userData;
async function insertUserData() {
  userData = await Api.get("/api/user");

  const { email, name, phoneNum, address } = userData;

  inputnameTag.value = name;
  addressTag.value = address;
  emailTag.value = email;
  phoneNumTag.value = phoneNum;
}

async function insertOrderElement() {
  let cost = 0;
  cart.forEach((product) => {
    const orderForm = document.querySelector(".total");
    const name = product.name;
    const price = product.price;
    const img = product.img;
    const size = product.selectSize;
    const color = product.selectColor;
    const count = product.quantity;
    orderForm.insertAdjacentHTML(
      "beforeend",
      `
    <div class="product">
      <img class="box" src="${img}"></img>
      <div class="info">
        <ul class="productInfo">
            <li id="name">
                ${name}
            </li>
            <li id="color">
                color: 
                <div>
                    ${color}
                </div>
            </li>
            <li id="size">
                size:
                <div>
                    ${size}
                </div>
            </li>
            <li id="count">
                count:
                <div>
                    ${count}
                </div>
            </li>
            <li id="price">
                price:
                <div>
                    ${price}
                </div>
            </li>
        </ul>
      </div>
    `
    );
    cost += parseInt(price.replace(/(,|개|원)/g, ""));
  });
  const totalPrice = document.querySelector(".AllPrice");
  totalPrice.innerHTML = cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.querySelector(".totalCount").innerHTML = cart.length;
}
