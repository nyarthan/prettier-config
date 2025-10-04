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
          node = pkgs.nodejs_24;
          pnpm = pkgs.pnpm_10;
        in
        {
          formatter = pkgs.nixfmt-rfc-style;

          apps.write-versions = {
            type = "app";
            program = pkgs.callPackage ./nix/write-versions.nix {
              nodejsVersion = node.version;
              pnpmVersion = pnpm.version;
            };
          };

          devShells =
            let
              runtimePackages = [
                node
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
