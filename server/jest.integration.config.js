const config = {
    globalSetup: "./src/test-utils/setupTests.js",
    globalTeardown: "./src/test-utils/teardownTests.js",
    clearMocks: true,
    testTimeout: 1500,
    testEnvironment: "node",
    preset: "ts-jest",
  };
  
  export default config;