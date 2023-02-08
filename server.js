//----------------------------------------------------------------------------------------------
//------------------------------------MODULES---------------------------------------------------
//----------------------------------------------------------------------------------------------
import express from "express";
import expressHandlebars from 'express-handlebars';
import * as dotenv from "dotenv";
import path, { dirname } from 'path';
import process from 'process';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import logger from './src/config/logger.config.js'
import routerPage from "./src/routes/page.routes.js";
import routerProduct from "./src/routes/product.routes.js";
import routerCart from "./src/routes/cart.routes.js";
import routerMessage from "./src/routes/message.routes.js";
import routerOrders from "./src/routes/order.routes.js";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from 'bcrypt';
import { cartAdminMessage } from "./src/utils/nodemailer.js";
import { cart, mail, name } from "./src/controllers/page.controller.js";
import { cartDao , messageDao, orderDao, userDao } from "./src/utils/index.js";
import issueJWT, { JwtStrategy } from "./src/utils/jwt.js";
dotenv.config();
const myHeaders = new Headers();
//----------------------------------------------------------------------------------------------
//-----------------------------SERVER INSTANCE--------------------------------------------------
//----------------------------------------------------------------------------------------------
const app = express();
const httpServer = createServer(app);
//----------------------------------------------------------------------------------------------
//------------------------------MIDDLEWARE-----------------------------------------------------
//----------------------------------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//----------------------------------------------------------------------------------------------
//-----------------------------SESSION INSTANCE-------------------------------------------------
//----------------------------------------------------------------------------------------------

const advanceOptions = { useNewUrlParser: true , useUnifiedTopology: true }

const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: advanceOptions,
    ttl: 600
});
app.use(session({
    store: MongoStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: Number(process.env.SESSION_TIME)
    }
}));
//----------------------------------------------------------------------------------------------
//----------------------------------PASSPORT----------------------------------------------------
//----------------------------------------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = Strategy; 
export let token = [];
passport.use(new LocalStrategy(
    async function ( username, password , cb) {
        const users = await userDao.readAll()
        logger.info(users)
        const user = users.find( e => e.email == username )
            logger.info(user)        
        if ( !user ) {
            return cb( null , false )
        } else {
            const match = await verifyPass( user , password );
            if ( !match ) {
                return cb( null , false )
            } else {
                token = issueJWT(user);
                logger.info(token)
                myHeaders.append('Content-Type', 'text/xml',"Authorization" ,`${token}`);
                return cb( null , user );    
            }
        }
}));

passport.serializeUser(( user , cb ) => {
    cb( null , user );
})

passport.deserializeUser( async ( username , cb ) => {
    cb( null , username );
})


passport.use(JwtStrategy);

//----------------------------------------------------------------------------------------------
//------------------------------AUTHENTICATION--------------------------------------------------
//----------------------------------------------------------------------------------------------
export async function generateHashPassword(params) {
    const passwordHash = await bcrypt.hash( params , 10 );
    return passwordHash;
}
export async function verifyPass( username , password ) {
    const verify = await bcrypt.compare( password , username.password );
    return verify;
}
export async function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.status(401).render('errorLogin')
}
//----------------------------------------------------------------------------------------------
//----------------------------------TEMPLATE ENGINE---------------------------------------------
//----------------------------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/src/views/layouts'),
    partialsDir: path.join(__dirname, '/src/views/partials'),
    extname: 'hbs'
}));
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'hbs');

//----------------------------------------------------------------------------------------------
//------------------------------------ROUTES----------------------------------------------------
//----------------------------------------------------------------------------------------------
app.use('/api/products', routerProduct);
app.use('/api/carts', routerCart);
app.use('/api/messages', routerMessage);
app.use('/api/orders', routerOrders);
app.use('/', routerPage);
//----------------------------------------------------------------------------------------------
//-----------------------------------------SERVER-----------------------------------------------
//----------------------------------------------------------------------------------------------
const PORT = process.env.PORT || 8080;
const io = new Server(httpServer);
httpServer.listen( PORT , () => logger.info(`Listening PORT: ${PORT}`));
//----------------------------------------------------------------------------------------------
//----------------------------------------SOCKET IO---------------------------------------------
//----------------------------------------------------------------------------------------------
io.on('connection', async (socket)=>{
    logger.info(`nuevo cliente conectado ${socket.id}`);
    
    socket.on('add-cart', async (data)=>{
        const product = await productosDao.listar(data);
        await cartDao.create(product);
        logger.info(product)
    })
    socket.on('new-order', async (data) =>{
        const products = cart.map(e=> {
            return `<li>Producto: ${e.name} x ${e.stock}</li><br>`
        })
        const nombre = name;
        const email = mail;
        const admin = process.env.ACCOUNT_MAIL;
        const orders = await orderDao.readAll();
        const order = await orderDao.create({ cart : cart , state : "generada" , mail : email , numberOrder: orders.length})
        logger.info(data)
        cartAdminMessage( admin , products , nombre , email , order);
        cart.splice(0, cart.length)
    })
    socket.on('from-cliente-msj', async (data)=>{
        logger.info(data)
        await messageDao.create(data)
        io.sockets.emit('from server msj', await messageDao.readAll());
    })
})

