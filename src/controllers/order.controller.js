import logger from "../config/logger.config.js"
import { orderDao } from "../utils/index.js";
//----------------------------------------------------------------------------------------------
//---------------------------------ORDER CONTROLLERS------------------------------------------
//----------------------------------------------------------------------------------------------

export async function readOrders( req , res ) {
    try {
        const orders = await orderDao.readAll();
        res.status(200).json(orders);
    } catch (error) {
        logger.error(error);
    }
}

export async function readOrder( req , res ) {
    try {        
        const id = req.params.id;
        const orderId = await orderDao.read(id);
        res.status(200).json(orderId)
    } catch (error) {
        logger.error(error)
    }
}
export async function saveOrder( req , res ) {
        try {        
            const object = req.body;
            const newOrder = await orderDao.create( object );
            res.status(201).json(newOrder);
        } catch (error) {
            logger.error(error)
        }
}

export async function updateOrder( req , res ) {
    try {
        const id = req.params.id;
        const body = req.body;
        const orderId = await orderDao.update( id , body );
        res.status(201).json(orderId);
    } catch (error) {
        logger.error(error)
    }
}

export async function deleteOrder( req , res ) {
    try {
        const id = req.params.id;
        const orderId = await orderDao.delete( id );
        res.status(202).json( { "order eliminado": orderId } );  
    } catch (error) {
        logger.error(error)
    }
}