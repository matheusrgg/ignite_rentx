import { pathsToModuleNameMapper } from "ts-jest/utils";
import { compilerOptions } from "./tsconfig.json"

export default {


  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),

  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],

};
