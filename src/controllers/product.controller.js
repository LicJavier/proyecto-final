import logger from "../config/logger.config.js"
import ProductoFactory from "../classes/products.factory.js";
import { productDao } from "../utils/index.js";

const productFactory = new ProductoFactory(productDao);
//----------------------------------------------------------------------------------------------
//---------------------------------PRODUCT CONTROLLERS------------------------------------------
//----------------------------------------------------------------------------------------------

export async function readProducts( req , res ) {
    try {
        const products = await productFactory.readAll();
        res.status(200).json(products);
    } catch (error) {
        logger.error(error);
    }
}

export async function readProduct( req , res ) {
    try {        
        const id = req.params.id;
        const productId = await productFactory.read(id);
        res.status(200).json(productId)
    } catch (error) {
        logger.error(error)
    }
}
export async function saveProduct( req , res ) {
        try {        
            const object = req.body;
            const newProduct = await productFactory.create( object );
            res.status(201).json(newProduct);
        } catch (error) {
            logger.error(error)
        }
}

export async function updateProduct( req , res ) {
    try {
        const id = req.params.id;
        const body = req.body;
        const productId = await productFactory.update( id , body );
        res.status(201).json(productId);
    } catch (error) {
        logger.error(error)
    }
}

export async function deleteProduct( req , res ) {
    try {
        const id = req.params.id;
        const productId = await productFactory.delete( id );
        res.status(202).json( { "producto eliminado": productId } );  
    } catch (error) {
        logger.error(error)
    }
}