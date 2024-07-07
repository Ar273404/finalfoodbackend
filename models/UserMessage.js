import mongoose from "mongoose";

// Define the schema for user contact messages
const userContactMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const UserContactMessage = mongoose.model(
  "UserContactMessage",
  userContactMessageSchema
);

export default UserContactMessage;
