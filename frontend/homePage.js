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
    if (answer.homeOptions === "LOGIN") {
      login();
    } else {
      register();
    }
  });
