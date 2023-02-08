import { createTransport } from "nodemailer";
import  dotenv  from "dotenv";
import logger from "../config/logger.config.js";

dotenv.config();

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: process.env.ACCOUNT_MAIL,
        pass: process.env.PASS_MAIL,
    }
})

export default async function message( admin , email , name , surname , address , age ){
    try {
        await transporter.sendMail({
            from: `"Creaciones Natu" <no-reply@creacionesnatu.com>`, // sender address
            to: `${admin} , ${email} `, // list of receivers
            subject: "Nuevo Registro ✔", // Subject line
            text: "Cuenta creada con éxito", // plain text body
            html: `<div>
                        <h2>La cuenta se creó con éxito</h2>
                        <p>
                            <ul>
                                <li>nombre: ${name} ${surname} </li>
                                <li>dirección: ${address}</li>
                                <li>años: ${age}</li>
                                <li>email: ${email}</li>
                            </ul>
                        </p>
                    </div>`, // html body
        });
    } catch (error) {
        logger.error(error)
    }
}

export async function cartAdminMessage( admin , products , name , email , order){
    try {
        await transporter.sendMail({
            from: `"Creaciones Natu" <no-reply@creacionesnatu.com>`, // sender address
            to: `${admin}`, // list of receivers
            subject: `Nuevo Pedido de ${name}, ${email}✔`, // Subject line
            text: "Nuevo pedido", // plain text body
            html: `<div>
                        <p>
                            <li>Orden N°: ${order.numberOrder}</li>
                            <li>Estado ${order.state}</li>
                            <li>Fecha: ${order.date}</li>
                            ${products}    
                        </p>
                    </div>`, // html body
        });
    } catch (error) {
        logger.error(error)
    }
}

