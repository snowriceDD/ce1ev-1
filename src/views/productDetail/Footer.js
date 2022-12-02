const main = document.querySelector(".main");

window.onload = () => {
  main.insertAdjacentHTML(
    "beforeEnd",
    `
  <footer class="footer">
  <address class="address_left">
    <ul class="addressLink">
      <li>
        <a href="/" id="footer_logo">
          Ce1ev.
        </a>
      </li>
      <li>
        <a href="#">개인정보 취급방침</a>
      </li>
      <li>
        <a href="#">이용약관</a>
      </li>
    </ul>

    <div class="addressText">
      <p>셀레브 주식회사 · 대표 김원송 사업자등록번호 : 000-00-00000</p>
      <p>
        사업장소재지 : 경기도 성남시 분당구 분당내곡로 131 판교테크원 타워1, 8층
      </p>
      <p>ⓒ CELEV. Corp.</p>
    </div>
  </address>
  <address class="address_right">
    <p>
      <strong style="font-size: 20px; font-weight: 600">
        고객센터 1588-0000
      </strong>
    </p>
    <p>
      운영시간 평일 11:00 - 18:00 (토∙일, 공휴일 휴무)
      <br />
      점심시간 평일 13:00 - 14:00
      <br />
      1:1 문의하기는 앱에서만 가능합니다.
    </p>
  </address>
</footer>
  `
  );
};

const logoutBtn1 = document.querySelector("#logout1");
const logoutBtn2 = document.querySelector("#logout2");

logoutBtn1.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  window.location.href = "/";
});

logoutBtn2.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  window.location.href = "/";
});
