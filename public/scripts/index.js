const cart = document.getElementById("cartIco");
cart.addEventListener('click', ()=>{
    location.href ='/carrito';
}
)

function addProduct(data) {
    let product = data;
    console.log(product.toString())
    socket.emit('add-cart', product )    
}

function finalizeOrder(params) {
    socket.emit("new-order", params)
}

const final = document.getElementById('purchase');
final.addEventListener('click', ()=>{
    finalizeOrder();
    location.href='/productos';
})