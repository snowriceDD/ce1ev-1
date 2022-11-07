const products = [
    {
        num: 1,
        brand: "nike",
        name: "cap",
        price: 10000,
        size: "S",
        color: "red",
        category: "idol",
    },
    {
        num: 4,
        brand: "adidas",
        name: "shirt",
        price: 15000,
        size: "L",
        color: "black",
        category: "actor",
    },
    {
        num: 10,
        brand: "gucci",
        name: "bag",
        price: 100000,
        size: "free",
        color: "grey",
        category: "singer",
    },
]
const cost = [];

products.forEach((product)=> {
    cost.push(product.price);
})
const sum = cost.reduce((a,b) => (a+b));
console.log('reduce : ', sum);