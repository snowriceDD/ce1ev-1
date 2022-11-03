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
      type:String,
      required: false,
    },
    phoneNum: {
      type: Number,
      required: false,
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
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { UserSchema };
