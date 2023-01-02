import chalk from "chalk";

const commands = [
  {
    name: "login: ",
    description: "Login",
  },
  {
    name: "signup:",
    description: "Creates a new user",
  },
  {
    name: "help:  ",
    description: "Show this message",
  },
];

export const help = () => {
  // App desc
  console.log("Access all your password from command line.");
  console.log();

  // Usages
  console.log(chalk.bgGreenBright.white.bold(" USAGE "));
  console.log();
  console.log(`  ${chalk.gray("$")} pm <command> [args]`);
  console.log();

  // Commands
  console.log(chalk.bgBlueBright.white.bold(" COMMANDS "));
  console.log();
  commands.forEach((command) => {
    console.log(` ${command.name}    ${command.description}`);
  });
  console.log();

  // Examples
  console.log(chalk.bgMagentaBright.white.bold(" EXAMPLES "));
  console.log();
  console.log(` ${chalk.gray("$")} pm login`);
  console.log(` ${chalk.gray("$")} pm signup`);
  console.log(` ${chalk.gray("$")} pm login username password`);
};
