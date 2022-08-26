require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findByIdUserService } = require("../service/users.service");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Token needs to be informed!" });
  }

  const parts = authHeader.split(" ");

  if(parts.length !== 2) {
    return res.status(401).send({ message: "Invalid token." });
  }

  const [scheme, token] = parts;

  if(!/^Bearer^/i.test(scheme)) {
    return res.status(401).send({ message: "Poorly formatted token!" });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    const user = await findByIdUserService(decoded.id);

    if(err || !user || !user.id) {
      return res.status(401).send({ message: "Invalid token!" });
    }

    req.userId = user.id;

    return next();
  });
};