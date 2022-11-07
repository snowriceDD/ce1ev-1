//import * as Api from "../api"

const payments = document.getElementsByName("payment");
const payment = null; // 체크된 값(checked value)
//const submitBtn = document.querySelector("#submitButton");
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
      const orderNumber = Number(String(getToday()) + String(Math.random() * 1000000000));
      const paymethod = payment;
      //   const products = [{...}, {...}];

      const costs = [];
      products.forEach((product) => {
        costs.push(product.price);
      });
      // console.log(costs); // ["10,000", "15,000", "100,000"]

      const totalCost = [];
      costs.forEach((cost) => {
        totalCost.push(Number(cost.split(",").join("")));
      });
      // console.log(totalCost); // [10000, 15000, 100000]

      const cost = addCommas(totalCost.reduce((a, b) => a + b));
      console.log(cost);

      const count = products.length;
      const data = { orderNumber, products, cost, count, paymethod };
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

function addCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
