import inquirer from "inquirer";
import ora from "ora";
import { createPassword, Password } from "../api/password.js";
import { isEmail, isWebUrl } from "../utils/validation.js";

export const create = async (token: string) => {
  const spinner = ora();
  const { name, username, email, website, password } = await inquirer.prompt([
    {
      message: "Name",
      type: "input",
      name: "name",
    },
    {
      message: "Website",
      type: "input",
      name: "website",
    },
    {
      message: "Email",
      type: "input",
      name: "email",
    },
    {
      message: "Username <optional>",
      type: "input",
      name: "username",
    },
    {
      message: "Password",
      type: "input",
      name: "password",
    },
  ]);

  if (name.length <= 1) {
    spinner.fail("please valid provide name");
  }

  if (password.length <= 1) {
    spinner.fail("please provide valid password");
  }

  if (!isEmail(email)) {
    spinner.fail("please provide valid email id");
  }

  if (!isWebUrl(website)) {
    spinner.fail("please provide valid web url");
  }

  const data: Password = {
    name,
    website,
    password,
    email,
  };
  if (username) {
    data.username = username;
  }

  try {
    spinner.start("Creating Password...");
    const res = await createPassword(token, data);
    if (res.error || res.errors) {
      spinner.fail("Error occure");
      console.error(res);
      return;
    }
    spinner.succeed("Password created!!");
  } catch (err) {
    spinner.fail("Error occure");
    console.log(err);
    return;
  }
};
