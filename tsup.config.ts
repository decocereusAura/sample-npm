import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: true,
  splitting: true,
  sourcemap: true,
  external: ["react", "react-dom", "next"],
  noExternal: [
    "@dynamic-labs/sdk-react-core",
    "@dynamic-labs/wagmi-connector",
    "@dynamic-labs/ethereum",
    "viem",
    "wagmi",
    "@tanstack/react-query",
  ],
  treeshake: true,
  esbuildOptions(options) {
    options.define = {
      ...options.define,
      "process.env.NODE_ENV": '"production"',
    };
  },
});
