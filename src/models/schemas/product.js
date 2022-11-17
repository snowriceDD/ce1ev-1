const { Schema, default: mongoose } = require("mongoose");

const ProductSchema = new Schema(
  {
    num: {
      type: Number,
      requried: true,
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
      type: String,
      required: true,
      min: 0,
    },
    size: {
      type: Array,
      required: true,
    },
    color: {
      type: Array,
      requried: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: false,
    },
    like: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

// ProductSchema(autoIncrement.plugin,{
//     model: 'products',
//     field: 'num',
//     startAt: 1,
//     increment: 1
// });

export { ProductSchema };
