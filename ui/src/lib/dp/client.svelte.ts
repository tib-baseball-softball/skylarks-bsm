import {dev} from "$app/environment";
import {env} from "$env/dynamic/public";

type SendOptions = RequestInit & {
  fetch?: typeof globalThis.fetch;
  requestKey?: string;
  params?: Record<string, string>;
};

class APIClient {
  constructor(private readonly baseURL?: string) {}

  private getTargetURL(path: string, params?: Record<string, string>): string {
    let url: URL;
    if (path.startsWith("http://") || path.startsWith("https://")) {
      url = new URL(path);
    } else if (this.baseURL) {
      url = new URL(path, this.baseURL);
    } else {
      url = new URL(path, window.location.origin);
    }

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      }
    }

    return url.toString();
  }

  async send<T>(path: string, options: SendOptions = {}): Promise<T> {
    const {fetch: customFetch, requestKey: _requestKey, params, ...requestInit} = options;
    const fetchFn = customFetch ?? globalThis.fetch;
    const response = await fetchFn(this.getTargetURL(path, params), requestInit);

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status} ${response.statusText}`);
    }

    return await response.json() as T;
  }
}

/**
 * baseURL is only explicitly defined in dev, use relative URLs for Prod.
 *
 * No server is involved, so a single shared instance is fine.
 */
export const client = new APIClient(dev ? env.PUBLIC_BACKEND_URL : undefined);

/** ####################################################### */
