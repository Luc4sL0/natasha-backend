import { SocialModel } from "../models/socialModel.js";

export const getSocialsController = async (req, res) =>{
    try{
        const socials = await SocialModel.findDocument();
        return res.status(200).json(socials.toJSON());
    }
    catch(error){
        return res.status(500).json({error: `Problema ao buscar links sociais: ${error}`});
    }
}


export const putSocialsController = async (req, res) =>{
    try{
        let socials = await SocialModel.findDocument();
        if(!socials) throw new Error("Não existe um documento com 'id' 'social' no banco de dados");

        const updates = { ...req.body };
        await socials.update(updates);
        
        return res.status(201).json(socials.toJSON());
    }
    catch(error){
        return res.status(500).json({error: `Problema ao atualizar links sociais: ${error}`});
    }
}
