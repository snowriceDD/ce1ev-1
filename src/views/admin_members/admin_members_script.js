
import * as Api from "/api.js";
import { addCommas, checkAdmin } from "../useful-functions.js";

const usersCount = document.querySelector("#usersCount");
const adminCount = document.querySelector("#adminCount");
const listing = document.querySelector(".listing-user");

const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modalBackground")
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteCompleteButton = document.querySelector('#deleteComplete');
const deleteCancelButton = document.querySelector("#deleteCancelButton");

//admimn checking 함수 필요
checkAdmin();
insertUsers();
addAllEvents();

function addAllEvents() {
    modalBackground.addEventListener("click", closeModal);
    modalCloseButton.addEventListener("click", closeModal);
    document.addEventListener("keydown", keyDownCloseModal);
    deleteCompleteButton.addEventListener("click", deleteUserDate);
    deleteCancelButton.addEventListener("click", cancelDelete);
}

let userIdToDelete;
async function insertUsers() {
  const users = await Api.get("/api/userlist");

  const summary = {
    usersCount:0,
    adminCount:0,
  };

  for(const user of users) {
    const {_id, email, name, role, createdAt} = user;
    const date = createdAt.split("T")[0];

    summary.usersCount += 1;

    if(role === "admin") {
      summary.adminCount += 1;
    }
    listing.insertAdjacentHTML(
      "beforeend", 
      `
      <div class="listing" id="user-${_id}">
        <div class="column1" id="date" >${date}</div>
        <div class="column1" id="email">${email}</div>
        <div class="column1" id="name">${name}</div>
        <div class="column1" id="auth">${role}</div>
        <div class="column1" id="admin">
          <div class="select">
            <select name="sB" id="roleSelect-${_id}">
              <option ${role==="일반회원"?"selected":""} value="일반회원">일반회원</option>
              <option ${role==="admin"?"selected": ""}value="admin">admin</option>
            </select>
          </div> 
        </div>
        <div class="column1">
          <button class="order_cancel" id="deleteBtn-${_id}"> 회원정보 삭제 </button>
        </div>
      </div>
    `
    );

    const roleSelectBox = document.querySelector(`#roleSelect-${_id}`);
    const deleteBtn = document.querySelector(`#deleteBtn-${_id}`);

    const index = roleSelectBox.selectedIndex;
    roleSelectBox.className = roleSelectBox[index].className;

    roleSelectBox.addEventListener("change", async()=> {
      const newRole = roleSelectBox.value;
      const data = {role: newRole};

      const index = roleSelectBox.selectedIndex;
      roleSelectBox.className = roleSelectBox[index].className;

      await Api.patch("/api/users/role", _id, data);
    });

    deleteBtn.addEventListener("click", async ()=> {
      userIdToDelete = _id;
      openModal();
    });
  }

  usersCount.innerText = addCommas(summary.usersCount);
  adminCount.innerText = addCommas(summary.adminCount);
}

//db삭제
async function deleteUserDate(e) {
  e.preventDefault();

  try {
    await Api.delete("/api/users", userIdToDelete);

    alert("회원이 삭제되었습니다.");

    const deleteItem = document.querySelector(`#user-${userIdToDelete}`);
    deleteItem.remove();

    userIdToDelete="";

    closeModal();
  }catch(err) {
    alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
  }
}

function cancelDelete() {
  userIdToDelete = "";
  closeModal();
}


// modal용 script
const order_cancel = document.getElementById("order_cancel_btn");
function closeModal() {
  modal.style.display = "none";
}
function openModal() {
  modal.style.display = "flex";
}


/*esc close module*/
function keyDownCloseModal(e) {
  if (e.keyCode === 27) {
    closeModal();
  }
}
