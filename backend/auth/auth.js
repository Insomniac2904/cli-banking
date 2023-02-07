const jwt = require("jsonwebtoken");
const tempUser = require("../model/tempUser");
const bcrypt = require("bcrypt");

const dohash = (text) => {
  return bcrypt.hash(text, 10).then((hash) => {
    // console.log(hash);
    return hash;
  });
};

const signUp = async (req, res) => {
  const tempuser = await tempUser.findOne({ userid: req.body.userid });
  if (tempuser) {
    res.send("User already exists, please Sign in");
  } else {
    const user = new tempUser({
      userid: req.body.userid,
      password: req.body.password,
      profilePass: req.body.profilePass,
      name: req.body.name,
      balance: 0,
    });

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
  //signIn
  // console.log(req.body);
  const tempuser = await tempUser.findOne({ userid: req.body.userid });
  if (!tempuser) {
    return res.send("User does not exists, please Sign Up");
  } else {
    const validPass = await bcrypt.compare(
      req.body.password,
      tempuser.password
    );
    if (!validPass) return res.status(500).send("password incorrect");
    else {
      const token = jwt.sign(
        { userid: tempuser.userid },
        process.env.SECRET_KEY
      );

      //! save token in environemnt variable
      process.env["TOKEN"] = token;
      //   console.log(process.env.TOKEN);

      res.header("auth-token", token).send(token);
    }
  }
};

const logOut = (req, res) => {
  delete process.env["TOKEN"];
  // console.log(process.env.TOKEN);
  res.send("success fully logged out");
};

module.exports = { signUp, signIn, logOut };
