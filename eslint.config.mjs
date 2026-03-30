import nextConfig from "eslint-config-next";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = (Array.isArray(nextConfig) ? nextConfig : [nextConfig]).map(
  (config, i) => {
    // Add custom rules to the TypeScript config (index 1 has @typescript-eslint plugin)
    if (config.plugins && "@typescript-eslint" in config.plugins) {
      return {
        ...config,
        rules: {
          ...config.rules,
          "@typescript-eslint/no-unused-vars": "warn",
          "@typescript-eslint/no-explicit-any": "warn",
        },
      };
    }
    return config;
  }
);

export default eslintConfig;
