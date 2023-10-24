const config = {
    globalSetup: "./src/test-utils/setupTests.js",
    globalTeardown: "./src/test-utils/teardownTests.js",
    clearMocks: true,
    testTimeout: 3500,
    testEnvironment: "node",
    preset: "ts-jest",
  };
  
  export default config;