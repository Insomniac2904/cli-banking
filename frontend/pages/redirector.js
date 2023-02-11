const inquirer = require("inquirer");
const Balance = require("./showBalance");
const deposit = require("./deposit");
const withdraw = require("./withdraw");
const lastTrans = require("./lastTrans");
const fs = require("fs");
const addBene = require("./addBene");
const removeBene = require("./removeBene");
const transfer = require("./transfer");
const logout = require("./logout");
const redirector = async (userid) => {
  const postLogChoices = [
    "CHECK BALANCE",
    "DEPOSIT MONEY",
    "WITHDRAW MONEY",
    "VIEW LAST 10 TRANSACTIONS",
    "ADD BENEFICIARIES",
    "REMOVE BENEFICIARIES",
    "CHANGE BENFICIARY LIMIT",
    "TRANSFER AMOUNT",
    "UPDATE DETAILS",
    "LOGOUT",
  ];
  inquirer
    .prompt([
      {
        type: "list",
        name: "postLogChoice",
        choices: postLogChoices,
      },
    ])
    .then(async (ans) => {
      // console.log(answer.postLogChoice);

      const token = fs.readFileSync("../frontend/tokenFile.txt", "utf-8");
      const check = ans.postLogChoice;
      // console.log(token);
      if (check === "CHECK BALANCE") await Balance(userid, token);
      if (check === "DEPOSIT MONEY") await deposit(userid, token);
      if (check === "WITHDRAW MONEY") await withdraw(userid, token);
      if (check === "VIEW LAST 10 TRANSACTIONS") await lastTrans(userid, token);
      if (check === "ADD BENEFICIARIES") await addBene(userid, token);
      if (check === "REMOVE BENEFICIARIES") await removeBene(userid, token);
      if (check === "CHANGE BENFICIARY LIMIT") await changeLimit(userid, token);
      if (check === "TRANSFER AMOUNT") await transfer(userid, token);
      if (check === "UPDATE DETAILS") await update(userid, token);
      if (check === "LOGOUT") await logout();
    });
};

module.exports = redirector;
