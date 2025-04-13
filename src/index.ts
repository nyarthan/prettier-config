import type { Config as PrettierConfig } from "prettier";

import type { AstroConfig } from "./plugins/astro.ts";
import type {
  ImportOrderConfig,
  ImportOrderConfigOpts,
} from "./plugins/importOrder.ts";
import type { TailwindcssConfig } from "./plugins/tailwindcss.ts";

import { config as defaultConfig } from "./config.ts";
import { astroConfig } from "./plugins/astro.ts";
import { getImportOrderConfig } from "./plugins/importOrder.ts";
import { tailwindcssConfig } from "./plugins/tailwindcss.ts";

type _PrettierConfig = Pick<PrettierConfig, keyof typeof defaultConfig> & {
  plugins?: Array<string>;
};

type PluginConfig<TOverrides> = {
  enabled: boolean;
  overrides?: Partial<TOverrides>;
};

type ConfigOptions = {
  overrides: Partial<_PrettierConfig>;
  plugins: Partial<{
    astro: PluginConfig<AstroConfig>;
    importOrder: PluginConfig<ImportOrderConfig & ImportOrderConfigOpts>;
    tailwindcss: PluginConfig<TailwindcssConfig>;
  }>;
};

type Config = PrettierConfig;

export function defineConfig(options: Partial<ConfigOptions> = {}): Config {
  if (!options) return defaultConfig;

  const _config = Object.assign({ ...defaultConfig }, options.overrides ?? {});
  _config.plugins ??= [];

  if (options.plugins?.astro?.enabled) {
    Object.assign(
      _config,
      Object.assign({ ...astroConfig }, options.plugins.astro.overrides ?? {}),
    );
  }

  if (options.plugins?.importOrder?.enabled) {
    _config.plugins.push("@ianvs/prettier-plugin-sort-imports");
    Object.assign(
      _config,
      Object.assign(
        {
          ...getImportOrderConfig({
            importPrivateScopes:
              options.plugins.importOrder.overrides?.importPrivateScopes ?? [],
          }),
        },
        options.plugins.importOrder.overrides ?? {},
      ),
    );
  }

  if (options.plugins?.tailwindcss?.enabled) {
    Object.assign(
      _config,
      Object.assign(
        { ...tailwindcssConfig },
        options.plugins.tailwindcss.overrides ?? {},
      ),
    );
  }

  return _config;
}

defineConfig({ overrides: {} });
