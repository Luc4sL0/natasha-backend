import { getDateFromFirestore } from "../helpers/dataFormat.js";

export class EmailModel{
    constructor({
        id,
        name,
        email,
        subject,
        body,
        createdAt
    }){
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.body = body;
        this.createdAt = getDateFromFirestore(createdAt);
        this.#validate();
        
    }

    #validate(){
        const errors = [];
        if(!this.name) errors.push("O campo 'name' é obrigatório.");
        if(!this.email) errors.push("O campo 'email' é obrigatório.");
        if(!this.subject) errors.push("O campo 'subject' é obrigatório.");
        if(!this.body) errors.push("O campo 'body' é obrigatório");

        if (errors.length > 0){
            throw new Error(errors.join(" "));
        }
    }

    static fromObject(obj = {}){
        if(!obj) return null;
        return new EmailModel({
            id: obj.id || obj._id || null,
            name: obj.name || null,   
            email: obj.email || null,
            subject: obj.subject || null,
            body: obj.body || null,
            createdAt: getDateFromFirestore(obj.createdAt)
        });
    }

    toJSON(){
        return{
            id: this.id,
            subject: this.subject,
            body: this.body,
            createdAt: this.createdAt
        }
    }
}

