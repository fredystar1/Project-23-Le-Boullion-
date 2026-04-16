interface HTTPServiceProps {
    baseURL: string;
    timeout: number;
    interceptors: {request:string[], response:string[]};
}
class HTTPService {
    baseURL: string;
    timeout: number;
    interceptors: {request:string[], response:string[]};
    constructor(baseURL:string, timeout=5000, interceptors: {request:string[], response:string[]}) {
        this.baseURL = baseURL;
        this.timeout = timeout;
        this.interceptors = {request: [], response: []};
        }
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

const create = (baseURL, endpoint:string, params:) => new HTTPService(baseURL, endpoint, {...params});

export default create;
