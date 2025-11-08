import { USERS_COLLECTION } from "../services/authService.js";
import { getDocument } from "../services/firestoreService.js";
import { verifyToken } from "./verifyToken.js";

/**
 * @brief Verifica o token da requisição e se o autenticado
 * é administrador.
 * 
 * @param req - dados da requisição.
 * @param res - dados da resposta.
 * @param next - próxima função a ser executada (próximo).
 */
export async function verifyAdmin(req, res, next) {
  await verifyToken(req, res, async () => {
    const userData = await getDocument(USERS_COLLECTION, req.user.uid);
    if (!userData) return res.status(403).json({ error: "Usuário não encontrado" });
    if (userData.role !== "admin") return res.status(403).json({ error: "Acesso negado" });
    
    req.userData = userData;
    req.userData.id = req.user.uid;
    
    next();
  });
}
