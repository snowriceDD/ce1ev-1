import { Router } from "express";
import { reviewService } from "../services/review-service";

const mypageRouter = Router();

mypageRouter.get("/mypage/myPageReview/:email", async (req, res, next) => {
  try {
    const { email } = req.params.email;

    const reviews = await reviewService.getReview(email);

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});

export { mypageRouter };
