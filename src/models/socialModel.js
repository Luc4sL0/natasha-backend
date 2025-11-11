import { FIRESTORE_CONSTANTS } from "../constants/generalConsts.js";
import { getDateFromFirestore } from "../helpers/dataFormat.js";
import { getDocument, putDocument } from "../services/firestoreService.js";

export class SocialModel{
    constructor({socials, updatedAt}){
        this.socials = socials || [];
        this.updatedAt = getDateFromFirestore(updatedAt);
    }

    #validate(){
        if(!this.socials) throw new Error("socials está vazio.");
        this.socials.forEach(social => {
            if(!social.link) throw new Error("Link é obrigatório.")
            if(!["fb", "insta", "ytb"].includes(social.type))
                throw new Error("Tipo de link não permitido.");
        });
    }

    // Cria uma instância da classe a partir de um objeto comum
    static fromObject(obj = {}) {
        if (!obj) return null;
        return new SocialModel({
            socials: obj.socials || [],
            updatedAt: getDateFromFirestore(obj.updatedAt)
        });
    }

    // Transforma a instância em JSON
    toJSON() {
        return {
            socials: this.socials
                ? this.socials.map(social => ({
                    type: social.type,
                    link: social.link
                }))
                : [],
            updatedAt: this.updatedAt
        };
    }


    // Atualiza o objeto em uma coleção no banco de dados.
    async update(fields = {}) {
        
        Object.assign(this, fields);

        this.updatedAt = new Date();
        this.#validate();

        const dataToUpdate = { ...this.toJSON() };
        
        await putDocument(FIRESTORE_CONSTANTS.SETTINGS_COLLECTION, FIRESTORE_CONSTANTS.SOCIAL_DOCUMENT, dataToUpdate);
        
        return this;
    }

    // Busca uma lista de objetos em uma coleção no banco de dados.
    static async findDocument() {
        const doc = await getDocument(FIRESTORE_CONSTANTS.SETTINGS_COLLECTION, FIRESTORE_CONSTANTS.SOCIAL_DOCUMENT);
        return SocialModel.fromObject(doc);
    }
}