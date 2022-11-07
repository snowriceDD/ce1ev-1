//import * as Api from "../api"

const payments = document.getElementsByName("payment");
const payment = null; // 체크된 값(checked value)const submitBtn = document.querySelector("#submitButton");
for (let i = 0; i < payments.length; i++) {
  if (payments[i].checked == true) {
    payment = payments[i].value;
  }
}

// console.log(payments[0].value);
// console.log(payments[1].value)

// addAllEvents();

// function addAllEvents() {
//     submitBtn.addEventListener("click", handleSubmit);
// }

async function handleSubmit(e) {
  e.preventDefault();

  const check = confirm("결제 진행 하시겠습니까?");

  if (check) {
    try {
      const orderNum = Number(
        String(getToday()) + String(Math.random() * 1000000000)
      );
      const paymethod = payment;
      //   const products = [{...}, {...}];

      const costs = [];
      products.forEach((product) => {
        costs.push(product.price);
      });
      const cost = costs.reduce((a, b) => a + b);

      const count = products.length;

      const data = { orderNum, products, cost, count, paymethod };
      const result = await Api.post("/api/orders", data);

      if (result) {
        window.location.href = "/mypage";
      }
    } catch (err) {
      console.error(err.stack);
      alert(`${err.message}`);
    }
  } else {
  }
}

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + month + day;
}
