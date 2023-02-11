const inquirer = require("inquirer");
const axios = require("axios");
const removeBene = async (userid, token) => {
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
        message: "enter the user id to be removed",
      },
    ])
    .then((result) => {
      axios({
        method: "post",
        url: "http://localhost:3000/removebene",
        headers: {
          "auth-token": token,
        },
        data: {
          userid: userid,
          profilePass: result.profilePass,
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
module.exports = removeBene;
