const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");
const showBalance = async (req, res) => {
  const tempuser = await tempUser.findOne({ userid: req.body.userid });
  if (!tempuser) {
    return res.send("User does not exists, please Sign Up");
  } else {
    bcrypt
      .compare(req.body.profilePass, tempuser.profilePass)
      .then((result) => {
        console.log(result);
        if (result) {
          res.send("your balance is: " + tempuser.balance);
        } else {
          res.status(500).send("incorrect profile password");
        }
      });
  }
};
module.exports = { showBalance };
