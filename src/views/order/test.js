const products = [
  {
    num: 1,
    brand: "nike",
    name: "cap",
    price: "10,000",
    size: "S",
    color: "red",
    category: "idol",
  },
  {
    num: 4,
    brand: "adidas",
    name: "shirt",
    price: "15,000",
    size: "L",
    color: "black",
    category: "actor",
  },
  {
    num: 10,
    brand: "gucci",
    name: "bag",
    price: "100,000",
    size: "free",
    color: "grey",
    category: "singer",
  },
];
// const cost = [];

// products.forEach((product)=> {
//     cost.push(product.price);
// })
// const sum = cost.reduce((a,b) => (a+b));
// console.log('reduce : ', sum);

function addCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const costs = [];
products.forEach((product) => {
  costs.push((product.price));
});
console.log(costs) // ["10,000", "15,000", "100,000"]


const totalCost = [];
costs.forEach((cost) => {
    totalCost.push(Number(cost.split(",").join(""))) 
})
console.log(totalCost) // [10000, 15000, 100000]

const cost = addCommas(totalCost.reduce((a, b)=> a+b));
console.log(cost)

// function patch(endpoint, params ="") {
//     console.log(endpoint)
//     console.log(params)
//     const url = `${endpoint}/${params}`
//     console.log(url);
// }

// const num = 4
// patch("api/products", num);