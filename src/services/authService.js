import { auth, db } from "../config/firebase.js";
import { UserModel } from "../models/userModel.js";
import { getDocument, putDocument } from "./firestoreService.js";

export const USERS_COLLECTION = "users";

/**
 * @brief Cria um usuário.
 * @param - dados do usuário.
 * @returns - registro de usuário.
 */
export const createUser = async (email, password, displayName, role = "reader") => {
  const userRecord = await auth.createUser({
    email,
    password,
    displayName,
    emailVerified: false,
    disabled: false,
  });

  await db.collection(USERS_COLLECTION).doc(userRecord.uid).set({
    email,
    displayName,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const user = UserModel.fromObject({
    id: userRecord.uid,
    email,
    displayName,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return user;
}


/**
 * @brief Revoga todos os tokens do usuário (logout forçado).
 * @param id - identificador único do usuário.
 */
export const logout = async (id) => {
  await auth.revokeRefreshTokens(id);
}


/**
 * @brief Alteração de senha 
 * @param id - identificador único do usuário.
 * @param newPassword - nova senha.
 */
export const changePassword = async (id, newPassword) =>{
  await auth.updateUser(id, { password: newPassword });
}


/**
 * @brief Retorna os dados do Firestore vinculados ao usuário 
 * @param uid - identificador único do usuário.
 */
export const getUserData = async(id) => {
  const userDoc = await getDocument(USERS_COLLECTION, id);
  if (!userDoc) throw new Error("Usuário não encontrado.");
  return UserModel.fromObject(userDoc);
}


/**
 * @brief Atualiza os dados do Firestore vinculados ao usuário 
 * @param uid - identificador único do usuário.
 * @param data - novos dados.
 */
export const updateUserData =  async (id, data) => {
  data.updatedAt = new Date();
  await putDocument(USERS_COLLECTION, id, data)
}