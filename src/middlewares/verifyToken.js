import { auth } from "../config/firebase.js";

/**
 * @brief Verifica o token da requisição 
 * @param req - dados da requisição.
 * @param res - dados da resposta.
 * @param next - próxima função a ser executada (próximo).
 */
export async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "Token ausente" });

  try {
    const decoded = await auth.verifyIdToken(token, true);
    
    req.user = decoded;
    req.userID = req.user.uid;

    next();
  } 
  catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
