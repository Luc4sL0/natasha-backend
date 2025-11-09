import { ArtModel } from "../models/artModel.js";
import fs from "fs";
import path from 'path';
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
    body.likes = parseInt(body.likes);
    body.price = parseFloat(body.price);
    body.artDate = new Date(body.artDate);

    const art = ArtModel.fromObject(body);
    console.log(art);

    if(!art){
      throw new Error("Ocorreu um erro ao ler os dados do body.")
    }
    
    await art.create();
    return res.status(201).json(art.toJSON());
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
    updates.likes = parseInt(req.body.likes);
    updates.price = parseFloat(req.body.price);
    updates.artDate = new Date(req.body.artDate);

    if (req.files?.mainImgUrl?.[0]) {
      updates.mainImgUrl = `/uploads/${req.files.mainImgUrl[0].filename}`;
    }
    
    if (req.files?.otherImages?.length > 0) {
      updates.otherImages = req.files.otherImages.map(
        (file) => `/uploads/${file.filename}`
      );
    }
    
    await art.update(updates);
    return res.status(200).json(art.toJSON());
  }catch(e){
    return res.status(500).json({"error":`Erro ao atualizar arte: ${e}`});
  }
}

export const deleteArtController = async (req,res) =>{
    try{    
      if(!req.params.id) {
        throw new Error("Faltaram parâmetros na requisição.")
      }
      const art = await ArtModel.findById(req.params.id); 
      await art.delete();
      const imgs = [art.mainImgUrl].concat(art.othersImages);
      imgs.forEach(img => {
        const nomeImg = path.basename(img);
        const caminho = path.join('uploads', nomeImg);
        fs.unlink(caminho, (erro) => {
          if(erro){
            console.log("Erro ao deletar imagem");
          }
        })
      })
      return res.status(204).send();
    }
    catch(error){
      return res.status(500).json({"error":`Erro ao deletar arte: ${error}`});
    }
}

export const getArtsController = async (req, res) => {
    try{
        const arts = await ArtModel.findAll();
        arts.map(art => console.log(art.toJSON()));

        return res.status(200).json(arts.map(art => art.toJSON()));
    }catch(e){
        return res.status(500).json({"error":`Erro ao obter todas as artes: ${e}`});
    }
}

export const getArtByIdController = async (req, res) => {
    try{
        const art = await ArtModel.findById(req.params.id);

        return res.status(200).json(art.toJSON());
    }catch(e){
        return res.status(500).json({"error":`Erro ao obter a arte: ${e}`})
    }
}

export const getArtByCategoryController = async(req, res) => {
    try{
        const arts = await ArtModel.findByCategory(req.params.category);
        return res.status(200).json(arts.map(art => art.toJSON()));
    }catch(e){
        return res.status(500).json({"error":`Erro ao obter artes por categoria: ${e}`})
    }
}

export const getFeaturedArtController = async(req, res) => {
    try{
        const arts = await ArtModel.getFeaturedArts();
        return res.status(200).json(arts.map(art => art.toJSON()));
    }catch(e){
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
      res.status(200).json(arts[random].toJSON());
    }catch(e){
      return res.status(500).json({"error":`Erro ao obter arte aleatoria: ${e}`})
    }
}