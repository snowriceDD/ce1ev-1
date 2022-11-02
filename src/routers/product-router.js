import { Router } from "express";
import {ProductModel} from "../models/product-model"

const productRouter = Router();

productRouter.get('/', async (req, res) => { 
    const product = await this.ProductModel.findAll(); //[{..}, {..}, ..]

    res.send(product)
});

// productRouter.get('/:id', async (req, res)=> {
//     const id = req.params.id;
//     const product = await Product.findById({id});
//     res.json(product);
// })

// productRouter.get('/:category', async (req, res)=> {
//     const category = req.params.category;

//     const data = await Product.findByCategory({category}) // [{ brand: 5252 바이 오아이오아이, name: SIGNAUTRE HOODIE, price: 79,000}, {...}, ...]
    
//     res.json(data)
// });

// productRouter.get('/?query=name', async (req, res)=> {
//     const name = req.query.name;
//     const data = await Product.findByName({name});
//     res.json(data);
// });

// productRouter.get('/addproduct', async(req, res)=> {
//     res.redirect('/');
// })

// productRouter.post('/addproduct', async(req,res)=> {
    
// })

export { productRouter };
