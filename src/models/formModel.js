import { FIRESTORE_CONSTANTS } from "../constants/generalConsts.js";
import { getDateFromFirestore } from "../helpers/dataFormat.js";
import { getDocument, putDocument } from "../services/firestoreService.js";

export class FormModel{
    constructor({email, updatedAt}){
        this.email = email;
        this.updatedAt = getDateFromFirestore(updatedAt);
    }

    #validate(){
        if(!this.email) throw new Error("O campo 'email' é obrigatório.")
    }

    // Cria uma instância da classe a partir de um objeto comum
    static fromObject(obj = {}) {
        if (!obj) return null;
        return new FormModel({
            email: obj.email || null,
            updatedAt: getDateFromFirestore(obj.updatedAt)
        });
    }

    // Transforma a instância em JSON
    toJSON() {
        return {
            email: this.email,
            updatedAt: this.updatedAt
        };
    }

    // Atualiza o objeto em uma coleção no banco de dados.
    async update(fields = {}) {
        
        Object.assign(this, fields);

        this.updatedAt = new Date();
        this.#validate();

        const dataToUpdate = { ...this.toJSON() };
        
        await putDocument(
            FIRESTORE_CONSTANTS.SETTINGS_COLLECTION, 
            FIRESTORE_CONSTANTS.FORM_DOCUMENT, 
            dataToUpdate
        );
        
        return this;
    }

    // Busca uma lista de objetos em uma coleção no banco de dados.
    static async findDocument() {
        const doc = await getDocument(
            FIRESTORE_CONSTANTS.SETTINGS_COLLECTION, 
            FIRESTORE_CONSTANTS.FORM_DOCUMENT
        );
        return FormModel.fromObject(doc);
    }
}