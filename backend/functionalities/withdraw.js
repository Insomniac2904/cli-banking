const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");

const withdraw = async (req, res) => {
  const tempuser = await tempUser.findOne({ userid: req.body.userid });
  let amount = req.body.amount * -1;
  // console.log(Math.abs(amount));
  if (Math.abs(amount) > tempuser.balance) {
    return res.send("insufficient balance!");
  } else {
    if (!tempuser) {
      return res.send("User does not exists, please Sign Up");
    } else {
      bcrypt
        .compare(req.body.profilePass, tempuser.profilePass)
        .then((result) => {
          // console.log(result);
          if (result) {
            tempUser
              .updateOne({ _id: tempuser._id }, { $inc: { balance: amount } })
              .then(() => {
                res.send("amount withdrawn is: " + Math.abs(amount));
              });
          } else {
            res.status(500).send("incorrect profile password");
          }
        });
    }
  }
};
module.exports = { withdraw };
