const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");
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
      const d = new Date();
      const date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
      const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      let object = {
        Tid: uuidv4(),
        Date: date,
        Time: time,
        Amount: amount,
        Type: "Deposit",
      };
      await tempUser
        .updateOne(
          { userid: tempuser.userid },
          {
            $push: { transactions: object },
            $inc: { balance: amount },
          }
        )
        .then(() => {
          res.send("amount added to balance is: " + amount);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(500).send("Sorry Incorrect profile password");
    }
  }
};
module.exports = { deposit };
