// import { checkLogin } from "../useful-functions";


const mypageAccount = document.querySelector("#mypageAccount_button");
const mypageOrderList = document.querySelector("#mypageOrderList_button");
const mypageCart = document.querySelector("#mypageCart_button");
const mypageWithdrawal = document.querySelector("#mypageWithdrawal_button");


// checkLogin();

function moveTomypageAccount() {
  window.location.assign("/mypage/account");
}

mypageAccount.addEventListener("click", moveTomypageAccount);

function moveTomypageOrderList() {
  window.location.assign("/mypage/myPageOrderList");
}

mypageOrderList.addEventListener("click", moveTomypageOrderList);

function moveTomypageCart() {
  window.location.assign("/mypage/myPageOrderList");
}

mypageCart.addEventListener("click", moveTomypageCart);

function moveTomypageWithdrawal() {
  window.location.assign("/mypage/withdrawal");
}

mypageWithdrawal.addEventListener("click", moveTomypageWithdrawal);
