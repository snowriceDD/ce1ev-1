import * as Api from "/api.js";
import { checkLogin } from "../useful-functions.js";

const inputnameTag = document.querySelector("#fullNameInput");
const emailTag = document.querySelector("#emailInput");
const passwordTag = document.querySelector("#passwordInput");
const passwordConfirmTag = document.querySelector("#passwordConfirmInput");
const currentPasswordTag = document.querySelector("#currentPasswordInput");
const numberTag = document.querySelector("#numberInput");
const addressTag = document.querySelector("#addressInput");
const updatebtn = document.querySelector("#updateButton");


checkLogin();
addAllEvents();

let userData;
async function addAllEvents() {
  userData = await Api.get("/api/user");

  const {email, name, phoneNum, address} = userData;

  userData.password = "";
  inputnameTag.value = name;
  numberTag.value = phoneNum;
  emailTag.value = email;
  addressTag.value = `${address}`

  passwordTag.value = ""; //크롬 자동완성 삭제

  updatebtn.addEventListener("click", saveUserData);
}

//db 저장
async function saveUserData(e) {
  e.preventDefault();

  const name = inputnameTag.value;
  const email = emailTag.value;
  const password = passwordTag.value;
  const passwordConfirm = passwordConfirmTag.value;
  const address = addressTag.value;
  const phoneNum = numberTag.value;
  const currentPassword = currentPasswordTag.value;

  const isPasswordLong = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;
  
  //비밀번호 변경
  if(password && !isPasswordLong) {
    alert("비밀번호는 4글자 이상이어야 합니다.")
  }
  if(password && !isPasswordSame) {
    alert("비밀번호와 비밀번호확인이 일치하지 않습니다.")
  }
  
  const data = {currentPassword};

  if(name !== userData.name) {
    data.name = name;
  }

  if(password !== userData.password) {
    data.password = password;
  }

  if(address !== userData.address) {
    data.address = address;
  }

  if(phoneNum !== userData.phoneNum) {
    data.phoneNum = phoneNum;
  }

  if(email != userData.email) {
    data.email = email;
  }

  const toUpdate = Object.keys(data);
  if(toUpdate.length ===1) {
    alert("업데이트한 정보가 없습니다.")
  }

  try {
    const {_id} = userData;
    await Api.patch("/api/users", _id, data);
    alert("회원정보가 수정되었습니다.")
    window.location.assign("/");

  } catch(err) {
    alert(`회원정보 저장 과정에서 오류가 발생하였습니다: ${err}`);
  }

}

