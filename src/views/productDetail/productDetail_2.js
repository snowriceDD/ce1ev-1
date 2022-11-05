import * as Api from "/api.js";

const img = document.getElementsByClassName('box')[0].id
const category = document.getElementsByClassName('pd_block')[0].id
const brand = document.getElementsByClassName('pd_brd')[0].id
const price = document.getElementsByClassName('pd_price')[0].id
const name = document.getElementsByClassName('pd_name')[0].id
const description = document.getElementsByClassName('tag_name')[0].id
const num = document.getElementsByName('number').id

// const item = document.querySelector(".pd_block");

addAllEvents();

function addAllEvents() {

  submitBtn.addEventListener("click", handleSubmit);
}

async function handleSubmit(e) {
    e.preventDefault();

    //   const color = getColorArray(colorInput.value);
    //   const size = getSizeArray(sizeInput.value);

      const data = {
        category,
        brand,
        name,
        price,
        img,
        description,
      };
      console.log(data);

    const result = await Api.post("/api/productsDetail/:num", data);



    console.log(result);

    window.location.href = "/";

    
}