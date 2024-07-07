import User from "../models/UserAuthModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import Cart from '../models/addtocartModel.js'

const SECRET_KEY = process.env.SECRET_KEY || "Hello";

function generateToken(userId) {
  const payload = { userId };
  return jwt.sign(payload, SECRET_KEY);
}

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "😒 Please enter a valid email" });
    }

    // Validate password strength
    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "😌 Please enter a strong password" });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hash,
      phone,
    });

    // Save the user to the database
    const user = await newUser.save();
    const token = generateToken(user._id);

    // Respond with success message and token
    res
      .status(201)
      .json({
        success: true,
        token,
        message: "User registered successfully",
      });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    console.log(token);
   const cartCount = await Cart.countDocuments({ userId: user._id });
    res.status(200).json({ message: "Login successful", token,cartCount});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user; // Assuming req.user contains the authenticated user's information
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createUserProfile = async (req, res) => {
  try {
    const userId = req.user; // Assuming req.user contains the authenticated user's ID
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true, upsert: true } // Options: new returns updated document, upsert creates new if not found
    ).select("-password"); // Exclude password

    res
      .status(201)
      .json({ message: "Profile Update Successful", updatedProfile });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
