const inquirer = require("inquirer");
const axios = require("axios");
const deposit = async (userid, token) => {
  inquirer
    .prompt([
      {
        type: "password",
        name: "profilePass",
        message: "enter profile pass ",
      },
      {
        type: "number",
        name: "amount",
        message: "enter amount to be deposited",
      },
    ])
    .then((result) => {
      axios({
        method: "post",
        url: "http://localhost:3000/deposit",
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
module.exports = deposit;
