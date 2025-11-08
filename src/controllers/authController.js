import { changePassword, createUser, getUserData, logout } from "../services/authService.js";

export const createUserController = async (req, res) => {
  try {
    if(!req.body.email || !req.body.password){
      throw new Error("Parâmetros ausentes.")
    }
    const user = await createUser(req.body.email, req.body.password, req.body.displayName, req.body.role);
    return res.status(201).json(user.toJSON());
  } 
  catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

export const logoutController = async (req, res) => {
  try {
    const targetId = req.params.id;
    const requesterID = req.userID;

    if (!targetId) throw new Error("Parâmetros ausentes.");

    const targetUser = await getUserData(targetId);

    if (targetUser.id !== requesterID) {
      return res.status(403).json({ error: "Você não pode revogar tokens de outro usuário." });
    }


    await logout(targetId);
    return res.status(200).json({ message: "Tokens revogados." });
  } 
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const changePasswordController = async (req, res) => {
  try {
    const targetId = req.params.id;
    const requesterID = req.userID;

    if (!targetId || !req.body.newPassword) {
      throw new Error("Parâmetros ausentes.");
    }

    const targetUser = await getUserData(targetId);
    if (targetUser.id !== requesterID) {
      return res.status(403).json({ error: "Você não pode alterar senha de outro usuário." });
    }

    await changePassword(targetId, req.body.newPassword);
    return res.status(200).json({ message: "Senha alterada com êxito." });
  } 
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const getUserController = async (req, res) => {
  try {
    const targetId = req.params.id;
    const requesterID = req.userID;

    if (!targetId) throw new Error("Parâmetros ausentes.");

    const user = await getUserData(targetId);

    if (requesterID !== targetId) {
      return res.status(403).json({ error: "Acesso negado." });
    }

    return res.status(200).json(user.toJSON());
  } 
  catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

