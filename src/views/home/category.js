const categoryBox = document.querySelector(".category");
const searchBar = document.querySelector(".header_search");

categoryBox.addEventListener("click", filtering);

function filtering(e) {
  const productAll = document.querySelectorAll(".pd_block");

  for (let i = 0; i < productAll.length; i++) {
    if (e.target.id === "category_box") return;
    else if (e.target.id === "all") {
      productAll.forEach((element) => {
        element.classList.remove("hidden");
      });
    } else if (e.target.id === productAll[i].id) {
      productAll[i].classList.remove("hidden");
    } else if (e.target.id !== productAll[i].id) {
      productAll[i].classList.add("hidden");
    }
  }
}
