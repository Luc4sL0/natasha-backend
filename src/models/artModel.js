import { getDateFromFirestore } from "../helpers/dataFormat.js";
import { createDocument, deleteDocument, getAllDocuments, getDocument, getDocumentsByCategory, putDocument, getFeaturedDocuments } from "../services/firestoreService.js";

const ARTS_COLLECTION = "arts";
export class ArtModel {
    constructor({
        id,
        title,
        description,
        category,
        materials,
        artDate,
        mainImgUrl,
        othersImages,
        featured,
        available,
        price,
        location,
        tags,
        createdAt,
        updatedAt,
        likes,
        artist_id
    }){
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.materials = materials;
    this.artDate = artDate;
    this.mainImgUrl = mainImgUrl;
    this.othersImages = othersImages || []; 
    this.featured = featured;
    this.available = available;
    this.price = price;
    this.location = location;
    this.tags = tags || []; 
    this.createdAt = getDateFromFirestore(createdAt); 
    this.updatedAt = getDateFromFirestore(updatedAt); 
    this.likes = likes ?? 0; 
    this.artist_id = artist_id;

    }   

    #validate(){
        const errors = [];
        if(!this.title) errors.push("O campo 'title' é obrigatório.");
        if(!this.description) errors.push("O campo 'description' é obrigatório");
        if(!this.category) errors.push("O campo 'category' é obrigatório.");
        if(!this.materials) errors.push("O campo 'materials' é obrigatório.");
        if(!this.artDate) errors.push("O campo 'artDate' é obrigatório.");
        if(!this.mainImgUrl) errors.push("O campo 'mainImgUrl' é obrigatório.");
        if(this.available ==  null) errors.push("O campo 'available' é obrigatório.");
        if(!this.price) errors.push("O campo 'price' é obrigatório.");

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
            materials: obj.materials || null, 
            artDate: obj.artDate || null,
            mainImgUrl: obj.mainImgUrl || null,
            othersImages: obj.othersImages || [],
            featured: obj.featured ?? false, 
            available: obj.available ?? false,
            price: obj.price || null,
            location: obj.location || null,
            tags: obj.tags || [],
            createdAt: getDateFromFirestore(obj.createdAt),
            updatedAt: getDateFromFirestore(obj.updatedAt),
            likes: obj.likes ?? 0,
            artist_id: obj.artist_id || null
        });
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            category: this.category,
            materials: this.materials, 
            artDate: this.artDate,
            mainImgUrl: this.mainImgUrl,
            othersImages: this.othersImages,
            featured: this.featured, 
            available: this.available,
            price: this.price,
            location: this.location,
            tags: this.tags,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            likes: this.likes,
            artist_id: this.artist_id
        };
  }

  async create(){
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.#validate();

    const dataToSave = this.toJSON();
    delete dataToSave.id;
    this.id = await createDocument(ARTS_COLLECTION, dataToSave);
    return this;
  }

  async update(fields = {}){
    if(!this.id) throw new Error("Arte não possui ID para ser atualizada.");
    Object.assign(this, fields);
    this.#validate();

    const dataToUpdate = this.toJSON();;
    delete dataToUpdate.id;

    await putDocument(ARTS_COLLECTION, this.id, dataToUpdate);

    return this;
  }

  async delete() {
    if (!this.id) throw new Error("Arte não possui ID para ser excluída");
    await deleteDocument(ARTS_COLLECTION, this.id);
  }
  
  static async findById(id) {
    const data = await getDocument(ARTS_COLLECTION, id);
    return data ? ArtModel.fromObject(data) : null;
  }

  static async findAll() {
    const list = await getAllDocuments(ARTS_COLLECTION);
    return list.map((doc) => ArtModel.fromObject(doc));
  }

  static async findByCategory(category){
    const list = await getDocumentsByCategory(ARTS_COLLECTION,category);
    return list.map((doc) => ArtModel.fromObject(doc));
  }

  static async getFeaturedArts(){
    const list = await getFeaturedDocuments(ARTS_COLLECTION);

    return list.map((doc) => ArtModel.fromObject(doc));
  }


  
}