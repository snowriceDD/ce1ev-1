const { Schema } = require("mongoose");
import { SelectedProductSchema } from "./SelectedProductSchema";

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    orderNumber: {
      //Date.now() + Math.random() ~~
      type: Number,
      required: true,
    },
    products: {
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
    },
    payMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "상품 준비중",
    },
  },
  {
    collection: "order",
    timestamps: true,
  }
);

export { OrderSchema };
