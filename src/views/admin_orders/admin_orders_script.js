import * as Api from "/api.js";
import { addCommas, checkAdmin } from "../useful-functions.js";

const ordersCount = document.querySelector("#ordersCount");
const prepareCount = document.querySelector("#prepareCount");
const deliveryCount = document.querySelector("#deliveryCount");
const completeCount = document.querySelector("#completeCount");
const listing = document.querySelector(".listing-order");

const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modalBackground");
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteCompleteButton = document.querySelector("#deleteComplete");
const deleteCancelButton = document.querySelector("#deleteCancelButton");

//admimn checking 함수 필요
checkAdmin();
insertOrders();
addAllEvents();

//addEventListner 묶음
function addAllEvents() {
  modalBackground.addEventListener("click", closeModal);
  modalCloseButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", keyDownCloseModal);
  deleteCompleteButton.addEventListener("click", deleteOrderDate);
  deleteCancelButton.addEventListener("click", cancelDelete);
}

let orderNumDelete;
async function insertOrders() {
  const orders = await Api.get("/api/orderlist/all");
  const summary = {
    ordersCount: 0,
    prepareCount: 0,
    deliveryCount: 0,
    completeCount: 0,
  };

  for (const order of orders) {
    const { _id, orderNumber, products, cost, status, createdAt } = order;
    const date = createdAt.split("T")[0];
    const names = [];
    products.forEach((product) => {
      names.push(product["name"]);
    });
    const name = names.toString().split(",").join("   ||   ");
    console.log(name);
    summary.ordersCount += 1;

    if (status === "상품 준비중") {
      summary.prepareCount += 1;
    }
    if (status === "상품 배송중") {
      summary.deliveryCount += 1;
    }
    if (status === "배송 완료") {
      summary.completeCount += 1;
    }

    listing.insertAdjacentHTML(
      "beforeend",
      `
      <div class="listing" id="order-${_id}">
      <div class="column1" id="date">${date}</div>
      <div class="column1" id="products">
        <div>${orderNumber}</div>
      </div>
      <div class="column1" id="cost">${addCommas(cost)}</div>
      <div class="colmun1 id="status>${status}</div>
      <div class="column2" id="delivery">
        <div class="selectBox">
          <select name="sB" class="select" id="status-${_id}">
            <option
             class="has-background-danger-light has-text-danger"
             ${
               status === "상품 준비중" ? "selected" : ""
             } value="상품 준비중">상품 준비중</option>
            <option
             class="has-background-primary-light has-text-primary"
             ${
               status === "상품 배송중" ? "selected" : ""
             }value="상품 배송중">상품 배송중</option>
            <option
              class="has-background-grey-light"
             ${
               status === "배송 완료" ? "selected:" : ""
             }value="배송 완료">배송 완료</option>
          </select>
        </div>
      </div>
      <div class="column1">
        <button class="order_cancel" id="deleteBtn-${_id}">
          주문 취소
        </button>
      </div>
    </div>;    
      `
    );

    const statusBox = document.querySelector(`#status-${_id}`);
    const deleteBtn = document.querySelector(`#deleteBtn-${_id}`);

    const index = statusBox.selectedIndex;
    statusBox.className = statusBox[index].className;

    statusBox.addEventListener("change", async () => {
      const value = confirm("수정하시겠습니까?");
      if (value) {
        const newStatus = statusBox.value;
        const data = { status: newStatus };

        const index = statusBox.selectedIndex;
        statusBox.className = statusBox[index].calssName;

        await Api.patch("/api/orders/status", _id, data);
        location.reload();
      }
    });
    deleteBtn.addEventListener("click", async (event) => {
      deleteOrderDate(event, orderNumber);
    });
  }

  ordersCount.innerText = addCommas(summary.ordersCount);
  prepareCount.innerText = addCommas(summary.prepareCount);
  deliveryCount.innerText = addCommas(summary.deliveryCount);
  completeCount.innerText = addCommas(summary.completeCount);
}

//db에 order 삭제
async function deleteOrderDate(event, orderNumber) {
  event.preventDefault();
  const value = confirm("삭제 하시겠습니까?");
  if (value === true) {
    try {
      await Api.delete(`/api/orders/${orderNumber}`);
      alert("주문이 삭제되었습니다.");

      const deleteItem = document.querySelector(`#order-${orderNumDelete}`);
      deleteItem.remove();
    } catch {(err)=>{
      console.log(`주문 삭제 과정에서 오류가 발생하였습니다: ${err}`);
    }}
  }
  window.location.href = "/admin/adminOrder";
}

function cancelDelete() {
  userIdToDelete = "";
  closeModal();
}

//modal용 script
function closeModal() {
  modal.style.display = "none";
}
function openModal() {
  modal.style.display = "flex";
}

/*esc close module*/
document.addEventListener("keydown", keyDownCloseModal);
function keyDownCloseModal(e) {
  if (e.keyCode === 27) {
    closeModal();
  }
}
