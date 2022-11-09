import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const numberInput = document.querySelector("#numberInput");
const addressInput = document.querySelector("#addressInput");
const submitButton = document.querySelector("#submitButton");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener("click", handleSubmit);
}

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const name = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNum = numberInput.value;
  const address = addressInput.value;

  // 잘 입력했는지 확인
  const isFullNameValid = name.length >= 2;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;
  const isAddressValid = address.length >= 1;
  const isNumberValid = phoneNum.length >= 8;

  if (!isFullNameValid || !isPasswordValid) {
    return alert("이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.");
  }

  if (!isEmailValid) {
    return alert("이메일 형식이 맞지 않습니다.");
  }
  if (!isPasswordSame) {
    return alert("비밀번호가 일치하지 않습니다.");
  }
  if (!isAddressValid) {
    return alert("주소 형식이 아닙니다.");
  }
  if (!isNumberValid) {
    return alert("전화번호 형식이 아닙니다.");
  }
  // 회원가입 api 요청
  try {
    const data = { name, email, password, phoneNum, address };
    await Api.post("/api/register", data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = "/login";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

window.onload = function(){
  document.getElementById("addressInput").addEventListener("click", function(){ //주소입력칸을 클릭하면
      //카카오 지도 발생
      new daum.Postcode({
          oncomplete: function(data) { //선택시 입력값 세팅
              document.getElementById("addressInput").value = data.address; // 주소 넣기
              // document.querySelector("input[id=address_detail]").focus(); //상세입력 포커싱
          }
      }).open();
  });
}
