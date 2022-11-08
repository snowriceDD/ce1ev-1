import is from "@sindresorhus/is";
import { Router } from "express";
import { ProductModel } from "../models";
import { productService } from "../services/product-service";

const productRouter = Router();

productRouter.get("/products", async (req, res) => {
  const product = await productService.getProducts(); //[{..}, {..}, ..]

  // res.render('template/postProduct', {product})
  res.json(product);
});

productRouter.get('/products/:num', async (req, res)=> {
    const num = req.params.num;
    const product = await productService.getNum(num);
    res.json(product);
})


productRouter.get("/productDetail/:num", async (req, res) => {
    const num = req.params.num;
    const data = await productService.getNum(num); // [{ brand: 5252 바이 오아이오아이, name: SIGNAUTRE HOODIE, price: 79,000}, {...}, ...]
  
    res.json(data);
  });

productRouter.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  const data = await productService.getId(productId);

  res.json(data);
});

productRouter.get("/products", async (req, res, next) => {
  try {
    const { category, num, brand } = req.query;

    const queries = [category, num, brand];
    if (queries.filter(query => query !== undefined).length > 1) {
      throw new Error("제품 조회 조건은 하나만 가능합니다");
    }
    if (category !== undefined) {
      const products = await productService.getProductsByCategory(category);
      res.json({
        error: null,
        data: products,
      });
      return;
    }
    if (num !== undefined) {
      const products = await productService.getProductsByNumber(num);
      res.json({
        error: null,
        data: products,
      });
      return;
    }
    if (brand !== undefined) {
      const products = await productService.getProductsByBrand(brand);
      res.json({
        error: null,
        data: products,
      });
      return;
    }
    const products = await productService.getProducts();
    res.json({
      error: null,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});



// productRouter.get("/products/:brand", async (req, res) => {
//   const brand = req.params.brand;
//   const data = await productService.findBrand(brand); // [{ brand: 5252 바이 오아이오아이, name: SIGNAUTRE HOODIE, price: 79,000}, {...}, ...]

//   res.json(data);
// });

productRouter.post("/products", async (req, res) => {
  const { brand, name, price, size, color, category, description, img } =
    req.body;
  const newProduct = await productService.addProduct({
    brand,
    name,
    price,
    size,
    color,
    category,
    description,
    img,
  });
  //console.log(newProduct);//num 안들어감
  res.json(newProduct);
});


productRouter.patch("/products/:num", async (req, res, next)=> {
  try{
    if(is.emptyObject(req.body)) {
      throw new Error("headers의 Content-Type을 application/json으로 설정해주세요.")
    };

    const num = req.params.num;
    const { brand, name, price, size, color, category, description, img} = req.body;

    //위 데이터가 undefined가 아니라면, 업데이트 객체에 삽입.
    const toUpdate = {
      ...(brand && {brand}), 
      ...(name && {name}),
      ...(price && {price}),
      ...(size && {size}),
      ...(color && {color}),
      ...(category && {category}),
      ...(description && {description}),
      ...(img && {img}),
    };

    const updatedProduct = await productService.setProduct(
      num,
      toUpdate
    );

    res.status(200).json(updatedProduct);

  } catch(error) {
    next(error);
  }
})

productRouter.delete('/products/:num', async (req, res, next) => {
  try{
    const num = req.params.num;
    const product = await productService.deleteProduct(num);

    res.status(200).json(product);
  } catch(error) {
    next(error)
  }
  
});

export { productRouter };
