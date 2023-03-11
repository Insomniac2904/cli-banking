const inquirer = require("inquirer");
const axios = require("axios");
const transfer = async (userid, token) => {
  console.log(object);
  inquirer
    .prompt([
      {
        type: "password",
        name: "profilePass",
        message: "enter profile pass to transfer amount",
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
        url: `${process.env.API_URL}/transfer`,
        headers: {
          "auth-token": token,
        },
        data: {
          userid: userid,
          profilePass: result.profilePass.trim(),
          amount: result.amount,
          recieverUserid: result.recieverUserid.trim(),
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
