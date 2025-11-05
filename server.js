import express from "express";
import cors from "cors";
import formData from "express-form-data";
import eventRoutes from "./src/routes/eventRoutes.js";

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

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API do sistema de eventos está online!",
    endpoints: {
      public: [
        "GET /api/v1/events",
        "GET /api/v1/event/:id",
        "GET /api/v1/events/current",
        "GET /api/v1/events/upcoming",
        "GET /api/v1/events/past",
        "GET /api/v1/event/next",
        "GET /api/v1/event/last",
        "GET /api/v1/events/highlighted",
        "GET /api/v1/events/status/:status",
        "GET /api/v1/events/location/:city",
      ],
      protected: [
        "POST /api/v1/event",
        "PUT /api/v1/event/:id",
        "DELETE /api/v1/event/:id",
      ],
    },
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
