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

mypageRouter.get("/admin/adminReview-review", async (req, res, next) => {
  try {
    const reviews = await reviewService.getReview();

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});

mypageRouter.post("/mypage/myPageReview", async (req, res, next) => {
  try {
    const newReview = await reviewService.addReview(req.body);

    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

mypageRouter.delete("/mypage/myPageReview", async (req, res, next) => {
  try {
    const deletedReview = await reviewService.deleteReview(req.body);

    res.status(201).json(deletedReview);
  } catch (err) {
    next(err);
  }
});

export { mypageRouter };
