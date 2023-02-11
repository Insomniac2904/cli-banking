const jwt = require("jsonwebtoken");
const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");
const fs = require("fs");
const dohash = (text) => {
  return bcrypt.hash(text, 10).then((hash) => {
    // console.log(hash);
    return hash;
  });
};

const signUp = async (req, res) => {
  console.log("inside register\n" + req.body);
  const tempuser = await tempUser.findOne({ userid: req.body.userid });
  if (tempuser) {
    res.send(
      "User already exists, please Sign in Or choose try again with another Userid"
    );
  } else {
    const user = new tempUser({
      userid: req.body.userid,
      password: req.body.password,
      profilePass: req.body.profilePass,
      name: req.body.name,
      balance: 0,
    });
    // console.log(user);
    user.password = await dohash(user.password);
    user.profilePass = await dohash(user.profilePass);
    // console.log((user.profilePass, user.password));
    try {
      user.save().then((data, err) => {
        if (err) console.log(err);
        else res.send(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const signIn = async (req, res) => {
  // console.log(req);
  const tempuser = await tempUser.findOne({ userid: req.body.userid });
  // console.log(tempuser);
  if (!tempuser) {
    return res.status(201).send("User does not exists, please Sign Up");
  } else {
    const validPass = await bcrypt.compare(
      req.body.password,
      tempuser.password
    );
    if (!validPass) return res.status(202).send("password incorrect");
    else {
      const token = jwt.sign(
        { userid: tempuser.userid },
        process.env.SECRET_KEY
      );

      //! save token in environemnt variable
      // process.env["TOKEN"] = token;
      //   console.log(process.env.TOKEN);
      res.status(201).send(token);
    }
  }
};

const logOut = (req, res) => {
  delete process.env["TOKEN"];
  // console.log(process.env.TOKEN);
  res.send("success fully logged out");
};

module.exports = { signUp, signIn, logOut };
