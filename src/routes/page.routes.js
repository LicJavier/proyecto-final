import { Router } from "express";
import { any, cartController, chat, chatUser, errorLogin, errorRegister, home, info, login, logout, productID, register, registerSuccess, registerUser, saveProduct } from "../controllers/page.controller.js";
import { auth } from '../../server.js'
import passport from "passport";
const routerPage = Router();

routerPage.get('/', login);
routerPage.get('/login', login);
routerPage.get('/register' , register);
routerPage.get('/productos' , auth , home );
routerPage.get('/errorLogin' , errorLogin);
routerPage.get('/registerSuccess' , registerSuccess);
routerPage.get('/errorRegister', errorRegister);
routerPage.get('/logout', auth ,logout);
routerPage.get('/carrito', auth ,cartController)
routerPage.get('/info',passport.authenticate('jwt', {session: false}) , info)
routerPage.get('/chat', chat)
routerPage.get('/chat/:email', chatUser)
routerPage.get('/productos/add/:id' , saveProduct)
routerPage.get('/productos/:id', auth , productID);
routerPage.get('*' , any);

routerPage.post('/login', passport.authenticate( 'local' , { successRedirect : '/productos' , failureRedirect : '/errorlogin' }))
routerPage.post('/register' , registerUser)

export default routerPage;

