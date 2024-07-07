import jwt from "jsonwebtoken";
const SECRATE_KEY = process.env.SECRATE_KEY||"Hello";
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token", token);

  if (!token)
    return res.status(401).json({ error: "Unauthorized:Token not provided" });
  jwt.verify(token, SECRATE_KEY, (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "Unathorized : Invalid token" });
    }
    console.log();
    req.user = { userId: decode.userId }.userId;
    next();
  });
}

export default verifyToken;
