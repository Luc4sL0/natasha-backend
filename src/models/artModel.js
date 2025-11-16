import { API_DOMAIN } from "../config/config.js";
import { FIRESTORE_CONSTANTS } from "../constants/generalConsts.js";
import { getDateFromFirestore } from "../helpers/dataFormat.js";
import { createDocument, deleteDocument, getAllDocuments, getDocument, getDocumentsByCategory, putDocument, getFeaturedDocuments } from "../services/firestoreService.js";
import fs from "fs";
import path from 'path';

export class ArtModel {
    constructor({
        id,
        title,
        description,
        category,
        artYear,
        mainImgUrl,
        othersImages,
        featured,
        available,
        price,
        location,
        tags,
        createdAt,
        updatedAt,
        artist_name
    }){
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.artYear = artYear;
    this.mainImgUrl = mainImgUrl;
    this.othersImages = othersImages || []; 
    this.featured = featured;
    this.available = available;
    this.price = price;
    this.location = location;
    this.tags = tags || []; 
    this.createdAt = getDateFromFirestore(createdAt); 
    this.updatedAt = getDateFromFirestore(updatedAt); 
    this.artist_name = artist_name;
    }   

    #validate(){
      const errors = [];
      if(!this.title) errors.push("O campo 'title' é obrigatório.");
      if(!this.description) errors.push("O campo 'description' é obrigatório");
      if(!this.artYear) errors.push("O campo 'artYear' é obrigatório.");
      if(!this.mainImgUrl) errors.push("O campo 'mainImgUrl' é obrigatório.");

      if (errors.length > 0){
          throw new Error(errors.join(" "));
      }
    }

    static fromObject(obj = {}){
      if(!obj) return null;
      return new ArtModel({
        id: obj.id || obj._id || null,
        title: obj.title || null,
        description: obj.description || null,
        category: obj.category || null,
        artYear: obj.artYear || null,
        mainImgUrl: obj.mainImgUrl || null,
        othersImages: obj.othersImages || [],
        featured: obj.featured ?? false, 
        available: obj.available ?? false,
        price: obj.price || null,
        location: obj.location || null,
        tags: obj.tags || [],
        createdAt: getDateFromFirestore(obj.createdAt),
        updatedAt: getDateFromFirestore(obj.updatedAt),
        artist_name: obj.artist_name || null
      });
    }

    toJSON() {
        return {
          id: this.id,
          title: this.title,
          description: this.description,
          category: this.category,
          artYear: this.artYear,
          mainImgUrl: this.mainImgUrl,
          othersImages: this.othersImages,
          featured: this.featured, 
          available: this.available,
          price: this.price,
          location: this.location,
          tags: this.tags,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
          artist_name: this.artist_name
      };
  }

  // Prepara o objeto para a resposta da API.
  toAnswer(){
    let answer = this.toJSON();
    if(answer.mainImgUrl) answer.mainImgUrl = API_DOMAIN + answer.mainImgUrl;
    answer.othersImages = answer.othersImages.map(url => API_DOMAIN + url);
    return answer;
  }

  async create(){
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.#validate();

    const dataToSave = this.toJSON();
    delete dataToSave.id;
    this.id = await createDocument(FIRESTORE_CONSTANTS.ARTS_COLLECTION, dataToSave);
    return this;
  }

  async update(fields = {}){
    if(!this.id) throw new Error("Arte não possui ID para ser atualizada.");
    Object.assign(this, fields);
    this.#validate();

    const dataToUpdate = this.toJSON();;
    delete dataToUpdate.id;

    await putDocument(FIRESTORE_CONSTANTS.ARTS_COLLECTION, this.id, dataToUpdate);

    return this;
  }

  async delete() {
    if (!this.id) throw new Error("Arte não possui ID para ser excluída");
    await deleteDocument(FIRESTORE_CONSTANTS.ARTS_COLLECTION, this.id);
    this.deleteAllImages();
  }
  
  static async findById(id) {
    const data = await getDocument(FIRESTORE_CONSTANTS.ARTS_COLLECTION, id);
    return data ? ArtModel.fromObject(data) : null;
  }

  static async findAll() {
    const list = await getAllDocuments(FIRESTORE_CONSTANTS.ARTS_COLLECTION);
    return list.map((doc) => ArtModel.fromObject(doc));
  }

  static async findByCategory(category){
    const list = await getDocumentsByCategory(FIRESTORE_CONSTANTS.ARTS_COLLECTION, category);
    return list.map((doc) => ArtModel.fromObject(doc));
  }

  static async getFeaturedArts(){
    const list = await getFeaturedDocuments(FIRESTORE_CONSTANTS.ARTS_COLLECTION);

    return list.map((doc) => ArtModel.fromObject(doc));
  }

  deleteAllImages(){
    this.deleteMainImg();
    this.deleteOtherImgs();
  }

  deleteMainImg(){
    if(!this.mainImgUrl) return;
    const img = this.mainImgUrl;
    const nameImg = path.basename(img);
    const pathImg = path.join('uploads', nameImg);
    fs.unlink(pathImg, (error) => {
      if(error){
        throw new Error("Erro ao deletar imagem principal do evento.");
      }
    });
  }


  deleteOtherImgs(){
    if(!this.othersImages || this.othersImages.length == 0) return;
    this.othersImages.forEach(img => {
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