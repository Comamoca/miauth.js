import { Permissions, quickAuth, UrlParam } from "../mod.ts";
import { readLines } from "https://deno.land/std@0.101.0/io/mod.ts";

const origin = "https://misskey.io";
const permission: Array<string> = [Permissions.AccountRead];

const param: UrlParam = {
  name: "MyApp",
  permission: permission,
};

// quickMiAuth is wrapper for get MiAuth isntance quickly
const miauth = quickAuth(origin, param);
// const token = await miauth.getToken()

// call when done authentication
// console.log(await miauth.getToken())

// accses to the this url, verfy authentication
console.log("Let's authentication to this URL✨\n", miauth.authUrl());

console.log("\n☕ Push enter for restart process");
for await (const line of readLines(Deno.stdin)) {
  if (line == "") {
    break;
  }
}

// then you assignment token like this
const token = await miauth.getToken();

console.log(`🔑 Your Token here \n${token}`);
