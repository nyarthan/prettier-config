{
  description = "prettier-config";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-parts.url = "github:hercules-ci/flake-parts/main";
    devshell.url = "github:numtide/devshell";
    lefthook-config.url = "github:nyarthan/lefthook-config";
  };

  outputs =
    inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.flake-parts.flakeModules.flakeModules
        inputs.devshell.flakeModule
        inputs.lefthook-config.flakeModule
      ];

      systems = [
        "x86_64-linux"
        "aarch64-darwin"
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
          lefthook-config.tool = {
            nixfmt.enable = true;
          };

          formatter = pkgs.nixfmt-rfc-style;

          apps.write-versions = {
            type = "app";
            program = pkgs.callPackage ./nix/write-versions.nix {
              nodejsVersion = nodejs.version;
              pnpmVersion = pnpm.version;
            };
            meta.description = "Writes the versions of Node.js & pnpm used by nix to package.json.";
          };

          checks.check-versions = pkgs.callPackage ./nix/check-versions.nix {
            nodejsVersion = nodejs.version;
            pnpmVersion = pnpm.version;
          };

          devshells =
            let
              runtimePackages = [
                nodejs
                pnpm
              ];
              devtoolPackages = [
                pkgs.lefthook
              ];

              local = {
                packages = runtimePackages ++ devtoolPackages;

                devshell.startup.initLefthook.text = ''
                  lefthook install
                '';
                devshell.motd = "";
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
