const bcrypt = require("bcrypt");
const { updateOne } = require("../model/tempUser");
const tempUser = require("../model/tempUser");

const updateDetails = async (req, res) => {
  const tempuser = await tempUser.findOne({ userid: req.body.userid });
  if (!tempuser) {
    res.status(404).send("user not found");
  }
  await bcrypt
    .compare(req.body.profilePass, currentUser.profilePass)
    .then((result) => {
      if (!result) res.status(500).send("incorrect profile password");
      else {
        const updateDetails = {
          email: req.body.newemail,
          phone: req.body.newphone,
          city: req.body.newcity,
        };
        if (updateDetails.email !== null) {
          updateOne(
            { userid: tempuser.userid },
            { email: updateDetails.email }
          );
        }
        if (updateDetails.city !== null) {
          updateOne({ userid: tempuser.userid }, { email: updateDetails.city });
        }
        if (updateDetails.phone !== null) {
          updateOne(
            { userid: tempuser.userid },
            { email: updateDetails.phone }
          );
        }
        res
          .status(200)
          .send(
            "details updated successfully\n" +
              tempuser.name +
              "\n" +
              tempuser.email +
              "\n" +
              tempuser.city
          );
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { updateDetails };
