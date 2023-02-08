export default class ProductDto{
    constructor( product ){
        this.name = product.name;
        this.price = product.price;
        this.img = product.img;
        this.stock = product.stock;
        this.id = product.id;
        this.category = product.category;
        this.description = product.description;
    }
}
