const searchBtn = document.querySelector(".searchBtn");
const searchBar = document.querySelector(".header_search");

function searchProduct() {
  const productAll = document.querySelectorAll(".pd_block");

  const modelName = document.querySelectorAll(".tag_name");
  const brand = document.querySelectorAll(".pd_brd");
  const name = document.querySelectorAll(".pd_name");
  const category = document.querySelectorAll(".tag_name");

  for (let i = 0; i < productAll.length; i++) {
    productAll[i].classList.add("hidden");
    if (
      modelName[i].innerHTML === searchBar.value.trim() ||
      modelName[i].innerHTML.includes(searchBar.value.trim()) ||
      brand[i].innerHTML === searchBar.value.trim() ||
      brand[i].innerHTML.includes(searchBar.value.trim()) ||
      name[i].innerHTML === searchBar.value.trim() ||
      name[i].innerHTML.includes(searchBar.value.trim()) ||
      category[i].innerHTML === searchBar.value.trim() ||
      category[i].innerHTML.includes(searchBar.value.trim())
    ) {
      productAll[i].classList.remove("hidden");
    }
  }
}

searchBtn.addEventListener("click", searchProduct);
searchBar.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    searchProduct();
  }
});
