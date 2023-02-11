const inquirer = require("inquirer");
const axios = require("axios");
const addBene = async (userid, token) => {
  inquirer
    .prompt([
      {
        type: "password",
        name: "profilePass",
        message: "enter profile pass to withdraw amount",
      },
      {
        type: "input",
        name: "beneficiaryUserid",
        message: "enter userid of beneficiary",
      },
      {
        type: "number",
        name: "Limit",
        message: "enter Limit of beneficary",
      },
    ])
    .then((result) => {
      axios({
        method: "post",
        url: "http://localhost:3000/addbene",
        headers: {
          "auth-token": token,
        },
        data: {
          userid: userid,
          profilePass: result.profilePass,
          Limit: result.Limit,
          beneficiaryUserid: result.beneficiaryUserid,
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
module.exports = addBene;
