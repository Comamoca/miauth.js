import { Permissions, quickAuth } from "miauth-js";
import * as Misskey from "misskey-js";
import process from "node:process";
import * as readline from "node:readline";
import { setInterval, setTimeout } from "timers/promises";

const origin = "https://misskey.io";
const permission = [
  Permissions.AccountRead,
  Permissions.NotesRead,
];

const param = {
  name: "MyApp",
  permission: permission,
};

// quickMiAuth is wrapper for get MiAuth isntance quickly
const miauth = quickAuth(origin, param);
// const token = await miauth.getToken()

// call when done authentication
// console.log(await miauth.getToken())

// accses to the this url, verfy authentication
console.log(miauth.authUrl());

// Please click the link within 10 seconds to complete the authentication process.
await setTimeout(10000);

// then you assignment token like this
const token = await miauth.getToken();

// If the authentication is successful, the token will be displayed.
console.log(`🔑 Your Token here \n${token}`);
