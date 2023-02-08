import ContainerMongoDB from "../containers/mongoDB.container.js";
import { orderSchema } from "../order.model.js";

export default class OrderDao extends ContainerMongoDB{
    constructor(){
        super( 'order', orderSchema);
    }
}