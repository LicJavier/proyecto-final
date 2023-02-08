import ContainerMongoDB from "../containers/mongoDB.container.js";
import { productSchema } from "../product.model.js";

export default class ProductDao extends ContainerMongoDB{
    constructor(){
        super('products', productSchema);
    }
}