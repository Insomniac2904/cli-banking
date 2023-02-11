#!/usr/bin/env node
require("dotenv").config();
const inquirer = require("inquirer");
const login = require("./pages/login");
const register = require("./pages/register");

inquirer
  .prompt([
    {
      type: "list",
      message: "choose an option ",
      name: "homeOptions",
      choices: ["LOGIN", "REGISTER", "EXIT"],
    },
  ])
  .then((answer) => {
    console.log(answer);
    if (answer.homeOptions == "LOGIN") {
      login();
    }
    if (answer.homeOptions == "REGISTER") {
      register();
    }
    if (answer.homeOptions == "EXIT") {
      console.log("SEE YOU LATER");
      exit(1);
    }
  });
