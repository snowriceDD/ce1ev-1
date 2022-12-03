const { Schema, default: mongoose } = require("mongoose");

const ReviewSchema = new Schema(
  {
    reviewNo: {
      type: Number,
      requried: true,
    },
    orderNo: {
      type: Number,
      requried: true,
    },
    productNo: {
      type: Number,
      requried: true,
    },
    userId: { // email
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

export { ReviewSchema };