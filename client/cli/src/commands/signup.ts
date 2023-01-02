import inquirer from "inquirer";
import ora from "ora";
import { createUser } from "../api/user.js";
import { isEmail, isPassword } from "../utils/validation.js";

export const signup = async () => {
  const spinner = ora("Creating User");
  try {
    const { name, email, password } = await inquirer.prompt([
      {
        message: "User name",
        type: "input",
        name: "name",
      },
      {
        message: "User email",
        type: "input",
        name: "email",
      },
      {
        message: "User password",
        type: "password",
        name: "password",
      },
    ]);
    spinner.start();

    if (!isEmail(email)) {
      spinner.fail("validation failed!");
      console.log("not a valid email, please provide valid email!");
      process.exit(1);
    }

    if (!isPassword(password)) {
      spinner.fail("validation failed!");
      console.log("not a valid password, please try strong password again!");
      process.exit(1);
    }

    const res = await createUser({ name, email, password });

    if (res.error || res.error) {
      spinner.fail("error!!");
      console.error(res);
      process.exit(1);
    }
    spinner.succeed("User Created");
    return res.token;
  } catch (err) {
    spinner.fail("error occure");
    console.log("oops someting went wrong, please try again!");
    process.exit(1);
  }
};
