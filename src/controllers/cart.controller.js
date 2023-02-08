import logger from "../config/logger.config.js"
import { cartDao } from "../utils/index.js";
//----------------------------------------------------------------------------------------------
//---------------------------------PRODUCT CONTROLLERS------------------------------------------
//----------------------------------------------------------------------------------------------

export async function readCarts( req , res ) {
    try {
        const carts = await cartDao.readAll();
        res.status(200).json(carts);
    } catch (error) {
        logger.error(error);
    }
}

export async function readCart( req , res ) {
    try {        
        const id = req.params.id;
        const cartId = await cartDao.read(id);
        res.status(200).json(cartId)
    } catch (error) {
        logger.error(error)
    }
}
export async function saveCart( req , res ) {
        try {        
            const object = req.body;
            const newCart = await cartDao.create( object );
            res.status(201).json(newCart);
        } catch (error) {
            logger.error(error)
        }
}

export async function updateCart( req , res ) {
    try {
        const id = req.params.id;
        const body = req.body;
        const cartId = await cartDao.update( id , body );
        res.status(201).json(cartId);
    } catch (error) {
        logger.error(error)
    }
}

export async function deleteCart( req , res ) {
    try {
        const id = req.params.id;
        const cartId = await cartDao.delete( id );
        res.status(202).json( { "carrito eliminado": cartId } );  
    } catch (error) {
        logger.error(error)
    }
}