const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const redirector = require("./redirector");
const { exit } = require("process");
const login = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "userid",
        message: "enter userid for login: ",
      },
      {
        type: "password",
        name: "password",
        message: "enter password for login: ",
      },
    ])
    .then((ans) => {
      axios({
        method: "post",
        url: `${process.env.API_URL}/login`,
        data: {
          userid: ans.userid,
          password: ans.password,
        },
      })
        .then(async (response) => {
          if (response.status === 201) {
            await fs.writeFileSync("./tokenFile.txt", response.data);
            await redirector(ans.userid);
          } else {
            console.log(response.data);
            inquirer
              .prompt([
                {
                  type: "list",
                  message: "choose an option ",
                  name: "option",
                  choices: ["REGISTER", "EXIT"],
                },
              ])
              .then(async (answer) => {
                if (answer.option === "REGISTER") {
                  await register();
                } else {
                  console.log("SEE YOU LATER");
                  exit(1);
                }
              });
          }
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
