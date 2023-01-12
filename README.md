# 👔 Ce1ev. :: celebrity picks.

```
💡 셀럽들이 착용했던 의상들을 기준으로 데이터화하여 소비자에게 착용 정보 제공 및 상품을 판매하는 쇼핑몰 서비스입니다.
```

<img width="960" alt="mainpic" src="https://user-images.githubusercontent.com/113027954/212001425-a9a11910-380e-4524-9617-77693f62dfb2.png">

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
| 김현아 [@kimakuma](https://github.com/kimakuma) | 후기관리, 장바구니, 결제 API |
| 동하 [@donggram2](https://github.com/donggram2) | 장바구니, 제품 상세 , 유저 API | 

## 🗂 디렉토리 구조
```
ce1ev
└─ src
   ├─ app.js
   ├─ middlewares
   ├─ models
   │  ├─ SelectedProduct-model.js
   │  ├─ index.js
   │  ├─ order-model.js
   │  ├─ post-model.js
   │  ├─ product-model.js
   │  ├─ review-model.js
   │  ├─ schemas
   │  │  ├─ SelectedProductSchema.js
   │  │  ├─ order.js
   │  │  ├─ post.js
   │  │  ├─ product.js
   │  │  ├─ review.js
   │  │  ├─ shoppingCart.js
   │  │  └─ user.js
   │  └─ user-model.js
   ├─ routers
   │  ├─ SelectedProduct-model.js
   │  ├─ index.js
   │  ├─ mypage-router.js
   │  ├─ order-router.js
   │  ├─ post-router.js
   │  ├─ product-router.js
   │  ├─ user-router.js
   │  └─ views-router.js
   ├─ services
   │  ├─ index.js
   │  ├─ order-service.js
   │  ├─ post-service.js
   │  ├─ product-service.js
   │  ├─ review-service.js
   │  ├─ selectedProduct-service.js
   │  └─ user-service.js
   └─ views
      ├─ addProduct
      ├─ adminPage
      ├─ adminProductList
      ├─ admin_members
      ├─ admin_orders
      ├─ admin_productDetail
      ├─ admin_reviews
      ├─ api.js
      ├─ aws-s3.js
      ├─ guest
      ├─ guestOrderList
      ├─ home
      ├─ image
      ├─ login
      ├─ memberOrder
      ├─ mypage
      ├─ mypageOrderList
      ├─ notice
      ├─ order
      ├─ order_now
      ├─ postEdit
      ├─ productDetail
      ├─ register
      ├─ updateProduct
      └─ useful-functions.js

```
