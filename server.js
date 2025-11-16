import express from "express";
import cors from "cors";
import formData from "express-form-data";
import eventRoutes from "./src/routes/eventRoutes.js";
import artRoutes from "./src/routes/artRoutes.js"
import authRoutes from "./src/routes/authRoutes.js";
import socialRoutes from "./src/routes/socialRoutes.js";
import formRoutes from "./src/routes/formRoutes.js";
import aboutSectionRoutes from "./src/routes/aboutSectionRoutes.js";
import  "./src/config/config.js";
import { PORT } from "./src/config/config.js";

const corsOptions = {
  origin: '*',  
  methods: ['GET', 'POST',  'PUT', 'DELETE'],
  optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(formData.format());
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", eventRoutes);
app.use("/api/v1", artRoutes);
app.use("/api/v1", socialRoutes);
app.use("/api/v1", formRoutes);
app.use("/api/v1", aboutSectionRoutes);

app.use("/api/v1/auth", authRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    message: "API natasha gallery's está online!",
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));