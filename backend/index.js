require("dotenv").config();
const express = require("express");
const app = express();
const connectdb = require("./db/db.js");
const port = 3000;
const { signUp, signIn, logOut } = require("./auth/auth");
const { showBalance } = require("./functionalities/showBalance.js");
const { deposit } = require("./functionalities/deposit.js");
const { withdraw } = require("./functionalities/withdraw.js");
const { verifyToken } = require("./auth/verify.js");
const { addBeneficiaries } = require("./functionalities/addBeneficiary.js");
const { last10 } = require("./functionalities/lastTrans.js");
const { delBene } = require("./functionalities/removeBene.js");
const { changeLimit } = require("./functionalities/changeBeneLimit.js");

app.use(express.json());
const start = async () => {
  try {
    await connectdb(process.env.DB_CONNECT).then(() => {
      console.log("connected to database...");
    });
    app.listen(port, console.log(`server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.get("/", (req, res) => {
  res.send("insite / route");
});

app.post("/register", signUp);
app.post("/login", signIn);
app.post("/logout", verifyToken, logOut);
app.post("/balance", verifyToken, showBalance);
app.post("/deposit", verifyToken, deposit);
app.post("/withdraw", verifyToken, withdraw);
app.post("/addbene", verifyToken, addBeneficiaries);
app.post("/last", verifyToken, last10);
app.post("/removebene", verifyToken, delBene);
app.post("/changelim", verifyToken, changeLimit);
start();
