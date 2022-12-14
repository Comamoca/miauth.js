<div align="center">
  
![Last commit](https://img.shields.io/github/last-commit/Comamoca/miauth.js?color=green&style=flat-square)
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Comamoca/miauth.js?color=green&style=flat-square">
![Issues](https://img.shields.io/github/issues/Comamoca/miauth.js?color=green&style=flat-square)
![Open Issues](https://img.shields.io/github/issues-raw/Comamoca/miauth.js?color=green&style=flat-square)
![Bug Issues](https://img.shields.io/github/issues/Comamoca/miauth.js/bug?color=green&style=flat-square)

# ð¦ MiAuth.js

[MiAuth](https://misskey-hub.net/docs/api/)ã®Deno/Node.js ã®ã©ããã¼

</div>

<table>
  <thead>
    <tr>
      <th style="text-align:center"><a href="README.md">ðEnglish</a></th>
      <th style="text-align:center">ð¡æ¥æ¬èª</th>
    </tr>
  </thead>
</table>

<div align="center">

</div>

> **Note** node.js ã®ä¾ã«ã¤ãã¦ã¯ãè¿æ¥å¬éäºå®ã§ã...:sparkles:

## ð ä½¿ãæ¹

- Deno

```ts
// exsample.ts ãåç§

import { MiAuth, Permissions, UrlParam } from "./mod.ts";
import { generate } from "./src/deps.ts";

const origin = "https://misskey.io";
const permission = [Permissions.AccountRead, Permissions.NotesRead];

const session = crypto.randomUUID();

const param: UrlParam = {
  name: "MyApp",
  permission: permission,
};
const miauth = new MiAuth(origin, param, session);

// URL ã«ã¢ã¯ã»ã¹ãã¦èªè¨¼ãã¾ã
console.log(miauth.authUrl());

// èªè¨¼ãå®äºãããå¼ã³åºã
// console.log(await miauth.getToken())
```

ãã®ã¢ã¸ã¥ã¼ã«ã¯ [misskey.js](https://github.com/misskey-dev/misskey.js) ã¨ã®æ´åæ§ãèæ®ãã¦ãã¾ãã

- Deno

```ts
// ãã®ã¹ããããã¯ã¢ã¸ã¥ã¼ã«ã®ã¤ã³ãã¼ããçç¥ãã¦ãã¾ã
const origin = "https://misskey.io";
const permission: Array<string> = [Permissions.AccountRead];

const param: UrlParam = {
  name: "MyApp",
  permission: permission,
};

const miauth = quickAuth(origin, param);

console.log("Let's authentication to this URLâ¨\n", miauth.authUrl());

// Enter ã­ã¼ãæ¼ãããã®ãå¾ã¤
console.log("\nâ Push enter for restart process");
for await (const line of readLines(Deno.stdin)) {
  if (line == "") {
    break;
  }
}

const token = await miauth.getToken();

const cli = new Misskey.api.APIClient({
  origin: origin,
  credential: token,
});

const i = await cli.request("i", {});

console.log(`Show your profile\n${i.name}@${i.username}\n${i.description}`);
```

## â¬ï¸ Install

- Deno

```ts
import { MiAuth, Permissions, UrlParam } from "./mod.ts";
```

- Node.js

```sh
npm i miauth-js
```

## âï¸ Development

```sh
# deno venderã§ãã³ãã¼ãã¾ã
deno vender mod.ts

# ãã³ãã¼ããã©ã¤ãã©ãªãå®è¡ãã¾ã
deno task dev

# ãã¹ããå®è¡ãã¾ã
deno test
```

## ð License

MIT

[ã©ã¤ã»ã³ã¹ãè¦ã](./LICENSE)

### ð§© Modules

## ð Special Thanks

- [Misskey](https://github.com/misskey-dev/misskey)
- [Misskey JavaScript SDK](https://github.com/misskey-dev/misskey.js)
