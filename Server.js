import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import { foodRouter } from "./routes/foodRoute.js";
import {
  register,
  login,
  getUserProfile,
  createUserProfile,
} from "./controllers/userAuthController.js";
import { userContactMessage } from "./controllers/userMessageController.js";
import 'dotenv/config'
import verifyToken from "./middleware/VarifyToken.js";
import addToCart, { getCartItem,handleDelete} from "./controllers/addToCart.js";
import { decrementCartItem, incrementCartItem } from "./controllers/cartController.js";
import orderRouter from "./routes/orderRoute.js";
//app config
 const app = express();
 const port = process.env.port || 5000;


//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();



//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/User_register", register);
app.use("/User_login", login);
app.use("/getUserProfile", verifyToken, getUserProfile);
app.use("/createUserProfile", verifyToken, createUserProfile);
app.use("/contactUser", verifyToken, userContactMessage);
app.use("/addtocart",verifyToken,addToCart)
app.use("/cartitem",verifyToken,getCartItem)
app.use("/cart/add/:productId", verifyToken, incrementCartItem);
app.use("/cart/decrement/:productId", verifyToken, decrementCartItem);
app.use('/cartItemDelete/:id',verifyToken,handleDelete);
app.use('/order',verifyToken,orderRouter);
app.get("/",(req,res)=>{
  res.send("Api Working")
})

app.listen(port,()=>{
    console.log(`Server Started on https://localhost:${port}`)
});