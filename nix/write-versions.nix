{
  pkgs,
  nodejsVersion,
  pnpmVersion,
}:
pkgs.writeShellApplication {
  name = "write-versions";

  runtimeInputs = [ pkgs.jq ];

  text = ''
    tmp=$(mktemp)
    jq \
      --arg nodejsVersion ${nodejsVersion} \
      --arg pnpmVersion ${pnpmVersion} \
      --indent 2 \
      '.devEngines.runtime.version = $nodejsVersion | .packageManager = ("pnpm@" + $pnpmVersion)' \
      package.json > "$tmp" \
      && mv "$tmp" package.json
  '';
}
