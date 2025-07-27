<p align="center">
  <img src="https://raw.githubusercontent.com/prettier/prettier-logo/refs/heads/master/images/prettier-wide-dark.svg" />
  <h1 align="center">Nyarthan's Prettier Config</h1>
</p>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/%40nyarthan%2Fprettier-config?style=for-the-badge&logo=npm&logoColor=%23fff&label=npm&labelColor=cd0000&color=%23fff)](https://www.npmjs.com/@nyarthan/prettier-config)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/nyarthan/prettier-config/ci.yaml?branch=master&style=for-the-badge&logo=github&logoColor=%23fff&label=CI&labelColor=%23151b23)](https://github.com/nyarthan/prettier-config/actions/workflows/ci.yaml)
[![GitHub License](https://img.shields.io/github/license/nyarthan/prettier-config?style=for-the-badge&labelColor=%23151b23&color=%23f0f6fc)](./LICENSE)

</div>

## Installation

```sh
pnpm add -D prettier @nyarthan/prettier-config
```

## Configuration

Create a config file such as `prettier.config.ts`:

```typescript
export { defineConfig } from "@nyarthan/prettier-config";

export default defineConfig({
  overrides: {
    // override of Prettier's options that are provided by this package
  },
  plugins: {
    astro: {
      // set to `true` to load the astro plugin and config
      enabled: true,
      overrides: {
        // override of of the astro plugin's options
      },
    },
    tailwindcss: {},
    importOrder: {
      overrides: {
        // only custom configuration, that can be used to order private imports in a monorepo
        importPrivateScopes: ["repo", "repo-dev"],
      },
    },
  },
});
```

### Note on Plugins

This package only ships the configuration required to use a plugin.
Setting the `enabled` option to `true`, assumes the plugin to be installed in the consuming project.
Check `peerDependencies` for supported versions.
