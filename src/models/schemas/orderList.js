const {Schema} = require('mongoose');

const OrderListSchema = new Schema({
    orderNum: { //Date.now() + Math.random() ~~
        type: Number, 
        required: true,
    },
    orderLIst: {
        type: Schema.Types.ObjectId, // [UndermayCar Operation ~, ... ]
        required: true,
        ref: "products",
    },
    cost: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    pay_method: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "주문완료"
    }
}, {
    collection: "orderList",
    timestamps: true,
});

export { OrderListSchema };

