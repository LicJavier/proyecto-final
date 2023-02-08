import { Router } from "express";
import { deleteCart, readCart, readCarts, saveCart, updateCart } from "../controllers/cart.controller.js";

const routerCart = Router();

routerCart.get('/', readCarts);
routerCart.get('/:id', readCart);
routerCart.post('/', saveCart);
routerCart.put('/:id', updateCart);
routerCart.delete('/:id', deleteCart);

export default routerCart;
