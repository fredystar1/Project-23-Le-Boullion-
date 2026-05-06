type RequestInterceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

type HTTPServiceInterceptors = {
    request?: RequestInterceptor[];
    response?: ResponseInterceptor[];
};

class HTTPService {
    baseURL: string;
    timeout: number;
    interceptors: {request: RequestInterceptor[], response: ResponseInterceptor[]};

    constructor(baseURL: string, timeout = 5000, interceptors: HTTPServiceInterceptors = {}) {
        this.baseURL = baseURL;
        this.timeout = timeout;
        this.interceptors = {
            request: interceptors.request ?? [],
            response: interceptors.response ?? [],
        };
    }

    async request(endpoint: string, options: RequestInit = {}) {
        let config = {...options};
        for (let interceptor of this.interceptors.request) {
            config = await interceptor(config);
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            let response = await fetch(this.baseURL + endpoint, {
                ...config,
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            for (let interceptor of this.interceptors.response) {
                response = await interceptor(response);
            }

            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
}

const create = (
    baseURL: string,
    timeout?: number,
    interceptors?: HTTPServiceInterceptors,
) => new HTTPService(baseURL, timeout, interceptors);

export default create;
