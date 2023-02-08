import { generateHashPassword } from "../../server.js";
import ProductoFactory from "../classes/products.factory.js";
import logger from "../config/logger.config.js"
import { productDao, userDao , messageDao } from "../utils/index.js";
import message from "../utils/nodemailer.js";
const productFactory = new ProductoFactory(productDao);

export async function login(req,res) {
    try {
        if (req.isAuthenticated()) {
            res.redirect('/productos')
        } else {
            res.render('login')
        }
    } catch (error) {
        logger.error(error)
    }
}

export async function register( req , res ) {
    try {
        return res.render('register');
    } catch (error) {
        logger.error(error);
    }
}

export let name = [];
export let mail = [];

export async function home( req , res ) {
    try {
        name = req.user.name;
        mail = req.user.email;
        const user = mail;
        const product = await productFactory.readAll();
        res.render('home', { user , product });
    } catch (error) {
        logger.error(error);
    }
}

export async function errorLogin(req , res){
    try {
        logger.error('Error en el login')
        res.render('errorLogin');
    } catch (error) {
        logger.error(error);
    }
}

export async function errorRegister( req , res ){
    try {
        logger.error('Error en el registro')
        res.render('errorRegister');
    } catch (error) {
        logger.error(error);
    }
}

export async function cartController( req , res ){
    try {
        const user = req.user.email;
        res.render('cart', { user , cart  });
    } catch (error) {
        logger.error(error);
    }
}

export async function registerSuccess( req , res ){
    try {
        res.render('registerSuccess');
    } catch (error) {
        logger.error(error);
    }    
}

export async function logout( req , res ){
    try {
        const user = req.user.nombre;
        req.logOut(err => {
            logger.info( "Cierre de sesión correcto" , user )
            res.render('logout', { user } ) ;
        });
    } catch (error) {
        logger.error(error);
    }
}

export let productId = [];

export async function productID( req , res){
    let id = req.params.id;
    if ((id === "mandalas")||(id === "atrapasueños")) {
        try {
            name = req.user.nombre;
            mail = req.user.email;
            const category = id;
            const user = mail;
            const product = await productFactory.readByCategory(category);
            res.render('home', { user , product });
        } catch (error) {
            logger.error(error);
        }
    } else {
        try {        
            const user = req.user.email;
            id = String(req.params.id);
            logger.info("este ID: " , id)
            productId = await productFactory.read(id);
            if (productId === undefined) {
                res.render('missedProduct')
            } else {
                res.render( 'product' , { productId , user })
            }
        } catch (error) {
            logger.error(error)
        }
    }
}

export async function any( req , res ){
    try {
        logger.warn('Ruta desconocida', {ruta: req.params});
        res.render('any');
    } catch (error) {
        logger.error(error);
    }
}
export async function registerUser( req , res ){
    try {
        const { name , password , username , surname , address , age } = req.body;
        const admin = process.env.ACCOUNT_MAIL;
        const usuario = await userDao.readAll();
        const newUsuario = usuario.find( e => e.email == username );
        if (newUsuario) {
            logger.warn('Usuario ya se registro')
            res.render('errorRegister');
        } else {
            const newUser = await userDao.create({ 
                name : name, 
                password : await generateHashPassword(password), 
                email : username,
                surname : surname,
                address : address,
                age : age
                }) 
            message( admin , username , name , surname , address , age )
            res.render('registerSuccess');
        }
    } catch (error) {
        logger.error(error);
    }
}
export let cart = [];
export async function saveProduct( req , res ){
    const id = req.params.id;
    logger.info("el id ", id)
    const product = await productFactory.read(id);
    logger.info("el producto ", product);
    cart.push(product);
    res.render('save')
}

export async function chat( req , res ){
    try {
        const messages = await messageDao.readAll();
        res.render('chat', { messages })
    } catch (error) {
        logger.error(error)
    }
}

export async function chatUser( req , res ){
    try {
        const params = req.params.email;
        console.log(params)
        const mail = req.user.email;
        logger.info(mail)
        if (params === mail) {
            const messages = await messageDao.userMessages(mail);
            logger.info("estos messages", messages)
            res.render('privateChat', { messages })
        }else{
            res.render('any')
        }
        
    } catch (error) {
        logger.error(error)
    }
}

export async function info( req , res){
    
    if(process.env.ENVIRONMENT === "prod"){
        try {
            const port =process.env.PORT;
            const mongo = process.env.MONGO_URL;
            const email = process.env.ACCOUNT_MAIL;
            const session = process.env.SESSION_TIME;
            res.render('info', { port , mongo , email , session })
        } catch (error) {
            logger.error(error)
        }
    }else{
        try {
            const port =process.env.PORT;
            const mongo = process.env.COMPASS;
            const email = process.env.ACCOUNT_MAIL;
            const session = process.env.SESSION_TIME;
            res.render('infoDev', { port , mongo , email , session })
        } catch (error) {
            logger.error(error)    
        }
    }
}

