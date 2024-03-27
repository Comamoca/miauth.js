<div align="center">
  
![Last commit](https://img.shields.io/github/last-commit/Comamoca/miauth.js?color=green&style=flat-square)
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Comamoca/miauth.js?color=green&style=flat-square">
![Issues](https://img.shields.io/github/issues/Comamoca/miauth.js?color=green&style=flat-square)
![Open Issues](https://img.shields.io/github/issues-raw/Comamoca/miauth.js?color=green&style=flat-square)
![Bug Issues](https://img.shields.io/github/issues/Comamoca/miauth.js/bug?color=green&style=flat-square)

# 🦊 MiAuth.js

[MiAuth](https://misskey-hub.net/docs/api/)のDeno/Node.js のラッパー

</div>

<table>
  <thead>
    <tr>
      <th style="text-align:center"><a href="README.md">🍔English</a></th>
      <th style="text-align:center">🍡日本語</th>
    </tr>
  </thead>
</table>

<div align="center">

</div>

> **Note** node.js の例については、近日公開予定です...:sparkles:

## 🚀 使い方

- Deno

```ts
// example.ts を参照

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

// URL にアクセスして認証します
console.log(miauth.authUrl());

// 認証が完了したら呼び出す
// console.log(await miauth.getToken())
```

このモジュールは [misskey.js](https://github.com/misskey-dev/misskey.js) との整合性を考慮しています。

- Deno

```ts
// このスニペットはモジュールのインポートを省略しています
const origin = "https://misskey.io";
const permission: Array<string> = [Permissions.AccountRead];

const param: UrlParam = {
  name: "MyApp",
  permission: permission,
};

const miauth = quickAuth(origin, param);

console.log("Let's authentication to this URL✨\n", miauth.authUrl());

// Enter キーが押されるのを待つ
console.log("\n☕ Push enter for restart process");
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

## ⬇️ Install

- Deno

```ts
import { MiAuth, Permissions, UrlParam } from "./mod.ts";
```

- Node.js

```sh
npm i miauth-js
```

## ⛏️ Development

```sh
# deno venderでベンダーします
deno vender mod.ts

# ベンダーしたライブラリを実行します
deno task dev

# テストを実行します
deno test
```

## 📜 License

MIT

[ライセンスを見る](./LICENSE)

### 🧩 Modules

## 💕 Special Thanks

- [Misskey](https://github.com/misskey-dev/misskey)
- [Misskey JavaScript SDK](https://github.com/misskey-dev/misskey.js)
