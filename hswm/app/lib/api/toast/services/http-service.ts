/**
 * Generic HTTP service class (work-in-progress).
 *
 * Provides a reusable fetch wrapper with configurable base URL, request
 * timeout via `AbortController`, and interceptor pipelines for both
 * requests and responses.
 *
 * > **Note:** This module is currently a **draft** — the request/response
 * > interceptor types and the factory function have syntax issues that
 * > need to be resolved before use.
 *
 * @module http-service
 */

/**
 * Configuration options accepted by the {@link HTTPService} constructor.
 */
interface HTTPServiceProps {
    /** Root URL prepended to every request path. */
    baseURL: string;
    /** Maximum time (in ms) to wait before aborting a request. */
    timeout: number;
    /** Interceptor pipelines for request and response phases. */
    interceptors: {request:string[], response:string[]};
}

/**
 * A lightweight HTTP client that wraps the native `fetch` API.
 *
 * Features:
 * - **Base URL resolution** — endpoint paths are appended to `baseURL`.
 * - **Request timeout** — uses `AbortController` with a configurable
 *   `timeout` (default 5 000 ms).
 * - **Interceptors** — arrays of functions that can mutate the config
 *   before a request is sent (request interceptors) or post-process the
 *   response (response interceptors).
 *
 * @remarks
 * The interceptor arrays are currently typed as `string[]` and the
 * `request` method mixes `async/await` with `.then()` chaining, which
 * will cause a compile-time error.  This class should be treated as
 * scaffolding until it is completed.
 */
class HTTPService {
    /** Root URL prepended to every request path. */
    baseURL: string;
    /** Maximum time (in ms) before a request is aborted. */
    timeout: number;
    /** Interceptor pipelines (currently stubbed). */
    interceptors: {request:string[], response:string[]};

    /**
     * Create a new `HTTPService` instance.
     *
     * @param baseURL      - Root URL for all requests.
     * @param timeout      - Request timeout in milliseconds (default `5000`).
     * @param interceptors - Interceptor config (initialised to empty arrays
     *                       regardless of what is passed).
     */
    constructor(baseURL:string, timeout=5000, interceptors: {request:string[], response:string[]}) {
        this.baseURL = baseURL;
        this.timeout = timeout;
        this.interceptors = {request: [], response: []};
        }

    /**
     * Execute a fetch request against `baseURL + endpoint`.
     *
     * Each registered request interceptor is applied to the config
     * object in order before the request is dispatched.  An
     * `AbortController` enforces the configured timeout.
     *
     * @param endpoint - Path appended to the base URL.
     * @param options  - Optional `RequestInit`-like configuration merged
     *                   into the fetch call.
     */
    async request(endpoint:string, options={}) {
        let config = {...options};
        for (let interceptor of this.interceptors.request) {
            config = await interceptor(config);
        }
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(this.baseURL + endpoint, {
                ...config,
                signal: controller.signal
            })
            clearTimeout(timeoutId);
        }
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
        .finally(() => {
            if (!controller.signal.aborted) console.log(controller.signal);
        })
    }

}

/**
 * Factory function for creating pre-configured {@link HTTPService} instances.
 *
 * @param baseURL  - Root URL for the new client.
 * @param endpoint - _Unused_ — this parameter appears to be a leftover
 *                   from an earlier iteration and should be removed.
 * @param params   - Additional configuration spread into the constructor.
 * @returns A new `HTTPService` instance.
 *
 * @remarks
 * The current signature has a type error (`params:` has no type
 * annotation).  This needs to be fixed before the module can compile.
 */
const create = (baseURL, endpoint:string, params:) => new HTTPService(baseURL, endpoint, {...params});

export default create;
