import mongoose from "mongoose";
import MongoDBClient from "../../classes/MongoDBClient.class.js";
import logger from "../../config/logger.config.js";
import { object, renameField } from "../../utils/index.js";

export default class ContainerMongoDB{
    constructor( bodyCollection , schema ){
        this. collection = mongoose.model(bodyCollection, schema);
        this.conn = new MongoDBClient;
    }

    async create(object){
        try {
            let doc;
            await this.conn.connect();
            doc = await  this.collection.create(object);
            logger.info(doc)
            return doc;
        } 
        catch (error) {
            logger.error('Failed when saving a new object', doc);
        }finally{
            await this.conn.disconnect();
        }
    }

    async readAll(){
        try {
            let docs
            await this.conn.connect();
            docs = await this.collection.find({}).lean();
            docs = docs.map(object);
            docs = docs.map(element => renameField( element , '_id' , 'id' ))
            logger.info(docs);
            return docs;
        } 
        catch (error) {
            logger.error('Failed to read all objects');
        }
        finally{
            await this.conn.disconnect();
        }
    }

    async read( id ){
        try {
            let doc;
            await this.conn.connect();
            doc = await this.collection.findById({ _id : id }).lean();
            doc = renameField(object(doc), '_id', "id")
            return doc;
        } 
        catch (error) {
            logger.error('Failed to find the object');
        }
        finally{
            await this.conn.disconnect();
        }
    }
    
    async readByCategory( category ){
        try {
            let docs;
            await this.conn.connect();
            docs = await this.collection.find({ category: category }).lean();
            docs = docs.map(object);
            docs = docs.map(element => renameField( element , '_id' , 'id' ))
            return docs;
        } 
        catch (error) {
            logger.error('Failed to find the object');
        }
        finally{
            await this.conn.disconnect();
        }
    }

    async update( object , id ){
        try {
            await this.conn.connect();
            const doc = await this.collection.findByIdAndUpdate( { _id: id } , { $set : object } );
            logger.info(doc);
            return doc;
        } 
        catch (error) {
            logger.error('Failed to update');
        }
        finally{
            await this.conn.disconnect();
        }
    }

    async delete( id ){
        try {
            await this.conn.connect();
            const doc = await this.collection.deleteOne( { _id : id });
            logger.info(doc);
            return doc;
        } 
        catch (error) {
            logger.error('Failed to delete');
        }
        finally{
            await this.conn.disconnect();
        }
    }

    async userMessages(user){
        try {
            await this.conn.connect();
            const messages = await this.collection.find({ user : user }).lean()
            logger.info(messages)
            return messages
        } 
        catch (error) {
            logger.error("Imposible encontrar chats del usuario", error)
        }
        finally{
            await this.conn.disconnect();
        }
    }
}