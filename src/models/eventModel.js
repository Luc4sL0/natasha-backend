import { API_DOMAIN } from "../config/config.js";
import { FIRESTORE_CONSTANTS } from "../constants/generalConsts.js";
import { getDateFromFirestore } from "../helpers/dataFormat.js";
import { createDocument, deleteDocument, getAllDocuments, getDocument, putDocument } from "../services/firestoreService.js";
import fs from "fs";
import path from 'path';

export class EventModel {
  constructor({
    id,
    title,
    description,
    location,
    startDate,
    endDate,
    coverImgUrl,
    otherImages,
    highlighted,
    status,
    artist_names,
    tags,
    createdAt,
    updatedAt,
  }) {
    this.id = id || null;
    this.title = title || null;
    this.description = description || null;
    this.location = location || null;
    this.startDate = getDateFromFirestore(startDate);
    this.endDate = getDateFromFirestore(endDate);
    this.coverImgUrl = coverImgUrl || null;
    this.otherImages = otherImages || [];
    this.highlighted = highlighted || false;
    this.status = status || "visible";
    this.artist_names = artist_names || [];
    this.tags = tags || [];
    this.createdAt = getDateFromFirestore(createdAt);
    this.updatedAt = getDateFromFirestore(updatedAt); 
  }

  #validate() {
    const errors = [];

    if (!this.title) errors.push("O campo 'title' é obrigatório.");
    if (!this.startDate) errors.push("O campo 'startDate' é obrigatório.");
    if (!this.endDate) errors.push("O campo 'endDate' é obrigatório.");

    if (this.startDate && this.endDate && this.endDate < this.startDate) {
      errors.push("A data de término não pode ser anterior à data de início.");
    }

    if (!["visible", "hidden"].includes(this.status)) {
      errors.push("O status informado é inválido.");
    }

    if (errors.length > 0) {
      throw new Error(errors.join(" "));
    }
  }

  // Cria uma instância da classe a partir de um objeto comum
  static fromObject(obj = {}) {
    if (!obj) return null;
    return new EventModel({
      id: obj.id || obj._id || null,
      title: obj.title || null,
      description: obj.description || null,
      location: obj.location || null,
      startDate: getDateFromFirestore(obj.startDate),
      endDate: getDateFromFirestore(obj.endDate),
      coverImgUrl: obj.coverImgUrl || null,
      otherImages: obj.otherImages || [],
      highlighted: obj.highlighted || false,
      status: obj.status || "draft",
      artist_names: obj.artist_names || [],
      tags: obj.tags || [],
      createdAt: getDateFromFirestore(obj.createdAt),
      updatedAt: getDateFromFirestore(obj.updatedAt)
    });
  }

  // Transforma a instância em JSON
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      location: this.location,
      startDate: this.startDate,
      endDate: this.endDate,
      coverImgUrl: this.coverImgUrl,
      otherImages: this.otherImages,
      highlighted: this.highlighted,
      status: this.status,
      artist_names: this.artist_names,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Prepara o objeto para a resposta da API.
  toAnswer(){
    let answer = this.toJSON();
    if(answer.coverImgUrl) answer.coverImgUrl = API_DOMAIN + answer.coverImgUrl;
    answer.otherImages = answer.otherImages.map(url => API_DOMAIN + url);
    return answer;
  }

  // Salva o objeto em uma coleção no banco de dados.
  async create(){
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.#validate();

    const dataToSave = { ...this.toJSON() };
    delete dataToSave.id;
    this.id = await createDocument(FIRESTORE_CONSTANTS.EVENTS_COLLECTION, dataToSave);

    return this;
  }

  // Atualiza o objeto em uma coleção no banco de dados.
  async update(fields = {}) {
    if (!this.id) throw new Error("Evento não possui ID para ser atualizado.");
    
    Object.assign(this, fields);
    this.updatedAt = new Date();
    this.#validate();

    const dataToUpdate = { ...this.toJSON() };
    delete dataToUpdate.id;
    
    await putDocument(FIRESTORE_CONSTANTS.EVENTS_COLLECTION, this.id, dataToUpdate);
    
    return this;
  }

  // Deleta o objeto em uma coleção no banco de dados.
  async delete() {
    if (!this.id) throw new Error("Evento não possui ID para ser excluído");
    await deleteDocument(FIRESTORE_CONSTANTS.EVENTS_COLLECTION, this.id);
    this.deleteAllImages();
  }

  // Busca o objeto no banco de dados.
  static async findById(id) {
    const data = await getDocument(FIRESTORE_CONSTANTS.EVENTS_COLLECTION, id);
    return data ? EventModel.fromObject(data) : null;
  }

  // Busca uma lista de objetos em uma coleção no banco de dados.
  static async findAll() {
    const list = await getAllDocuments(FIRESTORE_CONSTANTS.EVENTS_COLLECTION);
    return list.map((doc) => EventModel.fromObject(doc));
  }

  deleteAllImages(){
    this.deleteCoverImg();
    this.deleteOtherImgs();
  }

  deleteCoverImg(){
    if(!this.coverImgUrl) return;
    const img = this.coverImgUrl;
    const nameImg = path.basename(img);
    const pathImg = path.join('uploads', nameImg);
    fs.unlink(pathImg, (error) => {
      if(error){
        throw new Error("Erro ao deletar imagem principal do evento.");
      }
    });
  }


  deleteOtherImgs(){
    if(!this.otherImages || this.otherImages.length == 0) return;
    this.otherImages.forEach(img => {
      const nameImg = path.basename(img);
      const pathImg = path.join('uploads', nameImg);
      fs.unlink(pathImg, (error) => {
        if(error){
          throw new Error("Erro ao deletar outras imagens do evento.");
        }
      })
    })
  }
}
