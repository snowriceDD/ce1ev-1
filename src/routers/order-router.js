import {Router} from ('mongoose');
import { orderService } from "../services/order-service";

const orderRouter = Router();
 
orderRouter.get('/orders', async (req, res)=> {  //모든 주문 정보 조회
    const orders =  await orderService.getOrders()
    
    res.staus(201).json(orders);
});

orderRouter.get('/orders:orderNumber', async (req, res)=> {  //해당 주문정보 조회
    const orderNumber = req.params.orderNumber;
    const order =  await orderService.getOrders(orderNumber)
    
    res.staus(201).json(order);
});

orderRouter.post('/orders', async (req, res)=> { // 주문 생성

    const {orderNumber, products, cost, count, payMethod, status  } = req.body;

    const newOrder = await orderService.addOrder({
        orderNumber, products, cost, count, payMethod, status
    })

    res.json(newOrder);
})

orderRouter.delete('/orders:orderNumber', async (req,res)=> {
    const orderNumber = req.params.orderNumber;
    const order = await orderService.deleteOrder(orderNumber);

    res.status(201).json(order);
})
