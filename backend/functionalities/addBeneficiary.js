// beneficiaries will have userid and limit
//check for users profilepass and its existence and the  append to transaction arrray
const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");
const addBeneficiaries = async (req, res) => {
  const currentUser = await tempUser.findOne({ userid: req.body.userid });
  const BeneUser = await tempUser.findOne({
    userid: req.body.beneficiaryUserid,
  });
  if (!currentUser) return res.send("User not found enter proper userid");
  if (!BeneUser) return res.send("Beneficiary not found enter proper userid");
  if (BeneUser.userid == currentUser.userid)
    return res.send("Cannot add yourself to beneficiaries");
  // console.log(currentUser);
  // console.log(BeneUser);
  else {
    bcrypt
      .compare(req.body.profilePass, currentUser.profilePass)
      .then((result) => {
        // console.log(result);
        if (!result) res.send("Incorrect profile password");
        else {
          const bene = {
            beneUserid: req.body.beneficiaryUserid,
            limit: req.body.Limit,
          };
          let found = 0;
          currentUser.beneficiaries.forEach((element) => {
            if (element.beneUserid == bene.beneUserid) {
              found = 1;
              return;
            }
          });
          if (found == 0) {
            tempUser
              .updateOne(
                { userid: currentUser.userid },
                { $push: { beneficiaries: bene } }
              )
              .then(() => {
                return res.send("Beneficiary added successfully");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            return res.send("User already present in beneficiary list");
          }
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).send(error);
      });
  }
};

module.exports = { addBeneficiaries };
