{
  description = "prettier-config";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-parts.url = "github:hercules-ci/flake-parts/main";
  };

  outputs =
    inputs@{
      flake-parts,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];

      perSystem =
        {
          pkgs,
          ...
        }:
        let
          nodejs = pkgs.nodejs_24;
          pnpm = pkgs.pnpm.override { inherit nodejs; };
        in
        {
          formatter = pkgs.nixfmt-rfc-style;

          apps.write-versions = {
            type = "app";
            program = pkgs.callPackage ./nix/write-versions.nix {
              nodejsVersion = nodejs.version;
              pnpmVersion = pnpm.version;
            };
            meta.description = "Writes the versions of Node.js & pnpm used by nix to package.json.";
          };

          checks.default = pkgs.callPackage ./nix/check-versions.nix {
            nodejsVersion = nodejs.version;
            pnpmVersion = pnpm.version;
          };

          devShells =
            let
              runtimePackages = [
                nodejs
                pnpm
              ];
              devtoolPackages = [
                pkgs.lefthook
                pkgs.nixfmt-rfc-style
              ];

              local = pkgs.mkShell {
                packages = runtimePackages ++ devtoolPackages;

                shellHook = ''
                  lefthook install
                '';
              };

              ci = pkgs.mkShell {
                packages = runtimePackages;
              };

              default = local;
            in
            {
              inherit default local ci;
            };
        };
    };
}
