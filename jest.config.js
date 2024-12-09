module.exports = {
    projects: [
      {
        displayName: "client",
        testEnvironment: "jsdom", // jsdom for client-side tests
        testMatch: ["<rootDir>/tests/client/**/*.test.js"],
        setupFiles: ["<rootDir>/jest.setup.js"], // Reference the setup file
      },
      {
        displayName: "server",
        testEnvironment: "node", // node for server-side tests
        testMatch: ["<rootDir>/tests/server/**/*.test.js"],
      },
    ],
  };