import dotenv from "dotenv";
dotenv.config();

export const API_DOMAIN =
  process.env.NODE_ENV === "production"
    ? process.env.API_DOMAIN_PROD
    : process.env.API_DOMAIN_DEV;

export const PORT = process.env.PORT || 3000;