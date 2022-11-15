const searchBtn = document.getElementsByClassName("searchBtn");
const productAll = document.querySelectorAll(".pd_block");
const searchBar = document.getElementsByClassName("header_search");
// const prouctId = document.querySelector(".pd_block").id;
// const prouctBrand = document.querySelector(".pd_brd").id;
// const prouctName = document.querySelector(".pd_name").id;
const modelName = document.querySelectorAll(".tag_name");

window.onload = function searchProduct() {
  if (searchBar.value) {
    for (let i = 0; i < productAll.length; i++) {
      productAll[i].classList.add("hidden");
      if (modelName.value === searchBar.value)
        productAll[i].classList.remove("hidden");
    }
  }
};

searchBtn.addEventListener("click", searchProduct);
