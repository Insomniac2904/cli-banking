const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");
const deposit = async (req, res) => {
  const tempuser = await tempUser.findOne({ userid: req.body.userid });
  const amount = req.body.amount;
  if (!tempuser) {
    return res.send("User does not exists, please Sign Up");
  } else {
    const isCorrect = await bcrypt.compare(
      req.body.profilePass,
      tempuser.profilePass
    );
    if (isCorrect) {
      //   const newBalance = tempUser.balance + amount;
      //   console.log(typeof newBalance, tempuser._id);

      await tempUser
        .updateOne({ _id: tempuser._id }, { $inc: { balance: amount } })
        .then(() => {
          res.send("amount added to balance is: " + amount);
        })
        .catch((err) => {
          console.log(err);
        });
      // ! add deposit to transaction history without encrypter id
    } else {
      res.status(500).send("Sorry Incorrect profile password");
    }
  }
};
module.exports = { deposit };
