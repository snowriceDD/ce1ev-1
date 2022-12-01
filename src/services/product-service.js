import { productModel } from "../models";

class ProductService {
  constructor(model) {
    this.model = model;
  }
  async getProducts() {
    const product = await this.model.findAll({});
    return product;
  }
  async getId(productId){
    const product = await this.model.findOne(productId)
    return product;
  }

  async getNum(num) {
    const product = await this.model.findByNumber(num);
    return product;
  }

  async getCategory(category) {
    const product = await productModel.findByCategory(category);
    return product;
  }

  async addProduct(productInfo) {
    const curObj = await this.model.findNewest();
    const curNum = curObj[0].num;
    const { brand, name, price, size, color, category, description, img } =
      productInfo;
    const num = curNum + 1;
    const newProductInfo = {
      num,brand,name,price, size, color, category, description, img,
    };

    const createdNewProduct = await this.model.create(newProductInfo);

    return createdNewProduct;
  }

  async setProduct(num, toUpdate) {
    const updatedProduct = await this.model.update({
      num,
      update: toUpdate,
    });

    return updatedProduct;
  }

  async deleteProduct(num) {
    const product = await this.model.delete(num);
    return product;
  }
}

const productService = new ProductService(productModel);

export { productService };
