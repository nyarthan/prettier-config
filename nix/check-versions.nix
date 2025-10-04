{
  pkgs,
  nodejsVersion,
  pnpmVersion,
}:
pkgs.runCommandLocal "write-versions"
  {
    name = "write-versions";

    nativeBuildInputs = [ pkgs.jq ];

    doCheck = true;

    src = ../.;
  }

  ''
    cd "$src"
    mkdir "$out"

    nodejsVersion=$(jq -r '.engines.node' package.json)
    packageManager=$(jq -r '.packageManager' package.json)
    pnpmVersion=''${packageManager#"pnpm@"}

    if [ "$nodejsVersion" != "${nodejsVersion}" ]; then
      echo "Error: Incorrect Node.js version." >&2
      echo "Expected: ${nodejsVersion}" >&2
      echo "Actual:   $nodejsVersion" >&2
      exit 1
    fi

    if [ "$pnpmVersion" != "${pnpmVersion}" ]; then
      echo "Error: Incorrect pnpm package manager version." >&2
      echo "Expected: ${pnpmVersion}" >&2
      echo "Actual:   $pnpmVersion" >&2
      exit 1
    fi

    echo "Node.js and pnpm versions are in sync."
  ''
