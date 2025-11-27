import 'dotenv/config';
import { transporter } from '../config/nodemailer.js';
import { EmailModel } from '../models/emailModel.js';
import { getDocument } from '../services/firestoreService.js';
import { FIRESTORE_CONSTANTS } from "../constants/generalConsts.js";
import { getContactHtml, getContactText } from '../templates/emailTemplates.js';


export const enviarEmail = async (req, res) => {
   
    const body = { ...req.body };
    
    const email = EmailModel.fromObject(body);
    const destinatario = await getDocument(FIRESTORE_CONSTANTS.SETTINGS_COLLECTION, "form")
    
    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: destinatario.email,      
        subject: `Natasha's Gallery: ${body.subject}`,
        text: getContactText(email.name, email.email, email.body),
        html: getContactHtml(email.name, email.email, email.body)
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado para:', destinatario.email);
    } catch (error) {
        console.error('Erro no envio:', error);
        throw error; 
    }
}