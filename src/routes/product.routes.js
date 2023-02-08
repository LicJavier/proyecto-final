import { Router } from "express";
import { deleteProduct, readProduct, readProducts, saveProduct, updateProduct } from "../controllers/product.controller.js";

const routerProduct = Router();

routerProduct.get('/', readProducts);
routerProduct.get('/:id', readProduct);
routerProduct.post('/', saveProduct);
routerProduct.put('/:id', updateProduct);
routerProduct.delete('/:id', deleteProduct);

export default routerProduct;
