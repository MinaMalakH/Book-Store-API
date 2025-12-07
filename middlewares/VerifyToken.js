const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY || 5000);
      // This object have the decoded id and isAdmin
      req.user = decode;

      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  } else {
    res.status(401).json({ message: "No Token Provided" });
  }
}

// Verify Token & Authorize the user
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "You are Not Allowed" });
    }
  });
}

// Verify Token & Authorize the Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "You are Not Allowed, Only Admin Allowed " });
    }
  });
}
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
