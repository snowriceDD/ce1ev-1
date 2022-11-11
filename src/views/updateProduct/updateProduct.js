import * as Api from "/api.js";
import { checkLogin } from "../useful-functions.js";

const updateBtn = document.querySelector("#update-button");

checkLogin();

updateBtn.addEventListener("click", handleSubmit);
async function handleSubmit(e) {
  e.preventDefault();

  const check = confirm("상품을 수정하시겠습니까?");

  if (check) {
    try {
      const num = window.location.pathname.split("/")[2];

      const data = {};
      const result = await Api.patch("/api/prodcuts", num, data);
      console.log(result);

      if (result) {
        alert(`${result.name} 상품이 성공적으로 수정되었습니다.`);

        window.location.href = "/";
      }
    } catch (err) {
      console.error(err.stack);
      alert(`${err.message}`);
    }
  }
}
