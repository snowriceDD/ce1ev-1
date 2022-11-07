//import 설정 필요
import { xxx } from "";
import * as Api from "";

const ordersCount = document.querySelector("#ordersCount");
const prepareCount = document.querySelector("#prepareCount");
const deliveryCount = document.querySelector("#deliveryCount");
const completeCount = document.querySelector("#completeCount");
const listing = document.querySelector(".listing");

const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modalBackground");
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteCompleteButton = document.querySelector('#deleteCompleteButton');
const deleteCancelButton = document.querySelector("#deleteCancelButton");

//admimn checking 함수 필요

//addEventListner 묶음 
function addAllEvent() {
    modalBackground.addEventListener("click", closeModal);
    modalCloseButton.addEventListener("click", closeModal);
    document.addEventListener("keydown", keyDownCloseModal);
    deleteCompleteButton.addEventListener("click", deleteOrderDate);
    deleteCancelButton.addEventListener("click", cancelDelete);
}

function keyDownCloseModal(e) {
    if(e.keyCode === 27) {
        closeModal();
    }
}


const order_cancel = document.querySelector(".order_cancel");

order_cancel.addEventListener('click', () => {
    openModal();
}); 

function openModal() {
    modal.classList.add("is-active");
}

function closeModal() {
    modal.classList.remove("is-active");
}

function keyDownCloseModal(e) {
    if (e.keyCode === 27) {
        closeModal();
    }
}