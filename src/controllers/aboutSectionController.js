import { AboutSectionModel } from "../models/aboutSectionModel.js";

export const getAboutSectionController = async (req, res) =>{
    try{
        const id = req.params.id;
        if(!id) throw new Error("Faltaram parâmetros na requisição.");
        const about = await AboutSectionModel.findDocument(id);
        return res.status(200).json(about.toAnswer());
    }
    catch(error){
        return res.status(500).json({error: `Problema ao buscar dados de seções sobre: ${error}`});
    }
}

export const putAboutSectionController = async (req, res) =>{
    try{
        const id = req.params.id;
        if(!id) throw new Error("Faltaram parâmetros na requisição.");
        let about = await AboutSectionModel.findDocument(id); 
        const updates = { ...req.body };

        if (req.files?.coverImg?.[0]) {
            updates.imgUrl = `/uploads/${req.files.coverImg[0].filename}`;
            about.deleteImg()
        }

        await about.update(updates);
        return res.status(201).json(about.toAnswer());
    }
    catch(error){
        return res.status(500).json({error: `Problema ao buscar dados de seções sobre: ${error}`});
    }
}
