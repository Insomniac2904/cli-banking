// beneficiaries will have userid and limit
//check for users profilepass and its existence and the  append to transaction arrray
const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");
const delBene = async (req, res) => {
  const currentUser = await tempUser.findOne({ userid: req.body.userid });
  if (!currentUser) return res.send("user not found enter proper userid");
  else {
    const beneficiaryUserid = req.body.beneficiaryUserid;
    let flag = 0;
    currentUser.beneficiaries.forEach((element) => {
      if (element.beneUserid === beneficiaryUserid) {
        flag = 1;
        return;
      }
    });
    if (flag == 0) {
      return res.send("no such user present in beneficiaty list");
    } else {
      bcrypt
        .compare(req.body.profilePass, currentUser.profilePass)
        .then((result) => {
          if (!result) return res.send("incorrect profile pass");
          else {
            tempUser
              .updateOne(
                { userid: currentUser.userid },
                {
                  $pull: { beneficiaries: { beneUserid: beneficiaryUserid } },
                }
              )
              .then(() => {
                return res.send("beneficiary removed successfully");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          return res.status(400).send(error.message);
        });
    }
  }
};

module.exports = { delBene };
