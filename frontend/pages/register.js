const axios = require("axios");
const inquirer = require("inquirer");
const register = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "userid",
        message: "enter userid for login: ",
      },
      {
        type: "password",
        name: "pass",
        message: "enter password for login: ",
      },
      {
        type: "password",
        name: "confPass",
        message: "confirm password for signUp: ",
      },
      {
        type: "password",
        name: "profilePass",
        message: "enter Profile password: ",
      },
      {
        type: "password",
        name: "confProfilePass",
        message: "confirm Profile password: ",
      },
      {
        type: "input",
        name: "name",
        message: "enter your name: ",
      },
    ])
    .then((ans) => {
      if (
        ans.profilePass === ans.confProfilePass &&
        ans.pass === ans.confPass
      ) {
        axios({
          method: "post",
          url: `${process.env.API_URL}/register`,
          data: {
            userid: ans.userid,
            password: ans.password,
            name: ans.name,
            profilePass: ans.profilePass,
          },
        })
          .then((res) => {
            console.log(res.status);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = register;
