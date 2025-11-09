import { db } from "../config/firebase.js";


/**
 * @brief Busca todos os documentos de uma coleção.
 * @param collection - Nome da coleção de dados. 
 * @returns - mapa contendo todos os documentos encontrados.
 */
export const getAllDocuments = async (collection) => {
  const snapshot = await db.collection(collection).get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}


/**
 * @brief Busca um o documento específico dentro de uma coleção.
 * @param collection - Nome da coleção de dados. 
 * @param id - ID do documento.
 * @returns - null (não existe), dados do documento (existe).
 */
export const getDocument = async (collection, id) => {
  const doc = await db.collection(collection).doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data();
  return { id: doc.id, ...data };
}

export const getDocumentsByCategory = async (collection, category) =>{
  const q = db.collection(collection).where("category", "==", category);
  const queryResult = await q.get();
  if(queryResult.empty) return [];
  const data = queryResult.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  return data;
}

export const getFeaturedDocuments = async (collection) =>{
  const q = db.collection(collection).where("featured", "==", true);
  const queryResult = await q.get();
  if(queryResult.empty) return [];
  const data = queryResult.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  return data;
}

/**
 * @brief Cria um documento dentro de uma coleção.
 * @param collection - Nome da coleção de dados. 
 * @param data - Dados a serem armazenados.
 * @returns - ID do documento criado.
 */
export const createDocument = async (collection, data) => {
  const ref = await db.collection(collection).add({
    ...data,
  });
  return ref.id;
}


/**
 * @brief Atualiza um documento específico dentro de uma coleção.
 * @param collection - Nome da coleção de dados. 
 * @param id - ID do documento.
 * @param data - Dados novos a serem armazenados.
 */
export const putDocument = async (collection, id, data) => {
  await db.collection(collection).doc(id).update({
    ...data,
  });
}


/**
 * @brief Exclui um documento específico dentro de uma coleção.
 * @param collection - Nome da coleção de dados. 
 * @param id - ID do documento.
 */
export const deleteDocument = async (collection, id) => {
  await db.collection(collection).doc(id).delete();
}