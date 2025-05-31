//csRoutes.js
import express from 'express';
import { viewAllCS,addCS,updateCS, deleteCS } from '../controllers/chargingController.js';
import { protect, adminOnly } from "../middlewares/protectedRoute.js";
const router = express.Router();

router.get('/allChargingStations',protect,viewAllCS);
router.post('/addChargingStation',protect,adminOnly,addCS);
router.put('/updateChargingStation/:id',protect,adminOnly,updateCS);
router.delete('/deleteChargingStation/:id',protect,adminOnly,deleteCS);

export default router;