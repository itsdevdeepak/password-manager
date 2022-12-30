import * as dotenv from "dotenv";
dotenv.config();

import merge from "lodash.merge";
process.env.NODE_ENV = process.env.NODE_ENV || "development";

export type config = {
  port: number | string;
  stage: string;
  logging: boolean;
  secret: {
    jwt: string;
    dbUrl: string;
  };
};

let envConfig: config;
let stage = process.env.STAGE || "local";

if (!process.env.JWT_SECRET || !process.env.DATABASE_URL) {
  throw new Error("enviroment variables and not defined");
}

const defaultConfig: config = {
  port: 3001,
  stage: "local",
  logging: false,
  secret: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
  },
};

if (stage === "production") {
  envConfig = require("./production");
} else if (stage === "testing") {
  envConfig = require("./testing");
} else {
  envConfig = require("./development");
}

export default merge(defaultConfig, envConfig);
