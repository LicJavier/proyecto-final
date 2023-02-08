// ----------------------------------------------------------------------------------------------
// ------------------------------MANEJO DE MENSAJES----------------------------------------------
// ----------------------------------------------------------------------------------------------

socket.on('from server msj', mensajes=> render(mensajes));
socket.on('update-producto', ()=> location.reload());

function render(mensajes) {
    const cuerpoMensajes = mensajes.map((msj)=>{
        console.log('el render funciona')
        return `<tr><td class="p-5 font-mono text-white text-3xl">${msj.user}</td><td class="p-5 font-mono text-white text-3xl">$ ${msj.date}</td><td class="p-5 font-mono text-white text-3xl">${msj.bodyMessage}</td></tr>`
    }).join(' ');
    document.querySelector('#chatRecord').innerHTML = cuerpoMensajes;
}
const enviar = document.querySelector("#send");
enviar.addEventListener('click', enviarMensaje);

function enviarMensaje() {
    console.log("enviando el mensaje")
    const inputUser = document.querySelector('#user');
    const inputContenido = document.querySelector('#bodyMessage');
    const mensaje={
        user: String(inputUser.value),
        bodyMessage: String(inputContenido.value),
    }
    socket.emit('from-cliente-msj', mensaje )
}