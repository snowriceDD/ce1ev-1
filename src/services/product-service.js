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

  // async findBrand(brand) {
  //   const product = await productModel.findByBrand(brand);
  //   return product;
  // }

  // async findName(name) {
  //   const product = await productModel.findByname(name);
  //   return product;
  // }

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
    // console.log(newProductInfo)

    // db에 저장
    const createdNewProduct = await this.model.create(newProductInfo);

    return createdNewProduct;
  }

  async updateProduct(productInfo, toUpdate) {
    const { num, brand, name, price, size, color, category, description, img } =
      productInfo;

    let product = await this.model.findByNum(num);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error("해당 상품이 없습니다. 다시 한 번 확인해 주세요.");
    }
  }

  async deleteProduct(num) {
    const product = await this.model.delete(num);
    return product;
  }
}

const productService = new ProductService(productModel);

export { productService };
