import * as Api from "/api.js";
// import { checkAdmin } from "../useful-functions";

const updateBtn = document.querySelector("#update-button");
const categoryInput = document.querySelector('#categoryInput');
const nameInput = document.querySelector('#nameInput');
const brandInput = document.querySelector('#brandInput');
const imgInput = document.querySelector('#imgInput');
const descriptionInput = document.querySelector('#descriptionInput');
const priceInput = document.querySelector('#priceInput');
const sizeInput = document.querySelector('#sizeInput');
const colorInput = document.querySelector('#colorInput');

// checkAdmin();
addAllEvents(); 


let productData;
async function addAllEvents() {
      const num = window.location.pathname.split("/")[2];
      productData = await Api.get(`/api/products/${num}`)

      const {category, brand, name, img, description, price,size, color} = productData;

      categoryInput.value = category;
      brandInput.value = brand;
      nameInput.value = name;
      imgInput.value = img;
      descriptionInput.value = description;
      priceInput.value = price;
      sizeInput.value = size;
      colorInput.value = color;

      updateBtn.addEventListener("click", saveProductData)
}

//db저장

async function saveProductData(e) {
  e.preventDefault();

  const num = window.location.pathname.split("/")[2];
  const category = categoryInput.value;
  const brand = brandInput.value;
  const name = nameInput.value;
  const img = imgInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const size = sizeInput.value;
  const color = colorInput.value;

  const data = {num};

  if(category !== productData.category) {
    data.category = category;
  }

  if(brand !== productData.brand) {
    data.brand = brand;
  }

  if(name !== productData.name) {
    data.name = name;
  }

  if(img !== productData.img) {
    data.img = img;
  }

   if(description !== productData.description) {
    data.description= description;
  }

  if(price !== productData.price) {
    data.price = price;
  }

  if(size !== productData.size) {
    data.size = size;
  }

  if(color !== productData.color) {
    data.color = color;
  }

  const toUpdate = Object.keys(data);;
  if(toUpdate.length === 1) {
    alert("업데이트한 정보가 없습니다.")
  }

  try {
    const {num} = productData;
    await Api.patch("/api/products", num, data);
    alert("상품정보가 수정되었습니다.")
    window.location.assign("/");

  } catch(err) {
    alert(`상품정보 저장 과정에서 오류가 발생하였습니다: ${err}`);
  }

}
