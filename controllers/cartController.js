import Cart from "../models/addtocartModel.js";

// Add a product to the cart or increment its quantity
export const incrementCartItem = async (req, res) => {
     console.log("hello world");
 try {
//    
//     const { productId } = req.params; // Read productId from route parameters
//     const userId = req.user;

//     let cartItem = await Cart.findOne({ user: userId, product: productId });

//     if (cartItem) {
//       // Increment quantity if item already exists
//       cartItem.quantity += 1;
//     } else {
//       // Create new cart item if it doesn't exist
//       cartItem = new Cart({
//         user: userId,
//         product: productId,
//         quantity: 1,
//       });
//     }

//     await cartItem.save();
//  
    res.status(200).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Decrement quantity of a product in the cart
export const decrementCartItem = async (req, res) => {
//   try {
//     const { productId } = req.params; // Read productId from route parameters
//     const userId = req.user;

//     const cartItem = await Cart.findOne({
//       user: userId,
//       product: productId,
//     });

//     if (!cartItem) {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }

//     if (cartItem.quantity > 1) {
//       cartItem.quantity -= 1;
//       await cartItem.save();
//     } else {
//       await cartItem.remove();
//     }

//     res.status(200).json({ message: "Product quantity updated", cartItem });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating cart", error });
//   }
};


