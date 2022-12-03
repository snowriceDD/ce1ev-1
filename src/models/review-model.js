import { model } from "mongoose";
import { ReviewSchema } from "./schemas/review";

const Review = model("reviews", ReviewSchema);

export class ReviewModel {
  async findNewestReview() {
    const review = await Review.find().sort({ reviewNo: -1 });
    return review;
  }

  async findByInfo(info) {
    const reviews = await Review.find(info);
    return reviews;
  }

  async findAll() {
    const allreview = await Review.find({});
    return allreview;
  }

  async createReview(reviewInfo) {
    const createdNewReview = await Review.create(reviewInfo);
    return createdNewReview;
  }

  async deleteReview(reviewInfo) {
    const deletedReview = await Review.deleteOne(reviewInfo);
    return deletedReview;
  }

  async delete(orderNo) {
    const deletedReview = await Review.deleteOne({orderNo: orderNo});
    return deletedReview;
  }
}

const reviewModel = new ReviewModel();

export { reviewModel };
