import { checkAdmin } from "../useful-functions.js";
import * as Api from "/api.js";

// const adminCategory = document.querySelector("#adminCategory_button");
const adminProduct = document.querySelector("#adminProduct_button");
const adminOrder = document.querySelector("#adminOrder_button");
const adminMember = document.querySelector("#adminMember_button");
const adminReivew = document.querySelector("#adminReview_button");
const nameTag = document.querySelector(".name");
const emailTag = document.querySelector(".email");
const roleTag = document.querySelector(".role");

checkAdmin();
addAllEvent();

let adminData;
async function addAllEvent() {
  adminData = await Api.get("/api/user");
  const { email, name, role } = adminData;

  nameTag.innerText = `${name}`;
  emailTag.innerText = `${email}`;
  roleTag.innerText = `${role}`;
}

// function moveToadminCategory() {
//   window.location.assign("/admin/adminCategory");
// }

// adminCategory.addEventListener("click", moveToadminCategory);

function moveToadminProductList() {
  window.location.assign("/admin/adminProductList");
}

adminProduct.addEventListener("click", moveToadminProductList);

function moveToadminOrder() {
  window.location.assign("/admin/adminOrder");
}

adminOrder.addEventListener("click", moveToadminOrder);

function moveToadminMember() {
  window.location.assign("/admin/adminMember");
}

adminMember.addEventListener("click", moveToadminMember);

function moveToadminReview() {
  window.location.assign("/admin/adminReview");
}

adminMember.addEventListener("click", moveToadminReview);
