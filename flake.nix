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
        {
          formatter = pkgs.nixfmt-rfc-style;

          devShells =
            let
              isCI = (builtins.getEnv "CI") != "";

              runtimePackages = [
                pkgs.nodejs_24
                pkgs.pnpm_10
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

              default = if isCI then ci else local;
            in
            {
              inherit default local ci;
            };
        };
    };
}
