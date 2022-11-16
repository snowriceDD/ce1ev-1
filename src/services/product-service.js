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

  async getReviewByProductNo(productNo) {
    const review = await productModel.findReviewByProduct(productNo);
    return review;
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
    // console.log(newProductInfo)

    // db에 저장
    const createdNewProduct = await this.model.create(newProductInfo);

    return createdNewProduct;
  }

  async addReview(reviewInfo) {
    const curObj = await productModel.findNewestReview();
    const curNum = curObj[0].reviewNo;
    const reviewNo = curNum + 1;

    const { productNo, userId, review } = reviewInfo;
    const newReviewInfo = { reviewNo, productNo, userId, review };

    const createdNewReview = await productModel.createReview(newReviewInfo);

    return createdNewReview;
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
