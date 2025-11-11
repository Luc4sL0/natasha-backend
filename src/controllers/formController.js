import { FormModel } from "../models/formModel.js";

export const getFormController = async (req, res) =>{
    try{
        const form = await FormModel.findDocument();
        return res.status(200).json(form.toJSON());
    }
    catch(error){
        return res.status(500).json({error: `Problema ao buscar dados do formulário: ${error}`});
    }
}

export const putFormController = async (req, res) =>{
    try{
        let form = FormModel.findDocument();
        if(!form) throw new Error("Não existe um documento com 'id' 'form' no banco de dados");

        const updates = { ...req.body };
        await form.update(updates);
        
        return res.status(201).json(form);
    }
    catch(error){
        return res.status(500).json({error: `Problema ao atualizar dados do formulário: ${error}`});
    }
}
