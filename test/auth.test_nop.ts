import { MiAuth } from "../src/auth.ts";
import Scope from "../src/scope.ts";
import { v1 } from "https://deno.land/std@0.144.0/uuid/mod.ts";
import { V1Options } from "https://deno.land/std@0.161.0/uuid/v1.ts";
import { assertEquals, join } from "../src/deps.ts";

const origin = "https://misskey.io/";
const nameOnlyParams = new URLParamGenerator({
  name: "MyApp",
});

const scope = joinScopes([Scope.ReadAccount, Scope.WriteAccount]);
const nameAndScopeParams = new URLParamGenerator({
  name: "MyApp",
  permission: scope,
});

const v1Opt: V1Options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x3030,
  msecs: new Date("2018-12-07").getTime(),
  nsecs: 3030,
};

const session = v1.generate(v1Opt) as string;

Deno.test("testing authUrl on name only", () => {
  const nameOnlyParamsMiAuth = new MiAuth(origin, nameOnlyParams, session);
  assertEquals(
    nameOnlyParamsMiAuth.authUrl(),
    encodeURI(`https://misskey.io/miauth/${session}?name=MyApp`),
  );
});

Deno.test("testing authUrl on name and permission", () => {
  const nameAndScopeParamsMiAuth = new MiAuth(
    origin,
    nameAndScopeParams,
    session,
  );

  const param = new URLSearchParams(`name=MyApp&&permission=${scope}`)
    .toString();
  const requestUrl = new URL(join("miauth", session), origin);
  requestUrl.search = param.toString();

  assertEquals(
    nameAndScopeParamsMiAuth.authUrl(),
    requestUrl.toString(),
  );
});
