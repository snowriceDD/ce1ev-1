import {Router} from ('mongoose');
import { orderService } from "../services/order-service";
import { adminOnly, loginRequired } from "../middlewares";

const orderRouter = Router();
 
orderRouter.get('/orderlist/all',adminOnly ,async (req, res, next)=> {  //모든 주문 정보 조회
    try {
        const orders =  await orderService.getOrders()
    
        res.staus(200).json(orders);
    }catch(err) {
        next(err);
    }
});

orderRouter.get('/orderlist/user', loginRequired, async (req, res, next)=> {
    try {

        const userId = req.currentUserId;
        const orders = await orderService.getOrdersByUserId(userId);
        res.status(200).json(orders);
    }catch(err) {
        next(err);
    }
})

//주문 번호로
orderRouter.get('/orders:orderNumber', loginRequired ,async (req, res, next)=> {  //해당 주문정보 조회
    try {
        const orderNumber = req.params.orderNumber;
        const order =  await orderService.getOrders(orderNumber)
        
        res.staus(200).json(order);
    }catch (err) {
        next(err)
    }
});

orderRouter.post('/orders',loginRequired ,async (req, res, next)=> { // 주문 생성
    try {
        const uesrId = req.currentUserId;
        const {orderNumber, products, cost, count, payMethod, status  } = req.body;

        const newOrder = await orderService.addOrder({
            uesrId, orderNumber, products, cost, count, payMethod, status
        })
    
        res.status(201).json(newOrder);
    } catch(err) {
        next(err);
    }

})

orderRouter.delete('/orders:orderNumber',loginRequired ,async (req,res, next)=> {
    try {
        const orderNumber = req.params.orderNumber;
        const order = await orderService.deleteOrder(orderNumber);
    
        res.status(201).json(order);
    } catch(err) {
        next(err)
    }

})
