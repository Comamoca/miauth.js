import { join, ky } from "./deps.ts";

/**
 * parametor of MiAuth url
 */
export interface UrlParam {
  name: string;
  callback?: string;
  permission: Array<string>;
}

/**
 * thow when incorrect format url parametor hand over MiAuth class
 */
class UrlParametorError extends Error {
  constructor() {
    // TODO: ここに気の利いたエラーを入れる
    super("UrlParametorError");
  }
}

class AuthenticationError extends Error {
  constructor() {
    // TODO: ここに気の利いたエラーを入れる
    super("AuthenticationError");
  }
}

export class MiAuth {
  /**
   * MiAuth constructor
   *
   * origin:
   *   your on the instance url
   *
   * param:
   *   url parametor. see UrlParam
   */

  private origin: string;
  private param: UrlParam;
  private session: string;

  constructor(origin: string, param: UrlParam, session: string) {
    this.origin = origin;
    this.param = param;
    this.session = session;
  }

  /**
   * return miauth authentication url
   */
  public authUrl(): string {
    const param = this.buildParam(this.param);
    const requestUrl = new URL(join("miauth", this.session), this.origin);

    requestUrl.search = param;
    return requestUrl.toString();
  }

  /**
   * return misskey api token
   * when failed authentication, thow AuthenticationError
   */
  public async getToken(): Promise<string> {
    const url = new URL(
      join("api", "miauth", this.session, "check"),
      this.origin,
    );

    const data: Record<string, unknown> = await ky.post(url).json();
    const token = String(data.token);

    if (typeof data.token === "undefined") {
      throw new AuthenticationError();
    }

    return token;
  }

  /**
   * build for parametor of miauth authentication url
   * when you incorrect parametor, thow UrlParametorError,
   * but, when callback parametor incorrect do not thow that error
   */
  private buildParam(param: UrlParam): string {
    const urlParam: Record<string, string> = {
      name: param.name,
      callback: param.callback as string,
      permission: param.permission.join(", "),
    };

    const convertdParam = new URLSearchParams();

    Object.keys(urlParam).forEach((key) => {
      convertdParam.set(key, String(urlParam[key]));
      if (key != "callback") {
        if (typeof urlParam[key] === "undefined") {
          throw UrlParametorError;
        }
      } else {
        if (typeof urlParam[key] === "undefined") {
          convertdParam.delete("callback");
        }
      }
    });
    return convertdParam.toString();
  }
}

/**
 *  this is MiAuth constructor light wrapper
 */
export function quickAuth(origin: string, param: UrlParam): MiAuth {
  const session = crypto.randomUUID();
  return new MiAuth(origin, param, session);
}
