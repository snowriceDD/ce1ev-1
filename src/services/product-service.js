import { Product }  from '../models';

class ProductService {
    constructor(Product) {
        this.Product = Product
    }
    async findProudct(){
        const product = await Product.findAll({})
        return product;

    }
}

export { ProductService}