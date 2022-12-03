import express from "express";
import path from "path";

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use("/", serveStatic("home"));
viewsRouter.use("/register", serveStatic("register"));
viewsRouter.use("/login", serveStatic("login"));
viewsRouter.use("/guest", serveStatic("guest"));
viewsRouter.use("/products", serveStatic("addProduct"));
viewsRouter.use("/productDetail/:num", serveStatic("productDetail"));
viewsRouter.use("/mypage", serveStatic("mypage"));
viewsRouter.use("/order_now", serveStatic("order_now"));
viewsRouter.use("/order", serveStatic("order"));
viewsRouter.use("/updateProduct", serveStatic("updateProduct"));
viewsRouter.use("/notice", serveStatic("notice"));
viewsRouter.use("/mypageOrderList/:email", serveStatic("mypageOrderList"));
viewsRouter.use("/guestOrderList/:orderNumber", serveStatic("guestOrderList"));

viewsRouter.use("/mypage/account", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/mypageAccount.html"));
});
viewsRouter.use("/mypage/accountUpdate", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/myAccountUpdate.html"));
});
viewsRouter.use("/mypage/mypageCart", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/mypageCart.html"));
});
viewsRouter.use("/mypage/mypageReview", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/mypageReview.html"));
});
// viewsRouter.use("/mypage/mypageOrderList", (req, res) => {
//   res.sendFile(path.join(__dirname, "../views/mypage/mypageOrderList.html"));
// });
viewsRouter.use("/mypage/withdrawal", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/mypageWithdrawal.html"));
});

viewsRouter.use("/admin", serveStatic("adminPage"));

viewsRouter.get("/admin/adminProductList", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/adminProductList/adminProductList.html")
  );
});

viewsRouter.get("/admin/adminProductDetail/:productId", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/admin_ProductDetail/admin_ProductDetail.html")
  );
});

viewsRouter.use("/adminProductDetail/:productId/updateProduct", serveStatic("updateProduct"));

viewsRouter.use("/admin/adminOrder", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin_orders/admin_orders.html"));
});
viewsRouter.use("/admin/adminMember", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/admin_members/admin_members.html")
  );
});
viewsRouter.use("/admin/adminReview", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin_reviews/admin_reviews.html"));
});
viewsRouter.use("/notice/veiwList", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/notice/view.html"));
});


viewsRouter.use("/notice/write", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/notice/write.html"));
});

viewsRouter.use("/notice/:postNo", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/notice/view.html"));
});

viewsRouter.use("/postEdit/:postNo", serveStatic("postEdit"));

// viewsRouter.use("/postEdit/:postNo", (req, res) => {
//   res.sendFile(path.join(__dirname, "../views/postEdit/postEdit.html"));
// });

viewsRouter.use("/productDetail/:productId/updateProduct", serveStatic("updateProduct"));


// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
