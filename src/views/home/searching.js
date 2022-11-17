const searchBtn = document.querySelector(".searchBtn");
console.log(searchBtn);
const productAll = document.querySelector(".pd_block");
console.log(productAll);
const searchBar = document.getElementsByClassName("header_search");
// const prouctId = document.querySelector(".pd_block").id;
// const prouctBrand = document.querySelector(".pd_brd").id;
// const prouctName = document.querySelector(".pd_name").id;
const modelName = document.querySelectorAll(".tag_name");

function searchProduct() {
  if (searchBar.value) {
    for (let i = 0; i < productAll.length; i++) {
      productAll[i].classList.add("hidden");
      if (modelName.value === searchBar.value)
        productAll[i].classList.remove("hidden");
    }
  }
}

searchBtn.addEventListener("click", searchProduct);
