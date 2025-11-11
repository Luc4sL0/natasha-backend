import { EventModel } from "../models/eventModel.js"


export const getEventsController = async (req, res) => {
  try{
    const events = await EventModel.findAll();
    return res.status(200).json(events.map((e) => e.toJSON()));
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter todos os eventos: ${error}`});
  }
}


export const getEventController = async (req, res) => {
  try{
    if(!req.params.id) {
      throw new Error("Faltaram parâmetros na requisição.");
    }

    const event = await EventModel.findById(req.params.id);
    
    if(!event){
      return res.status(404).json({"message":`Evento com ID = ${req.params.id} não encontrado`});
    }
    
    return res.status(200).json(event.toJSON());
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter um evento: ${error}`});
  }
}


export const putEventController = async (req, res) => {
  try{
    if(!req.params.id) {
      throw new Error("Faltaram parâmetros na requisição.")
    }
    
    const event = await EventModel.findById(req.params.id);

    if(!event){
      return res.status(404).json({"message":`Evento com ID = ${req.params.id} não encontrado`});
    }

    const updates = { ...req.body };

    if (req.files?.coverImg?.[0]) {
      updates.coverImgUrl = `/uploads/${req.files.coverImg[0].filename}`;
    }

    if (req.files?.otherImages?.length > 0) {
      updates.otherImages = req.files.otherImages.map(
        (file) => `/uploads/${file.filename}`
      );
    }

    await event.update(updates);
    return res.status(200).json(event.toJSON());
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao atualizar evento: ${error}`});
  }
}


export const postEventController = async (req, res) => {
  try{    
    const body = { ...req.body };

    if (req.files?.coverImg?.[0]) {
      body.coverImgUrl = `/uploads/${req.files.coverImg[0].filename}`;
    }

    if (req.files?.otherImages?.length > 0) {
      body.otherImages = req.files.otherImages.map(
        (file) => `/uploads/${file.filename}`
      );
    }

    const event = EventModel.fromObject(body);

    if(!event){
      throw new Error("Ocorreu um erro ao ler os dados do body.")
    }
    
    await event.create();
    return res.status(201).json(event.toJSON());
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao criar um evento: ${error}`});
  }
}


export const deleteEventController = async (req, res) => {
  try{    
    if(!req.params.id) {
      throw new Error("Faltaram parâmetros na requisição.")
    }

    const event = await EventModel.findById(req.params.id); 
    await event.delete();
    return res.status(204).send();
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter todos os eventos: ${error}`});
  }
}


export const getCurrentEventsController = async (req, res) => {
  try{
    const now = Date.now();
    const events = await EventModel.findAll();
    const currents = events.filter((e) => e.startDate.getTime() <= now && e.endDate >= now);
    return res.status(200).json(currents.map((e) => e.toJSON()));
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter eventos atuais: ${error}`});
  }
}


export const getUpcomingEventsController = async (req, res) => {
  try{
    const events = await EventModel.findAll();
    const upcomings = events.filter((e) => e.startDate.getTime() > Date.now())
    return res.status(200).json(upcomings.map((e) => e.toJSON()));
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter eventos futuros: ${error}`});
  }
}


export const getPastEventsController = async (req, res) => {
  try{
    const events = await EventModel.findAll();
    const pasts = events.filter((e) => e.endDate.getTime() < Date.now())
    return res.status(200).json(pasts.map((e) => e.toJSON()));
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter eventos passados: ${error}`});
  }
}


export const getNextEventController = async (req, res) => {
  try{
    const events = await EventModel.findAll();
    const upcoming = events.filter((e) => e.startDate.getTime() > Date.now());
    upcoming.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const nextEvent = upcoming.length > 0 ? upcoming[0] : null;

    if (!nextEvent) {
      return res.status(404).json({ "message": "Nenhum evento futuro encontrado." });
    }

    return res.status(200).json(nextEvent.toJSON());
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter próximo evento: ${error}`});
  }
}


export const getLastEventController = async (req, res) => {
  try{
    const events = await EventModel.findAll();
    const pasts = events.filter((e) => e.endDate.getTime() < Date.now());
    pasts.sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
    const lastEvent = pasts.length > 0 ? pasts[0] : null;

    if (!lastEvent) {
      return res.status(404).json({ "message": "Nenhum evento futuro encontrado." });
    }

    return res.status(200).json(lastEvent.toJSON());
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter evento anterior: ${error}`});
  }
}


export const getLocationEventsController = async (req, res) => {
  try{
    if(!req.params.city) {
      throw new Error("Faltaram parâmetros na requisição.")
    }

    const events = await EventModel.findAll();
    const locations = events.filter((e) => e.location?.city === req.params.city);
    return res.status(200).json(locations.map((e) => e.toJSON()));
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter eventos por localização: ${error}`});
  }
}


export const getHighlightedEventsController = async (req, res) => {
  try{
    const events = await EventModel.findAll();
    const highlighteds = events.filter((e) => e.highlighted === true);
    return res.status(200).json(highlighteds.map((e) => e.toJSON()));
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter eventos destacados: ${error}`});
  }
}


export const getStatusEventsController = async (req, res) => {
  try{
    if(!req.params.status) {
      throw new Error("Faltaram parâmetros na requisição.")
    }

    const events = await EventModel.findAll();
    const statuses = events.filter((e) => e.status === req.params.status);
    return res.status(200).json(statuses.map((e) => e.toJSON()));
  }
  catch(error){
    return res.status(500).json({"error":`Erro ao obter eventos por status: ${error}`});
  }
}