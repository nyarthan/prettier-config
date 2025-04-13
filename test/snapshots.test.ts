import fsp from "node:fs/promises";
import path from "node:path";
import { it } from "node:test";

import { format } from "prettier";

import { defineConfig } from "../src/index.ts";

const config = defineConfig({
  plugins: {
    importOrder: {
      enabled: true,
      overrides: { importPrivateScopes: ["first"] },
    },
  },
});

const snapshotDir = path.join(import.meta.dirname, "__snapshots__");

it("import order matches snapshot", async (t) => {
  const source = await fsp
    .readFile(path.join(import.meta.dirname, "fixtures/import-order.ts"))
    .then((r) => r.toString());
  const result = await format(source, { ...config, filepath: "fixture.ts" });
  t.assert.fileSnapshot(
    result,
    path.join(snapshotDir, "import-order.snapshot.ts"),
    {
      serializers: [(source) => source],
    },
  );
});
