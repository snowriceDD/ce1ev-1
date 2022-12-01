import { reviewModel } from "../models";

class ReviewService {
  constructor(model) {
    this.model = model;
  }

  async getReview(info) {
    const review = await reviewModel.findByInfo(info);
    return review;
  }

  async addReview(reviewInfo) {
    const curObj = await reviewModel.findNewestReview();
    const curNum = curObj[0].reviewNo;
    const reviewNo = curNum + 1;

    const { orderNo, productNo, userId, review } = reviewInfo;
    const newReviewInfo = { reviewNo, orderNo, productNo, userId, review };

    const createdNewReview = await reviewModel.createReview(newReviewInfo);

    return createdNewReview;
  }

  async deleteReview(reviewInfo) {
    const deletedReview = await reviewModel.deleteReview(reviewInfo);

    return deletedReview;
  }

  async delete(orderNo) {
    const deletedReview = await reviewModel.delete(orderNo);

    return deletedReview;
  }
}

const reviewService = new ReviewService(reviewModel);

export { reviewService };
