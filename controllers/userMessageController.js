import UserContactMessage from "../models/UserMessage.js";
export const userContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const contactMessage = await UserContactMessage.findOneAndUpdate(
      { userId: req.user },
      { $set: { name, email, subject, message } },
      { new: true, upsert: true }
    );
    console.log(contactMessage);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
