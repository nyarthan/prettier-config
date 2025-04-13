import type { PluginOptions } from "prettier-plugin-tailwindcss";

export type TailwindcssConfig = PluginOptions;

export const tailwindcssConfig: TailwindcssConfig = {
  tailwindFunctions: ["cva"],
  tailwindPreserveWhitespace: false,
  tailwindPreserveDuplicates: false,
};
