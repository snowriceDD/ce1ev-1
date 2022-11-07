import { model } from "mongoose";
import { OrderSchema } from "./schemas/order";

const Order = model("order", OrderSchema);

export class OrderModel {
    
  async findByOrderNumber(orderNumber) {
    const order = await Order.findOne({ orderNumber });
    return order;
  }

  async findAll() {
    const order = await Order.find({});
    return order;
  }

  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async delete(orderNumber) {
    const order = await Order.deleteOne({orderNumber});
    return order;
  }
}

const orderModel = new OrderModel();

export { orderModel };
