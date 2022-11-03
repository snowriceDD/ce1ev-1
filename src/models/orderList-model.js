import { model } from "mongoose";
import { OrderListSchema } from "./schemas/orderList";

const OrderList = model("orderList", OrderListSchema);

export class OrderListModel {
    
  async findByorderNum(orderNum) {
    const order = await OrderList.findOne({ orderNum });
    return order;
  }

  async findAll() {
    const order = await OrderList.find({});
    return order;
  }

}

const orderListModel = new OrderListModel();

export { orderListModel };
