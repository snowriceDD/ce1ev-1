import * as Api from "/api.js";

const postView = document.querySelector(".board_view");

// const titleInput = document.querySelector('.title');
// const contentInput = document.querySelector(".cont");
// const postNoInput = document.querySelector(".number");
// const userInput = document.querySelector(".user");

insertPostElement();

async function insertPostElement() {
    const postNo = window.location.pathname.split("/")[2];
    const postData = await Api.get(`/api/posts/${postNo}`)

    const {title, content, user, createdAt, count} = postData;
    const date = createdAt.split("T")[0];

    postView.insertAdjacentHTML(
        "beforeend",
        `
        <div class="title">${title}</div>
    <div class="info">
        <dl>
            <dt>번호</dt>
            <dd class="number">${postNo}</dd>
        </dl>
        <dl>
            <dt>글쓴이</dt>
            <dd class="user">${user}</dd>
        </dl>
        <dl>
            <dt>작성일</dt>
            <dd class="date">${date}</dd>
        </dl>
        <dl>
            <dt>조회</dt>
            <dd>${count}</dd>
        </dl>
    </div>
    <div class="cont">${content}</div>
  
        `
    )


}