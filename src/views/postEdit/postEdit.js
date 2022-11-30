import * as Api from "/api.js";

const editBtn = document.getElementById('editBtn');
const titleInput = document.getElementById('titleInput');
const userInput = document.getElementById("userInput");
const passwordInput = document.getElementById("passwordInput");
const contentInput = document.getElementById("contentInput");

insertEditElement();

let postData;
async function insertEditElement() {
    const postNo = window.location.pathname.split("/")[2];

    postData = await Api.get(`/api/notice/${postNo}`);

    const {title, user, password, content} = postData;

    titleInput.value = title;
    userInput.valeu = user;
    passwordInput.value = password;
    contentInput.value = content;

    editBtn.addEventListener("click", savePostData);
    
}

async function savePostData(e) {
    e.preventDefault();

    const postNo = window.location.pathname.split("/")[2];
    const title = titleInput.value;
    const user = userInput.value;
    const password = passwordInput.value;
    const content = contentInput.value;
    
    const data = {postNo};

    if(title !== postData.title) {
        data.title = title;
    }

    if(user !== postData.user) {
        data.user = user;
    }
    
    if(password !== postData.password) {
        data.password = password;
    }

    if(content != postData.content) {
        data.content = content;
    }

    const toUpdate = Object.keys(data);
    if(toUpdate.length === 1) {
        alert("수정한 정보가 없습니다.")
    }

    try{
        const {postNo} = postData;
        await Api.patch("/api/notice", postNo, data);
        alert("게시물이 수정되었습니다.")
        window.location.assign("/notice");
    } catch(err) {
        alert(`게시물 수정 과정에서 오류가 발생하였습니다: ${err}`)
    }
}