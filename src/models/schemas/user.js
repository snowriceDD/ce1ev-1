import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "일반회원",
    },
    isMember: {
      type: Boolean,
      default: true,
    },
    likeProduct: {
      type: Array,
      required: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { UserSchema };
