import ProductDto from "./products.dtos.js";
import logger from "../config/logger.config.js";
import newProductDto from "./newProducts.dtos.js";

export default class ProductoFactory{
    constructor(dao){
        this.dao = dao;
    }

    async read( id ){
        try {
            const dto = await this.dao.read(id);
            const result = new ProductDto(dto);
            return result;
        } catch (error) {
            logger.error(error);
        }
    }
    async readByCategory(category){
        try {
            const dtos = await this.dao.readByCategory(category);
            return dtos.map(dto=> new ProductDto(dto)); 
        } catch (error) {
            logger.error(error);
        }
    }
    async readAll(){
        try {
            const dtos = await this.dao.readAll();
            return dtos.map(dto=> new ProductDto(dto)); 
        } catch (error) {
            logger.error(error);
        }
    }
    async create( object ){
        try {
            const dto = new newProductDto( object )
            return await this.dao.create(dto);
        } catch (error) {
            logger.error(error);
        }
    }
    async update( id , object ){
            try {
                const dto = new ProductDto( object );
                const doc = await this.dao.update( id , dto );
            return doc;
        } catch (error) {
            logger.error(error);
        }
    }

    async delete( id ){
    try {
        const product = await this.dao.delete(id)
        return product;
    } catch (error) {
        logger.error(error);}
    }
}
