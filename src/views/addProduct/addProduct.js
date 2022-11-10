import { addImageToS3 } from "../aws-s3.js";

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
  // imgInput.addEventListener("change", handleImageUpload);
  submitBtn.addEventListener("click", handleSubmit);
}
async function handleSubmit(e) {
  e.preventDefault();

  const category = categoryInput.value;
  const brand = brandInput.value;
  const name = nameInput.value;
  const price = priceInput.value;
  const imageKey = imgInput.files[0];
  const description = descriptionInput.value;
  const color = getColorArray(colorInput.value);
  const size = getSizeArray(sizeInput.value);

  if (
    !category ||
    !brand ||
    !name ||
    !price ||
    !description ||
    !color ||
    !size
  ) {
    return alert("입력하지 않은 값이 있습니다.");
  }

  if (img.size > 3e6) {
    return alert("사진은 최대 2.5MB 크기까지 가능합니다.");
  }

    if (imageKey.size > 3e6) {
      return alert("사진은 최대 2.5MB 크기까지 가능합니다.");
    }
    
      
      try {
        const img = await addImageToS3(imgInput, category);
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

          fileName.innerText="";
  
          window.location.href = "/";
        }

      } catch (err) {
        console.log(err.stack);
    
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
      }
}
    
function handleImageUpload() {
  const file = imgInput.files[0];
  if(file) {
    fileName.innerText = file.name;
  } else {
    fileName.innerText="";
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
