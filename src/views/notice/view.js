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
    const modalInput = document.getElementsByClassName("modal_input")
    const DeleteModalInput = document.getElementsByClassName("delete_modal_input")

    // editNoBtn.addEventListener("click", moveToEditPost);
    editNoBtn.addEventListener("click", openModal);
    deleteNoBtn.addEventListener("click", openDeleteModal);

    // function moveToEditPost() {
    //     window.location.assign(`/postEdit/${postNo}`);
    // }

    /* >> 모달 확인버튼 누르면 edit page 이동 */
    // y: 비밀번호 검증 어캐 함?
    async function moveToEditPost(e) {
      e.preventDefault();
      const data = await Api.get(`/api/posts/${postNo}`);
      const {password} = data;

      if(modalInput[0].value === password) {
        
        window.location.assign(`/postEdit/${postNo}`);
        closeModal()
      } else {
        alert("비밀번호가 틀렸습니다");
        // closeModal();
      }
    }
    function cancelEdit() {
    closeModal();
    }


    // function moveToDeletePost() {
    //   window.location.assign(`/postEdit/${postNo}`);
    //   closeDeleteModal()
    // }

    function cancelDelete() {
    closeDeleteModal();
    }


    async function moveToDeletePost(e) {
      e.preventDefault();

      const data = await Api.get(`/api/posts/${postNo}`);
      const {password} = data;

      if(DeleteModalInput[0].value === password) {

        try{
          await Api.delete("/api/posts", postNo);
          alert("게시물이 삭제 되었습니다.");

          window.location.href="/notice";
          closeModal();
        }catch(err) {
          alert(`게시물 삭제 중 오류가 발생하였습니다. ${err}`);
        }
      }
    }

    //modal 수정중 

    const modal = document.querySelector("#modal");
    const delete_modal = document.querySelector("#delete_modal");
    // const modalBackground = document.querySelector("#modalBackground");
    const modalCloseButton = document.querySelector("#modalCloseButton");
    const deleteModalCloseButton = document.querySelector("#delete_modalCloseButton");

    const editButton = document.querySelector("#editComplete");
    const editCancelButton = document.querySelector("#editCancelButton");

    const deleteButton = document.querySelector("#delete_deleteComplete");
    const deleteCancelButton = document.querySelector("#delete_deleteCancelButton");

    //addEventListner 묶음
    function addAllEvents() {
      modalCloseButton.addEventListener("click", closeModal);
      deleteModalCloseButton.addEventListener("click", closeModal);
      document.addEventListener("keydown", keyDownCloseModal);

      editButton.addEventListener("click", moveToEditPost);
      editCancelButton.addEventListener("click", cancelEdit);

      deleteButton.addEventListener("click", moveToDeletePost);
      deleteCancelButton.addEventListener("click", cancelDelete);
    }

    addAllEvents();


    //modal용 script
    function closeModal() {
      modal.style.display = "none";
    }
    function openModal() {
      modal.style.display = "flex";
    }

    //delete_modal용 script
    function closeDeleteModal() {
      delete_modal.style.display = "none";
    }
    function openDeleteModal() {
      delete_modal.style.display = "flex";
    }


    /*esc close module*/
    document.addEventListener("keydown", keyDownCloseModal);
    function keyDownCloseModal(e) {
      if (e.keyCode === 27) {
        closeModal();
        closeDeleteModal();
      }
    }

}



