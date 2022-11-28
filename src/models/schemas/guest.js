import { Schema } from "mongoose";

const GuestSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    address: {
      type:String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "Guest", 
    },
    isMember: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "Guests",
    timestamps: true,
  }
);

export { GuestSchema };
