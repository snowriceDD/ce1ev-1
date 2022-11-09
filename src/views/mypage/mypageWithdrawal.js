import * as Api from "/api.js";

const passwordInput = document.querySelector("#passwordInput");
const withdrawalBtn = document.querySelector("#withdrawal");

addAllEvents();

function addAllEvents() {

    withdrawalBtn.addEventListener("click", deleteUserData);
}

async function deleteUserData(e) {
    e.preventDefault();

    const password = passwordInput.value;
    const data = {password};

    const value = confirm("정말로 탈퇴하시겠습니까?")
    if(value === true) {
        try {
            const userToDelete = await Api.post("/api/user/password/check", data);
            const {_id} = userToDelete;
    
            await Api.delete("/api/users", _id);
    
            alert("회원 탈퇴 되었습니다.");    
            sessionStorage.removeItem("token");

            window.location.href ="/";
        } catch(err) {
            alert(`탈퇴중 오류가 발생하였습니다. ${err}`);
        }
    }
}



