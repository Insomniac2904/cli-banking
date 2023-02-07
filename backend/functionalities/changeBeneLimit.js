const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");
const changeLimit = async (req, res) => {
  const currentUser = await tempUser.findOne({ userid: req.body.userid });

  if (!currentUser) return res.send("user not found enter proper userid");
  else {
    bcrypt
      .compare(req.body.profilePass, currentUser.profilePass)
      .then((result) => {
        if (!result) res.send("incorrect profile pass");
        else {
          let found = 0;
          currentUser.beneficiaries.forEach((element) => {
            if (element.beneUserid == req.body.changeLim.userid) {
              found = 1;
            }
          });
          if (found == 0) {
            res.send("user not in beneficiary list");
          } else {
            tempUser
              .updateOne(
                { userid: currentUser.userid },
                {
                  $set: {
                    beneficiaries: {
                      beneUserid: { limit: req.body.changeLim.limit },
                    },
                  },
                }
              )
              .then(() => {
                return res.send("limit changed successfully");
              })
              .catch((err) => {
                return res.send(err.message);
              });
          }
        }
      });
  }
};
module.exports = { changeLimit };
