import {API_BASE_URL} from "config";

const ApiError = (status: number, statusText: string, response: object) => {
    this.status = status;
    this.statusText = statusText;
    this.response = response;
};

const createDefaultHeaders = () => {
    // add headers relevant for your API here
    return {};
};

const adjustOptions = async (options) => {
    if (!options) {
        options = {};
    }

    options.credentials = "include";

    if (!options.headers) {
        options.headers = {};
    }
    if (typeof options.headers.then === "function") {
        options.headers = await options.headers;
    }

    const headers = createDefaultHeaders();
    if (options.json === true) {
        if (typeof options.body === "object") {
            options.body = JSON.stringify(options.body);
        }
        headers["Content-Type"] = "application/json";
    }

    Object.assign(options.headers, headers);

    return options;
};

const checkStatus = (response: any) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        return response.json()
            .catch(() => {
                throw new ApiError(response.status, response.statusText, null);
            })
            .then(json => {
                throw new ApiError(response.status, response.statusText, json);
            });
    }
};

const parseJSON = response => {
    let contentType = response.headers.get("Content-Type");
    contentType = contentType && contentType.split(";")[0];

    if (!contentType || contentType === "application/json") {
        return response.json()
            .catch(() => response);
    } else {
        return response;
    }
};

const api = async (path, options) => {
    return fetch(API_BASE_URL + path, await adjustOptions(options))
        .then(checkStatus)
        .then(parseJSON);
};

export const ApiCall = (path: string, method: string = "GET", body: object | null = null, headers: object | null = null, json: boolean | null = null) => {
    this.path = path;
    this.method = method;
    this.body = body;
    this.headers = headers;
    this.json = json;

    return api(this.path, {
        method: this.method,
        body: this.body,
        headers: this.headers,
        json: this.json === false ? undefined : !!this.body
    });
};

export default api;
