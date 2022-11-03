import { model } from "mongoose";
import { ProductSchema } from "./schemas/product";

const Product = model("product", ProductSchema);

export class ProductModel {

  async findById(id){
    const product = await Product.findOne({id});
    return product;
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


  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }

  async findAll() {
    const product = await Product.find({});
    return product;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedProduct = await User.findOneAndUpdate(filter, update, option);
    return updatedProduct;
  }
}

const productModel = new ProductModel();

export { productModel };
