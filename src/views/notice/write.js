import * as Api from "../api.js";
import { checkLogin } from "../useful-functions.js";

const titleInput = document.querySelector('#title');
const nameInput = document.querySelector('#name');
const passwordInput = document.querySelector('#password');
const contentInput = document.querySelector('#content');
const submitBtn = document.querySelector('.on');

checkLogin();
insertUser();
addAllEvents();

function addAllEvents() {
    submitBtn.addEventListener("click", handleSubmit);
}

let userId;
async function insertUser(){
    userId = await Api.get("/api/user");

    const {name} = userId;

    nameInput.value = name;
}

async function handleSubmit(e) {
    e.preventDefault();

    const title = titleInput.value;
    const content = contentInput.value;
    const password = passwordInput.value;
    const user = nameInput.value;

    if(
        !title ||
        !content ||
        !password
    ) {
        return alert("입력하지 않은 값이 있습니다.")
    }

    try {
        const data = {title, content, user, password};

        const result = await Api.post("/api/posts", data);
        if(result) {
            alert(`${result.user} 님의 글이 등록되었습니다.`);
            window.location.href="/notice";
        }
    } catch(err){
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }

}