import { ArtModel } from "../models/artModel.js";
import { randomInt } from 'crypto';


export const postArtController = async (req, res) => {
  try{    
    const body = { ...req.body };
    if (req.files?.mainImgUrl?.[0]) {
      body.mainImgUrl = `/uploads/${req.files.mainImgUrl[0].filename}`;
    }

    if (req.files?.otherImages?.length > 0) {
      body.otherImages = req.files.otherImages.map(
        (file) => `/uploads/${file.filename}`
      );
    }

    body.available = (body.available === 'true');
    body.featured = (body.featured === 'true');
    body.price = parseFloat(body.price);

    const art = ArtModel.fromObject(body);

    if(!art){
      throw new Error("Ocorreu um erro ao ler os dados do body.")
    }
    
    await art.create();
    return res.status(201).json(art.toAnswer());
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao criar uma arte: ${error}`});
  }
}


export const putArtController = async (req, res) =>{
  try{
    if(!req.params.id) {
      throw new Error("Faltaram parâmetros na requisição.")
    }
        
    const art = await ArtModel.findById(req.params.id);
    
    if(!art){
      return res.status(404).json({"message":`Arte com ID = ${req.params.id} não encontrado`});
    }
    
    const updates = { ...req.body };
    updates.available = (req.body.available === 'true');
    updates.featured = (req.body.featured === 'true');
    updates.price = parseFloat(req.body.price);

    if (req.files?.mainImgUrl?.[0]) {
      updates.mainImgUrl = `/uploads/${req.files.mainImgUrl[0].filename}`;
      art.deleteMainImg();
    }
    
    if (req.files?.otherImages?.length > 0) {
      updates.otherImages = req.files.otherImages.map(
        (file) => `/uploads/${file.filename}`
      );
      art.deleteOtherImgs();
    }
    
    await art.update(updates);
    return res.status(200).json(art.toAnswer());
  }
  catch(e){
    return res.status(500).json({"error":`Erro ao atualizar arte: ${e}`});
  }
}


export const deleteArtController = async (req,res) =>{
  try{    
    if(!req.params.id) {
      throw new Error("Faltaram parâmetros na requisição.")
    }
    const art = await ArtModel.findById(req.params.id); 
    if(!art) throw new Error("Arte a ser excluída não encontrada.");

    await art.delete();
    return res.status(204).send();
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao deletar arte: ${error}`});
  }
}


export const getArtsController = async (req, res) => {
  try{
    const arts = await ArtModel.findAll();
    return res.status(200).json(arts.map(art => art.toAnswer()));
  }
  catch(e){
    return res.status(500).json({"error":`Erro ao obter todas as artes: ${e}`});
  }
}


export const getArtByIdController = async (req, res) => {
  try{
    const art = await ArtModel.findById(req.params.id);
    return res.status(200).json(art.toAnswer());
  }
  catch(e){
    return res.status(500).json({"error":`Erro ao obter a arte: ${e}`})
  }
}


export const getArtByCategoryController = async(req, res) => {
  try{
    const arts = await ArtModel.findByCategory(req.params.category);
    return res.status(200).json(arts.map(art => art.toAnswer()));
  }
  catch(e){
    return res.status(500).json({"error":`Erro ao obter artes por categoria: ${e}`})
  }
}

export const getFeaturedArtController = async(req, res) => {
  try{
    const arts = await ArtModel.getFeaturedArts();
    return res.status(200).json(arts.map(art => art.toAnswer()));
  }
  catch(e){
    return res.status(500).json({"error":`Erro ao obter artes em destaque: ${e}`})
  }
}


export const getRandomArtController = async (req, res) => {
  try{
    const arts = await ArtModel.findAll();
    if (arts.length === 0) {
      return res.status(404).json({ "error": "Nenhuma arte encontrada." });
    }
    const random = randomInt(0, arts.length);      
    res.status(200).json(arts[random].toAnswer());
  }
  catch(e){
    return res.status(500).json({"error":`Erro ao obter arte aleatoria: ${e}`})
  }
}