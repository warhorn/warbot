module.exports = {
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfigFile: "tsconfig.json",
      },
    ],
  },
  testMatch: ["**/src/**/*.test.(ts|js)"],
  testEnvironment: "node",
};
