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
viewsRouter.use("/order", serveStatic("order"));
viewsRouter.use("/updateProduct", serveStatic("updateProduct"));

viewsRouter.get("/mypage/account", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/mypageAccount.html"));
});
viewsRouter.get("/mypage/accountUpdate", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/myAccountUpdate.html"));
});
viewsRouter.get("/mypage/myPageCart", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/myPageCart.html"));
});
viewsRouter.get("/mypage/myPageOrderList", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/myPageOrderList.html"));
});
viewsRouter.get("/mypage/withdrawal", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/myPageWithDrawal.html"));
});

viewsRouter.use("/admin", serveStatic("adminPage"));
viewsRouter.get("/admin/adminCategory", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/admin_Category/admin_Category.html")
  );
});
viewsRouter.get("/admin/adminProductList", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/adminProductList/adminProductList.html")
  );
});
viewsRouter.get("/admin/adminOrder", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin_orders/admin_orders.html"));
});
viewsRouter.get("/admin/adminMember", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../views/admin_members/admin_members.html")
  );
});
viewsRouter.get("/mypage/myAccountUpdate", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mypage/myAccountUpdate.html"));
});

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
