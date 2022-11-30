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
        <div id="delete${postNo}" class="edit">삭제</div>
      </div>
        `
    )

    const editNoBtn = document.getElementById(`edit_${postNo}`);
    const deleteNoBtn = document.getElementById(`delete${postNo}`);

    editNoBtn.addEventListener("click", moveToEditPost);
    deleteNoBtn.addEventListener("click", deletePost);

    function moveToEditPost() {
        window.location.assign(`/postEdit/${postNo}`);
    }

    async function deletePost() {
      const value = confirm("해당 게시글을 삭제하시겠습니까?")
      if(value) {
        try{
          await Api.delete("/api/posts", postNo);
          alert("게시물이 삭제 되었습니다.");

          window.location.href="/notice";
        }catch(err) {
          alert(`게시물 삭제 중 오류가 발생하였습니다. ${err}`);
        }
      }
    }

}
