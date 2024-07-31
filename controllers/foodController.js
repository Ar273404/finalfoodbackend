import Food from "../models/foodModel.js";
import fs from "fs";

//add food item
 export const addFood = async(req,res) =>{
  if(!req.files || Object.keys(req.files).length===0)
  {
     return alert("image required!");
  }
   
  const {image} = req.files;
  const allowformates = ["image/png","image/jpeg","image/webp"];
  if(!allowformates.includes(image.mimetype))
  {
    return alert("file format must be png ,jpeg, or webp");
  }

   const cloudinaryResponse = await cloudinary.uploader.upload(
     image.tempFilesPath
   )
   if(!cloudinaryResponse || cloudinaryResponse.error)
   {
     console.log("error occur in uploading image to cloudinary")
   }

   const food = new Food({
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      category:req.body.category,
      image:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url,
      }
   });
    
   try{
        await food.save();
        res.json({success:true,message:"food added"})
   }catch (error){
       console.log(error)
       res.json({success:false,message:"Error"})
   }
  }
     //all food list
   export const listFood = async (req,res)=>{
     try{
       const foods = await Food.find({});
       res.json({success:true,data:foods})
     }
     catch(error){
       res.json({success:false,message:"error"});
     }

}
 export const removeFood = async (req, res) => {
   try {
     const food = await Food.findById(req.body.id);
     await Food.findByIdAndDelete(req.body.id);
     res.json({ success: true, message:"food remove successfully" });
   } catch (error) {
      console.log(error);
     res.json({ success: false, message: "error" });
   }
 };

