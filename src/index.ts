import type { Config as PrettierConfig } from "prettier";

import { config as defaultConfig } from "./config.ts";
import { astroConfig, type AstroConfig } from "./plugins/astro.ts";
import {
  importOrderConfig,
  type ImportOrderConfig,
} from "./plugins/sortImports.ts";
import {
  tailwindcssConfig,
  type TailwindcssConfig,
} from "./plugins/tailwindcss.ts";

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
    importOrder: PluginConfig<ImportOrderConfig>;
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
        { ...importOrderConfig },
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
