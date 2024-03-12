import express from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import estilistaRoutes from "./routes/estilistaRoutes.js";



const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

app.use("/api/estilistas", estilistaRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto ${PORT}`);
});
