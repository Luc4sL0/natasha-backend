import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";

const serviceAccountPath = path.resolve("src/config/firebase-service-account.json");
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();