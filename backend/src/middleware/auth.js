import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log("Token verification error: ", err);
        return res.sendStatus(403); 
      }

      req.user = user;
      next();
    });
  } else {
    console.log("No auth header");
    res.sendStatus(401); 
  }
};

export default authenticateJWT;
