const {Schema} = require('mongoose');

//  selectedProducts = {_id: 34532, num:1, zara, 청바지,s,black, ...}, { _id: 34533, num: 1, zara,청바지, m, black} 
//  -> localStorage = [ObjectId(34532), ObjectId(34533)] 
//  -> order = {orderNumber: 202211075348, products: [{1,zara,청바지,s,black, ...}, {1,zara,청바지,m,black}],
//   cost: 1000, cousnt :products.length, "card", "주문완료" }
// 

const SelectedProductSchema = new Schema({
    num: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    size: {
        type: String, // 고정값이기 때문에 배열이 아닌 String타입
        required: true,
    },
    color: {
        type: String, // 고정값이기 때문에 배열이 아닌 String타입
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
},  {
    collection: "selectedProducts",
    timestamps: true,
  }
);

export { SelectedProductSchema };
