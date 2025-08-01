import type { Config } from "prettier";

export const config: Config = {
  experimentalTernaries: true,
  experimentalOperatorPosition: "start",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "consistent",
  jsxSingleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  objectWrap: "preserve",
  bracketSameLine: false,
  arrowParens: "always",
  requirePragma: false,
  insertPragma: false,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "strict",
  vueIndentScriptAndStyle: true,
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: true,
};
