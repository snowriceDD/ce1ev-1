import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares";
import { productService } from "../services/product-service";

const productRouter = Router();

productRouter.get("/products", async (req, res, next) => {
  try {
    const product = await productService.getProducts(); //[{..}, {..}, ..]

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

productRouter.get("/products/:num", async (req, res, next) => {
  const num = req.params.num;
  try {
    const product = await productService.getNum(num);
    res.status(200).json(product);
  } catch(err) {
    next(err)
  }
});

productRouter.get("/productDetail/:num", async (req, res, next) => {
  const num = req.params.num;
  try {
    const data = await productService.getNum(num); // [{ brand: 5252 바이 오아이오아이, name: SIGNAUTRE HOODIE, price: 79,000}, {...}, ...]
    const review = await productService.getReviewByProductNo(num);

    const datas = { data, review };

    res.status(200).json(datas);
  } catch(err) {
    next(err)
  }
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
    if (queries.filter((query) => query !== undefined).length > 1) {
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

productRouter.post("/products", loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요."
      );
    }
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
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }

  //console.log(newProduct);//num 안들어감
});

productRouter.post("/productDetail/:productId", loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요."
      );
    }
    const productNo = req.params.productId;
    const { userId, review } = req.body;

    const newReview = await productService.addReview({ productNo, userId, review });

    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

// productRouter.post("/products/:num", async(req, res, next)=> {
//   try{
//     if(is.emptyObject(req.body)) {
//       throw  new Error(
//         "headers의 Content-Type을 application/json으로 설정해주세요."
//       );
//     }

//     const num = req.params.num;
//     const {like} = req.body;
//     const newLike = await productService.SetLikeCount({num, like});
    
//     res.status(201).json(newLike);

//   }catch(err) {
//     next(err);
//   }
// })

productRouter.patch("/products/:num", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요."
      );
    }

    const num = req.params.num;
    const { brand, name, price, size, color, category, description, img, like } =
      req.body;

    //위 데이터가 undefined가 아니라면, 업데이트 객체에 삽입.
    const toUpdate = {
      ...(brand && { brand }),
      ...(name && { name }),
      ...(price && { price }),
      ...(size && { size }),
      ...(color && { color }),
      ...(category && { category }),
      ...(description && { description }),
      ...(img && { img }),
      ...(like && {like})
    };

    const updatedProduct = await productService.setProduct(num, toUpdate);

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/products/:num", async (req, res, next) => {
  try {
    const num = req.params.num;
    const product = await productService.deleteProduct(num);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
