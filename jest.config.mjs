// jest.config.mjs
export default {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
            dynamicImport: true,
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: "automatic",
            },
            hidden: {
              jest: true,
            },
          },
          target: "es2022",
        },
        sourceMaps: "inline",
        module: {
          type: "commonjs",
        },
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
