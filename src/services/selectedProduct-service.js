import { selectedProductModel } from "../models";

class SelectedProductService {
  constructor(model) {
    this.model = model;
  }
  async addSelectedProduct(productInfo) {
    const { num, brand, name, price, size, color, category } = productInfo;

    // db에 저장
    const createdNewProduct = await this.model.create(productInfo);

    return createdNewProduct;
  }
}

const selectedProductService = new SelectedProductService(selectedProductModel);

export { selectedProductService };
