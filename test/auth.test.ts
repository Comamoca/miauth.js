import { MiAuth, quickAuth, UrlParam } from "../src/auth.ts";
import { assertEquals } from "../src/deps.ts";
import { Permissions } from "../src/scope.ts";
// import { v4 as uuidv4 } from "npm:uuid"

const origin = "https://misskey.io";
const permission: Array<string> = [
  Permissions.AccountRead,
  Permissions.NotesRead,
];

// const v4options = {
//   random: [
//     0x10, 0x35, 0x35, 0xbe, 0xc4, 0x54, 0x54, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x30, 0x30,
//   ],
// };

const session = crypto.randomUUID();

const param: UrlParam = {
  name: "MyApp",
  permission: permission,
};

Deno.test("testing authUrl", () => {
  const miauth = new MiAuth(origin, param, session);
  const url =
    `https://misskey.io/miauth/${session}?name=MyApp&permission=read%3Aaccount%2Cread%3Anotes`;
  console.log(url);
  assertEquals(miauth.authUrl(), url);
});
