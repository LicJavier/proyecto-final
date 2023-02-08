import mongoose from "mongoose";
import config from "../config/index.config.js";
import logger from "../config/logger.config.js";
import clientDB from "./ClientDB.class.js";
let instance = null;
mongoose.set('strictQuery', false)
export default class MongoDBClient extends clientDB{
    constructor(){
        super();
        this.connected = false;
        this.client = mongoose; 
    }

    async connect(){
        try {
            await this.client.connect(config);
            this.connected = true;
            logger.info('Database connected');
        } catch (error) {
            logger.error("Failed connecting to MongoDB")
        }
    }
    async disconnect(){
        try {
            await this.client.connection.close();
            this.connected = false;
            logger.info("Database disconnected");
        } catch (error) {
            logger.error("Failed when disconnecting from MongoDB")
        }
    }

    static getInstance() {
        if (!instance) {
            instance = new MongoDBClient()
        }

        return instance;
    }
}