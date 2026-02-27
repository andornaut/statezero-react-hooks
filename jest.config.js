module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/test/test_*.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!(statezero|lodash-es|simple-deep-freeze|deep-diff)/)",
  ],
  moduleNameMapper: {
    "^statezero$": "<rootDir>/node_modules/statezero/src/index.js",
  },
};
