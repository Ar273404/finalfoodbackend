import express from 'express'
// import authMiddleware from '../middleware/auth.js'
import verifyToken from '../middleware/VarifyToken.js';
import { placeOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place",verifyToken,placeOrder);

export default orderRouter;