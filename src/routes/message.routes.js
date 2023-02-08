import { Router } from "express";
import { deleteMessage, readMessage, readMessages, saveMessage, updateMessage } from "../controllers/message.controller.js";

const routerMessage = Router();

routerMessage.get('/', readMessages);
routerMessage.get('/:id', readMessage);
routerMessage.post('/', saveMessage);
routerMessage.put('/:id', updateMessage);
routerMessage.delete('/:id', deleteMessage);

export default routerMessage;
