import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import CartDao from '../models/daos/cart.dao.js';
import MessageDao from '../models/daos/message.dao.js';
import OrderDao from '../models/daos/order.dao.js';
import ProductDao from '../models/daos/product.dao.js';
import UserDao from '../models/daos/userDao.js';


dotenv.config();

export const object = obj => JSON.parse(JSON.stringify(obj));

export const renameField = (record, from, to) => {
    record[to] = record[from];
    delete record[from];
    return record;
}

export const productDao = new ProductDao();
export const cartDao = new CartDao();
export const userDao = new UserDao();
export const orderDao = new OrderDao();
export const messageDao = new MessageDao();

