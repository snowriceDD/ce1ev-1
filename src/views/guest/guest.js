import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";

const emailInput = document.querySelector("#emailInput");
const orderNumberInput = document.querySelector("#orderNumberInput");
const submitButton = document.querySelector("#submitButton");

addAllEvents();

function addAllEvents() {
  submitButton.addEventListener("click", handleSubmit);
}

//guest 로그인
async function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const orderNumber = orderNumberInput.value;

  const isEmailValid = validateEmail(email);
  if (!isEmailValid) {
    ("이메일 형식이 아닙니다.");
  }

  try {
    const data = { email, orderNumber };
    const result = await Api.post("/api/guest", data);

    alert("게스트 로그인이 확인되었습니다.");

    window.location.href = `/guestOrderList/${orderNumber}`;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err}`);
  }
}
