import { model } from "mongoose";
import { GuestSchema } from "./schemas/guest";

const Guest = model("guests", GuestSchema);

export class GuestModel {
  async findByEmail(email) {
    const guest = await Guest.findOne({ email });
    return guest;
  }

  async findById(guestId) {
    const guest = await Guest.findOne({ _id: guestId });
    // console.log(user);
    return guest;
  }

  async create(guestInfo) {
    const createdNewGuest = await Guest.create(guestInfo);
    return createdNewGuest;
  }

  async findAll() {
    const guests = await Guest.find({});
    return guests;
  }

  async delete(guestId) {
    const guest = await Guest.deleteOne({_id: guestId});
    return guest;
  }
}

const guestModel = new GuestModel();

export { guestModel };
