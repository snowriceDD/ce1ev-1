import { Router } from "express";
import {ProductModel} from "../models/product-model"
import { productService } from "../services/product-service";

const productRouter = Router();

productRouter.get('/', async (req, res) => { 
    const product = await productService.findProudct(); //[{..}, {..}, ..]

    // res.render('template/postProduct', {product})
    res.json(product)
});

// productRouter.get('/:id', async (req, res)=> {
//     const id = req.params.id;
//     const product = await Product.findById({id});
//     res.json(product);
// })

productRouter.get('/:category', async (req, res)=> {
    const category = req.params.category;

    const data = await productService.findCategory(category) // [{ brand: 5252 바이 오아이오아이, name: SIGNAUTRE HOODIE, price: 79,000}, {...}, ...]
    
    res.json(data)
});

productRouter.get('/products/:brand', async (req, res)=> {
    const brand = req.params.brand;
    const data = await productService.findBrand(brand) // [{ brand: 5252 바이 오아이오아이, name: SIGNAUTRE HOODIE, price: 79,000}, {...}, ...]

    res.json(data)
});

productRouter.post('/products', async(req, res)=> {
    const {num, brand, name, price, size, color, category, description, img} = req.body;

    const newProduct = await productService.addProduct({
        num,
        brand, 
        name, 
        price, 
        size, 
        color, 
        category, 
        description, 
        img
    })

    res.json(newProduct);
    
})

// productRouter.get('/?query=name', async (req, res)=> {
//     const name = req.query.name;
//     const data = await Product.findByName({name});
//     res.json(data);
// });

// productRouter.get('/addproduct', async(req, res)=> {
//     res.redirect('/');
// })

export { productRouter };
