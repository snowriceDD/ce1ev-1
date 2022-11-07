const {Schema} = require('mongoose');

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
