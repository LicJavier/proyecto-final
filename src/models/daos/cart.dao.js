import ContainerMongoDB from "../containers/mongoDB.container.js";
import { cartSchema } from "../cart.model.js"

export default class CartDao extends ContainerMongoDB{
    constructor(){
        super('cart', cartSchema);
    }
}