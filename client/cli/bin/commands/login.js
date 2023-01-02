import inquirer from "inquirer";
import ora from "ora";
import { signIn } from "../api/user.js";
import { isEmail } from "../utils/validation.js";
export const logIn = async (arg1, arg2) => {
    const spinner = ora();
    const { email, password } = await inquirer.prompt([
        {
            message: "Your Email",
            type: "input",
            name: "email",
        },
        {
            message: "Your master password",
            type: "password",
            name: "password",
        },
    ]);
    if (!isEmail(email)) {
        spinner.fail("validation failed");
        console.log("not a valid email, please try again!");
        process.exit(1);
    }
    spinner.start("Loggin in...");
    const res = await signIn({ email, password });
    if (res.error || res.errors) {
        spinner.fail("error occure");
        console.error(res);
        process.exit(1);
    }
    spinner.succeed("🎉 successfully logged in");
    return res.token;
};
