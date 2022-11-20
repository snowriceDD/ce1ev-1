import { Router } from "express";
import { reviewService } from "../services/review-service";

const mypageRouter = Router();

mypageRouter.get("/mypage/myPageReview/:orderNo", async (req, res, next) => {
  try {
    const info = {orderNumber: req.params.orderNo};

    const reviews = await reviewService.getReview(info);

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});

mypageRouter.post("/mypage/myPageReview/:productId", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요."
      );
    }

    const productNo = req.params.productId;
    const { userId, review } = req.body;

    const newReview = await reviewService.addReview({ productNo, userId, review });

    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

export { mypageRouter };
