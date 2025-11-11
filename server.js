import express from "express";
import cors from "cors";
import formData from "express-form-data";
import eventRoutes from "./src/routes/eventRoutes.js";
import artRoutes from "./src/routes/artRoutes.js"
import authRoutes from "./src/routes/authRoutes.js";
import socialRoutes from "./src/routes/socialRoutes.js";
import formRoutes from "./src/routes/formRoutes.js";
import aboutSectionRoutes from "./src/routes/aboutSectionRoutes.js";
import serverless from "serverless-http";

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
        "POST /api/v1/auth/create",
        "POST /api/v1/auth/logout",
        "POST /api/v1/auth/change-password",
        "GET /api/v1/auth/user/:id",
      ],
    },
  });
});

export const handler = serverless(app);
