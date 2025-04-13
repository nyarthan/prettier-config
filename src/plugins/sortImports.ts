import type { PluginConfig } from "@ianvs/prettier-plugin-sort-imports";
import packageManifest from "#package.json" with { type: "json" };

export type ImportOrderConfig = PluginConfig;

export const importOrderConfig: ImportOrderConfig = {
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^(?!.*[.]css$)[./$].*$",
    "",
    ".css$",
  ],
  importOrderTypeScriptVersion:
    packageManifest.devDependencies.typescript.replace("^", ""),
  importOrderCaseSensitive: false,
};
