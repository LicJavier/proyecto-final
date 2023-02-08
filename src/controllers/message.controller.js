import logger from "../config/logger.config.js"
import { messageDao } from "../utils/index.js";
//----------------------------------------------------------------------------------------------
//---------------------------------MESSAGES CONTROLLERS------------------------------------------
//----------------------------------------------------------------------------------------------

export async function readMessages( req , res ) {
    try {
        const message = await messageDao.readAll();
        res.status(200).json(message);
    } catch (error) {
        logger.error(error);
    }
}

export async function readMessage( req , res ) {
    try {        
        const id = req.params.id;
        const messageId = await messageDao.read(id);
        res.status(200).json(messageId)
    } catch (error) {
        logger.error(error)
    }
}
export async function saveMessage( req , res ) {
        try {        
            const object = req.body;
            const newMessage = await messageDao.create( object );
            res.status(201).json(newMessage);
        } catch (error) {
            logger.error(error)
        }
}

export async function updateMessage( req , res ) {
    try {
        const id = req.params.id;
        const body = req.body;
        const messageId = await messageDao.update( id , body );
        res.status(201).json(messageId);
    } catch (error) {
        logger.error(error)
    }
}

export async function deleteMessage( req , res ) {
    try {
        const id = req.params.id;
        const messageId = await messageDao.delete( id );
        res.status(202).json( { "message eliminado": messageId } );  
    } catch (error) {
        logger.error(error)
    }
}