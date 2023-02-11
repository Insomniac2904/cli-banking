const inquirer = require("inquirer");
const axios = require("axios");
const redirector = require("./redirector.js");
const Balance = async (userid, token) => {
  // console.log(token);
  inquirer
    .prompt({
      type: "input",
      name: "profilePass",
      message: "enter profile pass to view balance",
    })
    .then((result) => {
      axios({
        method: "post",
        url: "http://localhost:3000/balance",
        headers: {
          "auth-token": token,
        },
        data: {
          userid: userid,
          profilePass: result.profilePass,
        },
      })
        .then(async (response) => {
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
module.exports = Balance;
