import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import { foodRouter } from "./routes/foodRoute.js";
import {register,login } from "./controllers/userAuthController.js";
//app config
 const app = express();
 const port = 5000


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

app.get("/",(req,res)=>{
  res.send("Api Working")
})

app.listen(port,()=>{
    console.log(`Server Started on https://localhost:${port}`)
})