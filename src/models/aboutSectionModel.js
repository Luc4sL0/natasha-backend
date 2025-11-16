import { API_DOMAIN } from "../config/config.js";
import { FIRESTORE_CONSTANTS } from "../constants/generalConsts.js";
import { getDateFromFirestore } from "../helpers/dataFormat.js";
import { getDocument, putDocument } from "../services/firestoreService.js";
import fs from "fs";
import path from 'path';

export class AboutSectionModel{
    constructor({id, imgUrl, text, updatedAt}){
        this.id = id;
        this.imgUrl = imgUrl;
        this.text = text;
        this.updatedAt = getDateFromFirestore(updatedAt);
    }

    #validate(){
        if(!this.id) throw new Error("ID é obrigatório.")
        if(!this.imgUrl) throw new Error("imgUrl é obrigatório.")
        if(!this.text) throw new Error("text é obrigatório.");
    }

    // Cria uma instância da classe a partir de um objeto comum
    static fromObject(obj = {}) {
        if (!obj) return null;
        return new AboutSectionModel({
            id: obj.id || obj._id || null,
            imgUrl: obj.imgUrl || null,
            text: obj.text || "Texto vazio, personalize-o.",
            updatedAt: getDateFromFirestore(obj.updatedAt)
        });
    }

    // Transforma a instância em JSON
    toJSON() {
        return {
            id: this.id,
            imgUrl: this.imgUrl,
            text: this.text,
            updatedAt: this.updatedAt
        };
    }

    // Prepara o objeto para a resposta da API.
    toAnswer(){
        let answer = this.toJSON();
        answer.imgUrl = API_DOMAIN + answer.imgUrl;
        return answer;
    }

    // Atualiza o objeto em uma coleção no banco de dados.
    async update(fields = {}) {
        
        Object.assign(this, fields);

        this.updatedAt = new Date();
        this.#validate();

        const dataToUpdate = { ...this.toJSON() };
        delete dataToUpdate.id;

        const doc = await getDocument(FIRESTORE_CONSTANTS.ABOUT_SECTION_COLLECTION, this.id);
        if(!doc) throw new Error(`O documento com id = ${this.id} não existe.`)

        await putDocument(FIRESTORE_CONSTANTS.ABOUT_SECTION_COLLECTION, this.id, dataToUpdate);
        
        return this;
    }
    
    // Busca uma lista de objetos em uma coleção no banco de dados.
    static async findDocument(id) {
        const doc = await getDocument(FIRESTORE_CONSTANTS.ABOUT_SECTION_COLLECTION, id);
        return AboutSectionModel.fromObject(doc);
    }

    deleteImg(){
        if(!this.imgUrl) return;
        const img = this.imgUrl;
        const nameImg = path.basename(img);
        const pathImg = path.join('uploads', nameImg);
        fs.unlink(pathImg, (error) => {
            if(error){
                throw new Error("Erro ao deletar imagem principal do evento.");
            }
        });
    }
}