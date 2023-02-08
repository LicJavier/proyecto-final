import { Router } from "express";
import { deleteOrder, readOrder, readOrders, saveOrder, updateOrder } from "../controllers/order.controller.js";

const routerOrders = Router();

routerOrders.get('/', readOrders);
routerOrders.get('/:id', readOrder);
routerOrders.post('/', saveOrder);
routerOrders.put('/:id', updateOrder);
routerOrders.delete('/:id', deleteOrder);

export default routerOrders;
