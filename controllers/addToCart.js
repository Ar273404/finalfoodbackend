import Cart from "../models/addtocartModel.js";

const addToCart = async (req, res) => {
  console.log(req.body, "difksdfkshdfhjds");

  const data = {
    userId: req.user, // Assuming req.user is an object with an id property
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image,
    
  };

  try {
    const response = await Cart.create(data);
   
    res.status(201).json({ message: "Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Add to cart failed" });
  }
};
export const getCartItem = async(req,res)=>{
  try {
    const response = await Cart.find({userId:req.user});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " failed to fetch cart Items" });
  }
}

export const handleDelete = async (req, res) => {
  try {
      await Cart.deleteOne({ userId: req.user, _id: req.params.id });
    const UserCartItem = await Cart.find({userId:req.user});

    res.status(200).json({ message: "Item Deleted",UserCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting item", error });
  }
};
export default addToCart;
