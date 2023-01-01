import inquirer from "inquirer";
import { signIn } from "../api/user";
import { isEmail, isPassword } from "../utils/validation";

export const logIn = async () => {
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
    console.log("not a valid email, please try again!");
    process.exit(1);
  }

  if (!isPassword(password)) {
    console.log("not a valid password, please try strong password again!");
    process.exit(1);
  }
  const res = await signIn({ email, password });
  if (res.error || res.errors) {
    console.error(res);
    process.exit(1);
  }
  console.log("🎉 successfully logged in");
  return res.token;
};
