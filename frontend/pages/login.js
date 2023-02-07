const axios = require("axios");
const inquirer = require("inquirer");
const fetch = require("node-fetch");
// globalThis.fetch = fetch;
const login = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "userid",
        message: "enter userid for login: ",
      },
      {
        type: "input",
        name: "password",
        message: "enter password for login: ",
      },
    ])
    .then((ans) => {
      console.log(ans);
      fetch(`${process.env.API_URL}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userid: ans.userid,
          password: ans.password,
        }),
      })
        //   axios({
        //     method: "post",
        //     url: `${process.env.API_URL}/login`,
        //     data: {
        //       userid: ans.userid,
        //       password: ans.password,
        //     },
        //   })
        .then((Response) => {
          console.log(Response.response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = login;
