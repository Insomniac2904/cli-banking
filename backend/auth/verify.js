const jwt = require("jsonwebtoken");
const tempUser = require("../model/tempUser");

exports.verifyToken = async (req, res, next) => {
  const token = process.env.TOKEN;
  // console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    const tempuser = tempUser.findOne({ userid: decoded.userid });
    // console.log(tempuser);
    if (!tempuser) {
      return res.send("invalid token");
    } else {
      next();
    }
  });
};
