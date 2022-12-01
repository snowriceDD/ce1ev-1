const { Schema } = require("mongoose");

const PostSchema = new Schema(
  {
    postNo: {
      type: Number,
      requried: true,
    },
    userEmail: {
      type: String,
      required: false,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

export { PostSchema };