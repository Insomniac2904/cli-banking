const axios = require("axios");
const inquirer = require("inquirer");
const register = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "userid",
        message: "enter userid : ",
      },
      {
        type: "password",
        name: "password",
        message: "enter password : ",
      },
      {
        type: "password",
        name: "profilePass",
        message: "enter Profile password: ",
      },
      {
        type: "input",
        name: "name",
        message: "enter your name: ",
      },
    ])
    .then((ans) => {
      axios({
        method: "post",
        url: `${process.env.API_URL}/register`,
        data: {
          userid: ans.userid.trim(),
          password: ans.password.trim(),
          name: ans.name.trim(),
          profilePass: ans.profilePass.trim(),
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = register;
