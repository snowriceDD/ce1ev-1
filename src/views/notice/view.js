import * as Api from "/api.js";

const postView = document.querySelector(".board_view_wrap");

insertPostElement();

async function insertPostElement() {
    const postNo = window.location.pathname.split("/")[2];
    const postData = await Api.get(`/api/posts/${postNo}`)

    const {title, content, user, createdAt, count} = postData;
    const date = createdAt.split("T")[0];

    postView.insertAdjacentHTML(
        "beforeend",
        `
        <div class="board_view">
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
      </div>
      <div class="bt_wrap">
        <a href="/notice" class="on">목록</a>
        <div id="edit_${postNo}" class="edit">수정</div>
      </div>
        `
    )

    const editNoBtn = document.getElementById(`edit_${postNo}`);
    console.log(editNoBtn);
    editNoBtn.addEventListener("click", moveToEditPost);

    function moveToEditPost() {
        window.location.assign(`/postEdit/${postNo}`);
    }

}
