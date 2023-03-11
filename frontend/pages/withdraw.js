const inquirer = require("inquirer");
const axios = require("axios");
const withdraw = async (userid, token) => {
  inquirer
    .prompt([
      {
        type: "password",
        name: "profilePass",
        message: "enter profile pass to withdraw amount",
      },
      {
        type: "number",
        name: "amount",
        message: "enter amount to be withdraw",
      },
    ])
    .then((result) => {
      axios({
        method: "post",
        url: `${process.env.API_URL}/withdraw`,
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
