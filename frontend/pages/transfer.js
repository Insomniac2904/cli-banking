const inquirer = require("inquirer");
const axios = require("axios");
const transfer = async (userid, token) => {
  inquirer
    .prompt([
      {
        type: "password",
        name: "profilePass",
        message: "enter profile pass to withdraw amount",
      },
      {
        type: "input",
        name: "recieverUserid",
        message: "enter user id of reciever",
      },
      {
        type: "number",
        name: "amount",
        message: "enter amount to be transferred",
      },
    ])
    .then((result) => {
      axios({
        method: "post",
        url: "http://localhost:3000/transfer",
        headers: {
          "auth-token": token,
        },
        data: {
          userid: userid,
          profilePass: result.profilePass,
          amount: result.Limit,
          recieverUserid: result.recieverUserid,
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
module.exports = transfer;
