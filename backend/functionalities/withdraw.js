const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");
const withdraw = async (req, res) => {
  const tempuser = await tempUser.findOne({ userid: req.body.userid });
  let amount = req.body.amount;
  if (Math.abs(amount) > tempuser.balance) {
    return res.send("insufficient balance!");
  } else {
    if (!tempuser) {
      return res.send("User does not exists, please Sign Up");
    } else {
      bcrypt
        .compare(req.body.profilePass, tempuser.profilePass)
        .then((result) => {
          if (result) {
            const d = new Date();
            const date = `${d.getDate()}-${
              d.getMonth() + 1
            }-${d.getFullYear()}`;
            const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
            let object = {
              Tid: uuidv4(),
              Date: date,
              Time: time,
              Type: "Withdrawl",
              Amount: amount,
            };
            tempUser
              .updateOne(
                { userid: tempuser.userid },
                {
                  $push: { transactions: object },
                  $inc: { balance: amount * -1 },
                }
              )
              .then(() => {
                res.send("Amount withdrawn is: " + amount);
              });
          } else {
            res.status(500).send("incorrect profile password");
          }
        });
    }
  }
};
module.exports = { withdraw };
