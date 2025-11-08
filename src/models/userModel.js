import { getDateFromFirestore } from "../helpers/dataFormat.js";

export class UserModel{
  constructor({ id, email, displayName, role, createdAt, updatedAt }){
    if(!id || !email) throw new Error("Usuário sem identificador e/ou email");

    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.role = role;
    this.createdAt = getDateFromFirestore(createdAt);
    this.updatedAt = getDateFromFirestore(updatedAt);
  }

  // Cria uma instância da classe a partir de um objeto comum
  static fromObject(obj = {}) {
    if (!obj) return null;
    return new UserModel({
      id: obj.id || obj._id || null,
      email: obj.email || null,
      displayName: obj.displayName || null,
      role: obj.role || null,
      createdAt: getDateFromFirestore(obj.createdAt),
      updatedAt: getDateFromFirestore(obj.updatedAt)
    });
  }

  // Transforma a instância em JSON
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}