import ContainerMongoDB from "../containers/mongoDB.container.js";
import { userSchema } from "../user.model.js";

export default class UserDao extends ContainerMongoDB{
    constructor(){
        super( 'user', userSchema );
    }
}