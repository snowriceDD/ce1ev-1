import { Router } from "express";
import { orderService } from "../services/order-service";
import { adminOnly, loginRequired } from "../middlewares";
import is from "@sindresorhus/is";

const orderRouter = Router();

orderRouter.get("/orderlist/all", adminOnly, async (req, res, next) => {
  //모든 주문 정보 조회
  try {
    const orders = await orderService.getOrders();

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

orderRouter.get("/orderlist/user", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

//주문 번호로
orderRouter.get("/orders/:orderNumber", async (req, res, next) => {
  //해당 주문정보 조회
  try {
    const orderNumber = req.params.orderNumber;
    const order = await orderService.getOrderNumber(orderNumber);

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

orderRouter.get(
  "/myOrders/:email",
  // loginRequired,
  async (req, res, next) => {
    //해당 주문정보 조회
    try {
      const email = req.params.email;
      const order = await orderService.getOrderByEmail(email);

      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }
);

orderRouter.post("/orders", async (req, res, next) => {
  // 주문 생성
  try {
    const userId = req.currentUserId;
    const { orderNumber, products, cost, count, payMethod, status, email } =
      req.body;

    const newOrder = await orderService.addOrder({
      userId,
      orderNumber,
      products,
      cost,
      count,
      payMethod,
      status,
      email,
    });
    console.log(userId);

    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

orderRouter.patch(
  "/orders/status/:orderId",
  loginRequired,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요."
        );
      }

      const orderId = req.params.orderId;
      const status = req.body.status;
      const updateOrderInfo = await orderService.setStatus(orderId, status);

      res.status(200).json(updateOrderInfo);
    } catch (err) {
      next(err);
    }
  }
);

orderRouter.delete("/orders/:orderId", adminOnly, async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.deleteOrder(orderId);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});
orderRouter.post("/guest", async function (req, res, next) {
  try {
    const email = req.body.email;
    const orderNumber = req.body.orderNumber;

    const guestOrderList = await orderService.getGuestInfo({
      email,
      orderNumber,
    });
    res.status(200).json(guestOrderList);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
