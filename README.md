# 👔 Ce1ev. :: celebrity picks.

```
💡 셀럽들이 착용했던 의상들을 기준으로 데이터화하여 소비자에게 착용 정보 제공 및 상품을 판매하는 쇼핑몰 서비스입니다.
```

<img src="https://user-images.githubusercontent.com/113027954/211980451-eab4c9e7-c25c-48e6-a71f-34a94ebd8a05.png" width="960" >

## ⭐️ About Project

```
소비자들은 셀럽들을 선망하고 그들이 미치는 영향력의 대상이 됩니다. 
우리는 셀럽의 영향력을 이용하고자 하여 셀럽들의 아이템에 중점을 둔 쇼핑몰을 기획하였습니다.
```

## 📄 Summary

- 메인 페이지
    - 검색 기능을 통한 키워드 검색(상품명, 셀럽명, 셀럽 분류)
    - 카테고리 필터를 통한 셀럽 분류 별 상품 표시
    - 무한 스크롤로 끊임없는 상품 소개
    - 상품 블럭 위치에서 좋아요 기능 구현
    - ImagelazyLoading을 통한 웹 성능 최적화
- 상품 상세 페이지
    - 제품 사이즈 및 색상 선택과 수량 조절
    - 바로 구매 & 장바구니 기능 구현
    - 리뷰 및 문의 기능 구현
- 마이 페이지
    - 회원정보 수정
    - 회원 탈퇴
    - 주문 관리(주문내역 조회/삭제)
    - 장바구니 관리
    - 상품후기 관리(등록/삭제)
- 관리자 페이지
    - 상품 관리(등록/수정/삭제)
    - 주문 내역 전체 조회
    - 배송 상태 관리
    - 상품 후기 관리
    - 회원 관리
    - 공지사항 관리(등록/수정/삭제)
- 비회원 주문


## ⚒ 기술 스택

<img src="https://user-images.githubusercontent.com/113027954/211986343-fd13d56c-1c80-41e9-aaf8-1ff71ea1e1da.png" width="960" >


### 💻 주요 기능

<details><summary>상품 상세페이지</summary>
<img width="960" alt="상세페이지" src="https://user-images.githubusercontent.com/113027954/211991956-e3bda172-e248-48ac-8872-b46edda63b83.png">
</details>
<details><summary>장바구니</summary>
<img width="960" alt="장바구니 페이지" src="https://user-images.githubusercontent.com/113027954/211991553-7c89cac2-6eb7-4b9e-a4ba-8cffa14e659d.png">
</details>
<details><summary>결제페이지</summary>
<img width="960" alt="결제페이지" src="https://user-images.githubusercontent.com/113027954/211992033-ea1506c3-6874-4eba-8135-cb67a87a164e.png">
</details>
<details><summary>주문조회 페이지</summary>
<img width="960" alt="주문내역 조회" src="https://user-images.githubusercontent.com/113027954/211992053-4b62d3fa-9af0-4159-b477-79d91a0f018d.png">
</details>


## 👤 테스트 계정

  ```
  - 👨‍ 사용자
  ID: test555@example.com
  PW: 123123123 
  ```
  ```
  - 👨‍🔧 관리자
  ID: admin555@example.com
  PW: 123123123 
 ```

## 👨‍👩‍👦‍👦 Responsibility
| 담당자명(GitHub) | 담당 파트 |
| --- | --- |
| 박재훈 [@noorong](https://github.com/noorong) | 전체 UI design 및 개발, 검색, 카테고리 기능 개발, Nginx배포, 로그인, 회원가입 기능 구현 |
| 김윤수 [@snowriceDD](https://github.com/snowriceDD) | 홈, 지도 기능, 프론트 배포, msw |
| 송주혜 [@Zuhye](https://github.com/Zuhye) | 홈, 로그인, 회원가입, 회원정보 수정, 네비바 |
| 김현아 [@kimakuma](https://github.com/kimakuma) | 마이페이지, 매칭 이력 페이지 |
| 동하 [@donggram2](https://github.com/donggram2) | 장바구니, 모집글 참여현황 API, 카페정보 API |

```
ce1ev
├─ .eslintrc.json
├─ .git
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ master
│  │     └─ remotes
│  │        └─ origin
│  │           └─ HEAD
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-0dca4643deda9b09e6b2bc00f38a721c5f3bb7c3.idx
│  │     └─ pack-0dca4643deda9b09e6b2bc00f38a721c5f3bb7c3.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ README.md
├─ adminAccount.json
├─ babel.config.json
├─ index.js
├─ package-lock.json
├─ package.json
├─ src
│  ├─ app.js
│  ├─ middlewares
│  │  ├─ admin-only.js
│  │  ├─ error-handler.js
│  │  ├─ index.js
│  │  └─ login-required.js
│  ├─ models
│  │  ├─ SelectedProduct-model.js
│  │  ├─ index.js
│  │  ├─ order-model.js
│  │  ├─ post-model.js
│  │  ├─ product-model.js
│  │  ├─ review-model.js
│  │  ├─ schemas
│  │  │  ├─ SelectedProductSchema.js
│  │  │  ├─ order.js
│  │  │  ├─ post.js
│  │  │  ├─ product.js
│  │  │  ├─ review.js
│  │  │  ├─ shoppingCart.js
│  │  │  └─ user.js
│  │  └─ user-model.js
│  ├─ routers
│  │  ├─ SelectedProduct-model.js
│  │  ├─ index.js
│  │  ├─ mypage-router.js
│  │  ├─ order-router.js
│  │  ├─ post-router.js
│  │  ├─ product-router.js
│  │  ├─ user-router.js
│  │  └─ views-router.js
│  ├─ services
│  │  ├─ index.js
│  │  ├─ order-service.js
│  │  ├─ post-service.js
│  │  ├─ product-service.js
│  │  ├─ review-service.js
│  │  ├─ selectedProduct-service.js
│  │  └─ user-service.js
│  └─ views
│     ├─ addProduct
│     │  ├─ addProduct.css
│     │  ├─ addProduct.html
│     │  └─ addProduct.js
│     ├─ adminPage
│     │  ├─ adminPage.css
│     │  ├─ adminPage.html
│     │  └─ adminPage.js
│     ├─ adminProductList
│     │  ├─ adminProductList.css
│     │  ├─ adminProductList.html
│     │  └─ adminProductList.js
│     ├─ admin_members
│     │  ├─ admin_members.html
│     │  ├─ admin_members_script.js
│     │  └─ admin_members_style.css
│     ├─ admin_orders
│     │  ├─ admin_orders.html
│     │  ├─ admin_orders_script.js
│     │  └─ admin_orders_style.css
│     ├─ admin_productDetail
│     │  ├─ Footer.js
│     │  ├─ HeaderFooter.css
│     │  ├─ admin_productDetail.css
│     │  ├─ admin_productDetail.html
│     │  ├─ admin_productDetail.js
│     │  ├─ changeHeader.js
│     │  └─ reset.css
│     ├─ admin_reviews
│     │  ├─ admin_reviews.css
│     │  ├─ admin_reviews.html
│     │  └─ admin_reviews.js
│     ├─ api.js
│     ├─ aws-s3.js
│     ├─ elice-rabbit-favicon.png
│     ├─ elice-rabbit.png
│     ├─ guest
│     │  ├─ guest.css
│     │  ├─ guest.html
│     │  └─ guest.js
│     ├─ guestOrderList
│     │  ├─ Footer.js
│     │  ├─ HeaderFooter.css
│     │  ├─ changeHeader.js
│     │  ├─ guestOrderList.css
│     │  ├─ guestOrderList.html
│     │  └─ guestOrderList.js
│     ├─ home
│     │  ├─ category.js
│     │  ├─ categoryfilter.js
│     │  ├─ changeHeader.js
│     │  ├─ home.css
│     │  ├─ home.html
│     │  ├─ home.js
│     │  ├─ product.js
│     │  ├─ reset.css
│     │  ├─ searching.js
│     │  ├─ slideScript.js
│     │  └─ slideStyle.css
│     ├─ image
│     │  ├─ celev_logo.PNG
│     │  ├─ left.png
│     │  ├─ like.png
│     │  ├─ like_hover.png
│     │  ├─ login.PNG
│     │  ├─ mainPage.PNG
│     │  ├─ profile.png
│     │  ├─ register.PNG
│     │  ├─ register.gif
│     │  ├─ right.png
│     │  ├─ search_img.png
│     │  ├─ slide1.png
│     │  ├─ slide2.png
│     │  ├─ slide3.png
│     │  ├─ slide4.png
│     │  └─ 뉴진스01.jpg
│     ├─ login
│     │  ├─ login.css
│     │  ├─ login.html
│     │  └─ login.js
│     ├─ memberOrder
│     │  ├─ memberOrder.css
│     │  └─ memberOrder.html
│     ├─ mypage
│     │  ├─ Footer.js
│     │  ├─ HeaderFooter.css
│     │  ├─ header.js
│     │  ├─ myAccountUpdate.css
│     │  ├─ myAccountUpdate.html
│     │  ├─ myAccountUpdate.js
│     │  ├─ mypage.css
│     │  ├─ mypage.html
│     │  ├─ mypage.js
│     │  ├─ mypageAccount.css
│     │  ├─ mypageAccount.html
│     │  ├─ mypageAccount.js
│     │  ├─ mypageCart.css
│     │  ├─ mypageCart.html
│     │  ├─ mypageCart.js
│     │  ├─ mypageReview.css
│     │  ├─ mypageReview.html
│     │  ├─ mypageReview.js
│     │  ├─ mypageWithdrawal.css
│     │  ├─ mypageWithdrawal.html
│     │  └─ mypageWithdrawal.js
│     ├─ mypageOrderList
│     │  ├─ Footer.js
│     │  ├─ HeaderFooter.css
│     │  ├─ changeHeader.js
│     │  ├─ mypageOrderList.css
│     │  ├─ mypageOrderList.html
│     │  ├─ mypageOrderList.js
│     │  └─ reset.css
│     ├─ notice
│     │  ├─ css
│     │  │  ├─ css.css
│     │  │  ├─ media.css
│     │  │  ├─ notice.css
│     │  │  └─ reset.css
│     │  ├─ notice.html
│     │  ├─ notice.js
│     │  ├─ view.html
│     │  ├─ view.js
│     │  ├─ write.html
│     │  └─ write.js
│     ├─ order
│     │  ├─ order.css
│     │  ├─ order.html
│     │  ├─ order.js
│     │  ├─ reset.css
│     │  └─ test.js
│     ├─ order_now
│     │  ├─ Footer.js
│     │  ├─ order_now.css
│     │  ├─ order_now.html
│     │  ├─ order_now.js
│     │  └─ reset.css
│     ├─ postEdit
│     │  ├─ footer.js
│     │  ├─ headerfooter.css
│     │  ├─ postEdit.css
│     │  ├─ postEdit.html
│     │  └─ postEdit.js
│     ├─ productDetail
│     │  ├─ Footer.js
│     │  ├─ HeaderFooter.css
│     │  ├─ changeHeader.js
│     │  ├─ productDetail.css
│     │  ├─ productDetail.html
│     │  └─ productDetail.js
│     ├─ register
│     │  ├─ register.css
│     │  ├─ register.html
│     │  └─ register.js
│     ├─ updateProduct
│     │  ├─ updateProduct.css
│     │  ├─ updateProduct.html
│     │  └─ updateProduct.js
│     └─ useful-functions.js
└─ temp.txt

```