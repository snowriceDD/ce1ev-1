import { orderModel } from "../models";

class OrderService {
  constructor(model) {
    this.model = model;
  }

  async getOrders() {
    const orders = await this.model.findAll({});
    return orders;
  }

  async getOrderData(userId) {
    //사용자의 order
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

  async getOrderByEmail(email) {
    const order = await this.model.findByEmail(email);
    return order;
  }

  async setStatus(orderId, status) {
    const updateOrder = await this.model.update({
      orderId,
      update: { status },
    });

    return updateOrder;
  }

  async addOrder(orderInfo) {
    const { orderNumber, products, cost, count, payMethod, status, email } =
      orderInfo;

    const newOrderInfo = {
      orderNumber,
      products,
      cost,
      count,
      payMethod,
      status,
      email,
    };

    // // db에 저장
    const createdNewProduct = await this.model.create(newOrderInfo);

    return createdNewProduct;
  }

  async deleteOrder(orderId) {
    const { orderCount } = await this.model.delete(orderId);
    if (orderCount === 0) {
      throw new Error(`${orderId} 주문의 데이터 삭제 실패`);
    }
    return { result: "success" };
  }

  async getGuestInfo(guestInfo) {
    // 객체 destructuring
    const { email, orderNumber } = guestInfo;

    // 우선 해당 이메일의 사용자 정보가  db에 존재하는지 확인
    const guest = await this.model.findByEmail(email);
    if (!guest[0]) {
      throw new Error(
        // console.log(guest)
        "해당 이메일은 주문내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    // 이제 이메일은 문제 없는 경우이므로, 비밀번호를 확인함
    // 비밀번호 일치 여부 확인
    for(let i=0; i<guest.length; i++){
      if(guest[i].orderNumber===orderNumber){
        return true;
      }else if (!true) {
        throw new Error(
          "주문번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
        );
      }
    }
    return { guest };
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
