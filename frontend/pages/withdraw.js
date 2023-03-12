const inquirer = require("inquirer");
const axios = require("axios");
const withdraw = async (userid, token) => {
  inquirer
    .prompt([
      {
        type: "password",
        name: "profilePass",
        message: "Enter profile password",
      },
      {
        type: "number",
        name: "amount",
        message: "Enter amount to be withdraw",
      },
    ])
    .then((result) => {
      axios({
        method: "post",
        url: "https://cli-banking.vercel.app/withdraw",
        headers: {
          "auth-token": token,
        },
        data: {
          userid: userid,
          profilePass: result.profilePass.trim(),
          amount: result.amount,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = withdraw;
