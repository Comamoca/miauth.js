<div align="center">

![Last commit](https://img.shields.io/github/last-commit/Comamoca/miauth.js?color=green&style=flat-square)
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Comamoca/miauth.js?color=green&style=flat-square">
![Issues](https://img.shields.io/github/issues/Comamoca/miauth.js?color=green&style=flat-square)
![Open Issues](https://img.shields.io/github/issues-raw/Comamoca/miauth.js?color=green&style=flat-square)
![Bug Issues](https://img.shields.io/github/issues/Comamoca/miauth.js/bug?color=green&style=flat-square)

# 🦊 MiAuth.js

the wrapper for [MiAuth](https://misskey-hub.net/docs/api/) on Deno/Node.js

</div>

<table>
  <thead>
    <tr>
      <th style="text-align:center">🍔English</th>
      <th style="text-align:center"><a href="README.ja.md">🍡日本語</a></th>
    </tr>
  </thead>
</table>

<div align="center">

</div>

> **Note**
> for node.js exsample, comeing soon...:sparkles:

## 🚀 How to use

- Deno
```ts
// See exsample.ts

import { MiAuth, UrlParam, Permissions  } from "./mod.ts"

const origin = "https://misskey.io"
const permission = [Permissions.AccountRead]

const session = crypto.randomUUID();

const param: UrlParam = {
  name: "MyApp",
  permission: permission
}
const miauth = new MiAuth(origin, param, session)

// accses to the this url, do authentication
console.log(miauth.authUrl())

// call when done authentication
// console.log(await miauth.getToken())
```

This module keeps in mind on alignment with [misskey.js](https://github.com/misskey-dev/misskey.js). like this

- Deno
```ts
// this snippets omit module imports
const origin = "https://misskey.io"
const permission: Array<string> = [Permissions.AccountRead]

const param: UrlParam = {
  name: "MyApp",
  permission: permission
}

const miauth = quickAuth(origin, param)

console.log("Let's authentication to this URL✨\n", miauth.authUrl())

// wait for press enter
console.log("\n☕ Push enter for restart process")
for await (const line of readLines(Deno.stdin)) {
  if ( line == "" ) {
    break
  }
}

const token = await miauth.getToken()

const cli = new Misskey.api.APIClient({
	origin: origin,
	credential: token,
});

const i = await cli.request('i', {});

console.log(`Show your profile\n${i.name}@${i.username}\n${i.description}`)
```

## ⬇️  Install

- Deno
```ts
import { MiAuth, UrlParam, Permissions  } from "./mod.ts"

const origin = "https://misskey.io"
const permission: Array<string> = [Permissions.AccountRead, Permissions.NotesRead]

const param: UrlParam = {
  name: "MyApp",
  permission: permission
}

const miauth = new MiAuth(origin, param, session)
const token = miauth.getToken()

const apiParam = {
  origin: origin,
  credential: token
}
const cli = new Misskey.api.APIClient(apiParam);

const meta = await cli.request('meta', { detail: true });
console.log(meta)
```

- Node.js
```

```


## ⛏️   Development

this project use [velociraptor](https://velociraptor.run/)

```sh
# See all task
vr

# use deno vender
deno vender mod.ts

# running on vender
vr dev

# run testing
vr dev-test
```

## 📜 License

MIT

[See LICENSE](./LICENSE)

### 🧩 Modules


## 💕 Special Thanks

- [Misskey](https://github.com/misskey-dev/misskey)
- [Misskey JavaScript SDK](https://github.com/misskey-dev/misskey.js)
