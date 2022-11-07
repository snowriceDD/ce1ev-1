const {Schema} = require('mongoose');
import {SelectedProductSchema} from './SelectedProductSchema';

const OrderSchema = new Schema({
    orderNumber: { //Date.now() + Math.random() ~~
        type: Number, 
        required: true,
    },
    products: [SelectedProductSchema],
    cost: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    payMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "주문완료"
    }
}, {
    collection: "order",
    timestamps: true,
});

export { OrderSchema };

