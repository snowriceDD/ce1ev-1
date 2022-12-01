import { model } from "mongoose";
import { OrderSchema } from "./schemas/order";

const Order = model("order", OrderSchema);

export class OrderModel {
    
  async findByOrderNumber(orderNumber) {
    const order = await Order.findOne({ orderNumber });
    return order;
  }

  async findAllByUserId(userId) {
    const orders = await Order.find({userId});
    return orders;
  }

  async findAll() {
    const order = await Order.find({});
    return order;
  }
  
  async findById(userId) {
    const order = await Order.findOne({userId});
    return order;
  }

  async findByEmail(email) {
    const order = await Order.find({email});
    console.log("확인"+order)
    return order;
  }

  async findEmail(email) {
    const order = await Order.findOne({email});
    return order;
  }

  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async update({orderId, update}) {
    const filter = {_id: orderId};
    const option = {returnOriginal: false};

    const updateOrder = await Order.findOneAndUpdate(filter, update, option);
    return updateOrder;
  }

  async delete(orderId) {
    const order = await Order.deleteOne({_id: orderId});
    return order;
  }
}

const orderModel = new OrderModel();

export { orderModel };
