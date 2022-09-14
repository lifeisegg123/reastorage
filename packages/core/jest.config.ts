import { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default config;
