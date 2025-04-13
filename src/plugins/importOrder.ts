import type { PluginConfig } from "@ianvs/prettier-plugin-sort-imports";

import packageManifest from "#package.json" with { type: "json" };

export type ImportOrderConfig = PluginConfig;

export type ImportOrderConfigOpts = {
  importPrivateScopes: Array<string>;
};

export function getImportOrderConfig(
  opts: ImportOrderConfigOpts,
): ImportOrderConfig {
  const privateScopeOrder = opts.importPrivateScopes.map(
    (scope) => `^@${scope}(/.*)`,
  );
  return {
    importOrder: [
      "",
      "<TYPES>^(node:)",
      "",
      "<TYPES>",
      "",
      ...privateScopeOrder.map((order) => `<TYPES>${order}`),
      "",
      "<TYPES>^[#]",
      "",
      "<TYPES>^[/]",
      "<TYPES>^[.]",
      "",
      "<BUILTIN_MODULES>",
      "",
      "<THIRD_PARTY_MODULES>",
      "",
      ...privateScopeOrder,
      "",
      "^[#]",
      "",
      "^[/]",
      "^[.]",
    ],
    importOrderTypeScriptVersion:
      packageManifest.devDependencies.typescript.replace("^", ""),
    importOrderCaseSensitive: false,
  };
}
