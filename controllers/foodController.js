import Food from "../models/foodModel.js";
import fs from "fs";

//add food item
 export const addFood = async(req,res) =>{
   let image_filename = `${req.file.filename}`;
   const food = new Food({
      name:req.body.name,
      description:req.body.description,
      prive:req.body.price,
      category:req.body.category,
      image:image_filename
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
     fs.unlink(`uploads/${food.image}`,()=>{})

     await Food.findByIdAndDelete(req.body.id);
     res.json({ success: true, message:"food remove" });
   } catch (error) {
      console.log(error);
     res.json({ success: false, message: "error" });
   }
 };

