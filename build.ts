import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts";

await emptyDir("./npm");

await build({
  packageManager: "yarn",
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
    crypto: true,
  },
  package: {
    // package.json properties
    name: "miauth-js",
    version: Deno.args[0],
    description: "MiAuth wrapper for Deno/Node.js",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/Comamoca/miauth.js.git",
    },
    bugs: {
      url: "https://github.com/Comamoca/miauth.js/issues",
    },
  },
});

function cp2npm(path: string) {
  Deno.copyFileSync(path, `npm/${path}`);
}

// post build steps
cp2npm("LICENSE");
cp2npm("README.md");
cp2npm("README.ja.md");
