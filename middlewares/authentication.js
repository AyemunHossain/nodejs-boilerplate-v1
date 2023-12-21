const jwt= require('jsonwebtoken');

const userAuthenticationCheck = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  if (!decodedToken) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }
  req.user = decodedToken;
  next();

};


module.exports = {
    userAuthenticationCheck
}