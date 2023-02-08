import logger from "../../config/logger.config.js";
import ContainerMongoDB from "../containers/mongoDB.container.js";
import { messageSchema } from "../message.model.js";

export default class MessageDao extends ContainerMongoDB{
    constructor(){
        super('message', messageSchema);
    }
}