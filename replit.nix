{ pkgs }: {
	deps = [
		pkgs.nodejs-16_x 
  pkgs.run 
  pkgs.imagemagick6_light
  pkgs.mailutils
  pkgs.python39Packages.pip
        pkgs.nodePackages.typescript-language-server
        pkgs.nodePackages.yarn
        pkgs.replitPackages.jest
	];
}