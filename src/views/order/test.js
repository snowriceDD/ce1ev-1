import  {getToday}  from "../useful-functions.js";


// const products = [
//   {
//     num: 1,
//     brand: "nike",
//     name: "cap",
//     price: "10,000",
//     size: "S",
//     color: "red",
//     category: "idol",
//   },
//   {
//     num: 4,
//     brand: "adidas",
//     name: "shirt",
//     price: "15,000",
//     size: "L",
//     color: "black",
//     category: "actor",
//   },
//   {
//     num: 10,
//     brand: "gucci",
//     name: "bag",
//     price: "100,000",
//     size: "free",
//     color: "grey",
//     category: "singer",
//   },
// ];

// const costs = []

// products.forEach((product)=>{
//   costs.push(convertToNumber(product.price))
// })

// const cost = addCommas(costs.reduce((a, b)=> a+b));
// console.log(!cost)

const orderNumber = Number(
  String(getToday()) + String(Math.random() * 1000000000)
);
console.log(orderNumber)