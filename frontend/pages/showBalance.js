const inquirer = require("inquirer");
const axios = require("axios");
const Balance = async (userid, token) => {
  // console.log(token);
  inquirer
    .prompt({
      type: "password",
      name: "profilePass",
      message: "Enter profile password ",
    })
    .then((result) => {
      axios({
        method: "post",
        url: "https://cli-banking.vercel.app/balance",
        headers: {
          "auth-token": token,
        },
        data: {
          userid: userid,
          profilePass: result.profilePass.trim(),
        },
      })
        .then(async (response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = Balance;
