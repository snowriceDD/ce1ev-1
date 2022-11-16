import { model } from "mongoose";
import { ProductSchema } from "./schemas/product";
import { ReviewSchema } from "./schemas/review";

const Product = model("products", ProductSchema);
const Review = model("reviews", ReviewSchema);

export class ProductModel {
  async findByNumber(num) {
    const product = await Product.findOne({ num });
    return product;
  }
  async findById(productId) {
    const product = await Product.findOne({ _id : productId });
    return product;
  }

  async findNewest() {
    const product = await Product.find().sort({ num: -1 });
    return product;
  }

  async findNewestReview() {
    const review = await Review.find().sort({ reviewNo: -1 });
    return review;
  }

  async findByBrand(brand) {
    const product = await Product.find({ brand });
    return product;
  }

  async findByname(name) {
    const product = await Product.findOne({ name });
    return product;
  }
  
  async findByCategory(category) {
    const product = await Product.find({ category });
    return product;
  }

  async findByDescription(description) {
    const product = await Product.find({ description });
    return product;
  }

  async findReviewByProduct(productNo) {
    const review = await Review.find({ productNo })
    return review;
  }

  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async createReview(reviewInfo) {
    const createdNewReview = await Review.create(reviewInfo);
    return createdNewReview;
  }

  async findAll() {
    const product = await Product.find({});
    return product;
  }

  async update({ num, update }) {
    const filter = { num };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
    return updatedProduct;
  }

  async delete(num) {
    const product = await Product.deleteOne({ num });
    return product;
  }
}

const productModel = new ProductModel();

export { productModel };
