import * as Api from "/api.js";
import { checkLogin } from "../useful-functions.js";

const submitBtn = document.querySelector("#category-button");
const categoryInput = document.querySelector("#categoryInput");
const nameInput = document.querySelector("#nameInput");
const brandInput = document.querySelector("#brandInput");
const imgInput = document.querySelector("#imgInput");
const sizeInput = document.querySelector("#sizeInput");
const priceInput = document.querySelector("#priceInput");
const descriptionInput = document.querySelector("#descriptionInput");
const colorInput = document.querySelector("#colorInput");

checkLogin();
addAllEvents();

function addAllEvents() {
  submitBtn.addEventListener("click", handleSubmit);
}
async function handleSubmit(e) {
  e.preventDefault();

  const check = confirm("상품을 등록하시겠습니까?");

  if (check) {
    try {
      const category = categoryInput.value;
      const brand = brandInput.value;
      const name = nameInput.value;
      const price = priceInput.value;
      const img = imgInput.value;
      const description = descriptionInput.value;
      const color = getColorArray(colorInput.value);
      const size = getSizeArray(sizeInput.value);
      if (
        !category ||
        !brand ||
        !name ||
        !price ||
        !img ||
        !description ||
        !color ||
        !size
      ) {
        return alert("입력하지 않은 값이 있습니다.");
      }
      const data = {
        category,
        brand,
        name,
        price,
        img,
        description,
        color,
        size,
      };
      //경로 재설정 필요함 어디로 보낼지를 정해야됨!
      const result = await Api.post("/api/products", data);
      console.log(result);

      if (result) {
        alert(`${result.name} 상품이 성공적으로 등록되었습니다!`);

        window.location.href = "/";
      }
    } catch (err) {
      console.error(err.stack);
      alert(`${err.message}`);
    }
  } else {
    nameInput.value = "동하";
    sizeInput.value = "s";
  }
}

// 배열 처리함수
function getSizeArray(value) {
  const sizeArray = value.split(",");

  const sizes = [];

  for (let i = 0; i < sizeArray.length; i++) {
    const size = sizeArray[i];
    if (sizeArray[i] !== " ") {
      sizes.push(size);
    }
  }
  return sizes;
}
// 색상 처리함수
function getColorArray(value) {
  const colorArray = value.split(",");

  const colors = [];

  for (let i = 0; i < colorArray.length; i++) {
    const color = colorArray[i];
    if (colorArray[i] !== " ") {
      colors.push(color);
    }
  }
  return colors;
}
