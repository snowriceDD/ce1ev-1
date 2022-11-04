import { productModel }  from '../models';

class ProductService {
    constructor(model) {
        this.model = model
    }
    async findProudct(){
        const product = await productModel.findAll({})
        return product;
    }

    async findCategory(category){
        const product = await productModel.findByCategory(category)
        return product;
    }

    async findBrand(brand){
        const product = await productModel.findByBrand(brand)
        return product;
    }

    async addProduct(productInfo) {
        const {num, brand, name, price, size, color, category, description, img} = productInfo;

        const newProductInfo =  {num, brand, name, price, size, color, category, description, img};

        // db에 저장
        const createdNewProduct = await productModel.create(newProductInfo);

        return createdNewProduct;
    }
}

const productService = new ProductService(productModel);

export { productService}