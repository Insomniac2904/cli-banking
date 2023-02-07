const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");
const last10 = async (req, res) => {
  const currentUser = await tempUser.findOne({ userid: req.body.userid });
  if (!currentUser) {
    return res.send("user not found");
  } else {
    bcrypt
      .compare(req.body.profilePass, currentUser.profilePass)
      .then((result) => {
        if (!result) return res.send("incorrect profile pass");
        else {
          let finalArr = [];
          for (let i = 0; i < 10; i++) {
            if (currentUser.transactions[i] == null) continue;
            finalArr.push(currentUser.transactions[i]);
          }
          if (finalArr.length == 0)
            res.send("you haven't done any transaction");
          res.send(finalArr);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

module.exports = { last10 };
