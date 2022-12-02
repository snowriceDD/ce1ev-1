import { model } from "mongoose";
import { SelectedProductSchema } from "./schemas/SelectedProductSchema";

const SelectedProduct = model("selectedProducts", SelectedProductSchema);

export class SelectedProductModel {
  async findAll() {
    const selectedProduct = await SelectedProduct.find({});
    return selectedProduct;
  }
  async create(productInfo) {
    const createdNewSelectedProduct = await Product.create(productInfo);
    return createdNewSelectedProduct;
  }

  //   async update({ num, update }) {
  //     const filter = { num };
  //     const option = { returnOriginal: false };

  //     const updatedProduct = await Product.findOneAndUpdate(
  //       filter,
  //       update,
  //       option
  //     );
  //     return updatedProduct;
  //   }

  //   async delete(num) {
  //     const product = await Product.deleteOne({ num });
  //     return product;
}

const selectedProductModel = new SelectedProductModel();

export { selectedProductModel };
