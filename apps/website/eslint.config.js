import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    files: ["src/components/three/**/*.{ts,tsx}"],
    rules: {
      // react-three-fiber registers three.js elements as intrinsic JSX;
      // their props (args, position, intensity, etc.) are valid but unknown to React's plugin.
      "react/no-unknown-property": "off",
    },
  },
];
