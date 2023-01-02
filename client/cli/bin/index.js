#!/usr/bin/env node
import * as dotenv from "dotenv";
import inquirer from "inquirer";
import { all as allCmd } from "./commands/all.js";
import { create } from "./commands/create.js";
import { help } from "./commands/help.js";
import { logIn } from "./commands/login.js";
import { signup } from "./commands/signup.js";
dotenv.config();
let userToken = process.env.USER_TOKEN || "";
if (process.argv.length < 3) {
    help();
}
const cmd = process.argv[2];
if (!userToken) {
    if (cmd === "login") {
        const token = await logIn(process.argv[3], process.argv[4]);
        process.env.USER_TOKEN = token;
        userToken = token;
    }
    else if (cmd === "help") {
        help();
    }
    else if (cmd === "signup") {
        const token = await signup();
        console.log(token);
        userToken = token;
        process.env.USER_TOKEN = token;
    }
    else {
        process.exit(1);
    }
}
const selectOperations = async () => {
    const { operation } = await inquirer.prompt({
        message: "Select Operation",
        type: "list",
        name: "operation",
        choices: [
            {
                name: "List Passwords",
                value: "list",
            },
            {
                name: "Create New Password Entry",
                value: "create",
            },
            {
                name: "Select Password",
                value: "get",
            },
            {
                name: "Quit",
                value: "quit",
            },
        ],
    });
    if (operation === "quit") {
        process.exit(1);
    }
    else if (operation === "list") {
        const passwords = await allCmd(userToken);
        if (!passwords) {
            console.log("password not found");
            return;
        }
        const { password } = await inquirer.prompt({
            message: "Select Password",
            name: "password",
            type: "list",
            choices: passwords.map((password) => ({
                name: password.name,
                value: password,
            })),
        });
        console.log(`
      name:     ${password.name}
      email:    ${password.email}
      username: ${password.username}
      website:  ${password.website}
      password: ${password.password}
    `);
    }
    else if (operation === "create") {
        await create(userToken);
    }
    else {
        console.log(operation);
    }
};
while (true) {
    await selectOperations();
}
