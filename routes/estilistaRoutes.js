import express from "express";
const router = express.Router();
import { 
    registrar,
    perfil,
    confirmar,
    autenticar }
from "../controllers/estilistaControllers.js";
import checkAuth from "../middleware/authmiddleware.js";

router.post("/", registrar );
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);



router.get("/perfil", checkAuth, perfil );
//router.get('/clients', checkAuth)



export default router;