import { orderModel } from "../models";

class OrderService {
    constructor(model) {
      this.model = model;
    }

    async getOrders(){
        const orders = await this.model.findAll({});
        return orders;
    }

    async getOrderData(userId) { //사용자의 order
        const order = await this.model.findById(userId);
        return order;
    }

    async getOrdersByUserId(userId) {
        const orders = await this.model.findAllByUserId(userId);
        return orders;
    }

    async getOrderNumber(number) {
        const order = await this.model.findByOrderNumber(number);
        return order;
    }

    async addOrder(orderInfo) {

        const {orderNumber, products, cost, count, payMethod, status  } = orderInfo;

        const newOrderInfo = {
            orderNumber, 
            products, 
            cost, 
            count, 
            payMethod, 
            status  
        };
    
        // // db에 저장
        const createdNewProduct = await this.model.create(newOrderInfo);
    
        return createdNewProduct;
    }

    async deleteOrder(num) {
        const order = await this.model.delete(num);
        return order;
    }

}

const orderService = new OrderService(orderModel);

export { orderService };


