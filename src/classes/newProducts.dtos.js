export default class newProductDto{
    constructor( product ){
        this.name = product.name;
        this.price = product.price;
        this.img = product.img;
        this.stock = product.stock;
        this.category = product.category;
        this.description = product.description;
    }
}
