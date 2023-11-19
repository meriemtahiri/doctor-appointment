const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,'something', (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Invalid token" });
          }
          req.user = decoded;
          next();
        });
      } else {
        return res.status(401).json({ message: "No token provided" });
      }
}

module.exports = { verifyToken };
