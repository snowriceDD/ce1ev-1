const {Schema} = require('mongoose');

const ShoppingCartSchema = new Schema({
    productLIst: {
        type: Array,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    }
}, {
    collection: "shoppingCart",
    timestamps: true,
});

export { ShoppingCartSchema };

