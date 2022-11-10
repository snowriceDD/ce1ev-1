//import 설정 필요
// import { xxx } from "";
// import * as Api from "";
// import { doc } from "prettier";
// import { checkAdmin } from "../useful-functions";

// const ordersCount = document.querySelector("#ordersCount");
// const prepareCount = document.querySelector("#prepareCount");
// const deliveryCount = document.querySelector("#deliveryCount");
// const completeCount = document.querySelector("#completeCount");
// const listing = document.querySelector(".listing");

const modal = document.querySelector("#modal");
// const modalBackground = document.querySelector("#modalBackground");
const modalCloseButton = document.querySelector("#modalCloseButton");
// const deleteCompleteButton = document.querySelector('#deleteCompleteButton');
// const deleteCancelButton = document.querySelector("#deleteCancelButton");

//admimn checking 함수 필요
// checkAdmin();
// addAllEvent();

//addEventListner 묶음
// function addAllEvent() {
//     modalBackground.addEventListener("click", closeModal);
//     modalCloseButton.addEventListener("click", closeModal);
// document.addEventListener("keydown", keyDownCloseModal);
//     deleteCompleteButton.addEventListener("click", deleteOrderDate);
//     deleteCancelButton.addEventListener("click", cancelDelete);
// }

//modal용 script
const order_cancel = document.getElementById("order_cancel_btn");
function closeModal() {
  modal.style.display = "none";
}
function openModal() {
  modal.style.display = "flex";
}

/* 주문취소 누르면 모달 팝업 */
order_cancel.addEventListener("click", (e) => {
  openModal();
});

/*esc close module*/
document.addEventListener("keydown", keyDownCloseModal);
function keyDownCloseModal(e) {
  if (e.keyCode === 27) {
    closeModal();
  }
}

/* X button close */
modalCloseButton.addEventListener("click", (e) => {
  closeModal();
});

/* 모달 외 영역으로 끄기 */
modal.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("modal-overlay")) {
    closeModal();
  }
});

// order_cancel.addEventListener('click', () => {
//     openModal();
// });

// function openModal() {
//     modal.classList.add("is-active");
// }

// function closeModal() {
//     modal.classList.remove("is-active");
// }
