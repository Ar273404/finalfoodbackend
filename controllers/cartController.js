import Cart from "../models/addtocartModel.js";

// Add a product to the cart or increment its quantity
export const incrementCartItem = async (req, res) => {
     console.log("hello world");
 try {

    res.status(200).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Decrement quantity of a product in the cart
export const decrementCartItem = async (req, res) => {

};


