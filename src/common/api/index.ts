import {API_BASE_URL} from "config";
import {getItem} from "common/storage";
import {ACCESS_TOKEN_KEY} from "auth/constants";

function ApiError(status: number, statusText: string, response: object | null) {
    this.status = status;
    this.statusText = statusText;
    this.response = response;
}

const createDefaultHeaders = () => {
    const accessToken = getItem(ACCESS_TOKEN_KEY);

    return {
        Authorization: accessToken && `Bearer ${accessToken}`
    };
};

const adjustOptions = async (options) => {
    if (!options) {
        options = {};
    }

    options.credentials = "omit";

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

export interface CancelablePromise<T> extends Promise<T> {
    cancel();
}

const api = async (path, options) => {
    return fetch(API_BASE_URL + path, await adjustOptions(options));
};

export const callApi = (path: string, method: string = "GET", body: object | null = null, headers: object | null = null, json: boolean | null = null) => {
    const controller = new AbortController();
    const options = {
        method,
        body,
        headers,
        json: json === false ? undefined : !!body,
        signal: controller.signal
    };
    const apiCall = api(path, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch(e => {
            if (e.name === "AbortError") {
                // abort is expected
            } else {
                throw e;
            }
        }) as CancelablePromise<any>;
    apiCall.cancel = () => controller.abort();
    return apiCall;
};

export const callGAApi = async (category) => {
    let result;
    const authData = {
        client_id: "392739939909-ar4nhj87tmqmqcqj4ku3hdgo10bk5l33.apps.googleusercontent.com",
        scope: ['https://www.googleapis.com/auth/analytics'],
        immediate: true
    };

    const gaData = await getGA();

    if (gaData) {
        await window.gapi.client.load('analytics', 'v3');
        const accList = await window.gapi.client.analytics.management.accounts.list();
        const firstAccountId = await handleAccounts(accList);
        const properties = await window.gapi.client.analytics.management.webproperties.list(
            {'accountId': firstAccountId});
        const profiles = await handleProperties(properties);
        const propertyId = await handleProfiles(profiles);

        // GA api parameters
        let query = {
            'ids': 'ga:' + propertyId,
            'metrics': 'ga:uniquePageviews, ga:bounces, ga:pageviews, ga:organicSearches, ga:socialInteractionsPerSession',
            'dimensions': "ga:source,ga:medium"
        };

        switch (category) {
            case "daily":
                query["start-date"]="1daysAgo";
                query["end-date"]="today";
                break;
            case "weekly":
                query["start-date"]="7daysAgo";
                query["end-date"]="today";
                break;
            case "monthly":
                query["start-date"]="30daysAgo";
                query["end-date"]="today";
                break;
            case "total":
                query["start-date"]="2014-01-01";
                query["end-date"]="today";
                break;
            default:
                break;
        }

        const data = await window.gapi.client.analytics.data.ga.get(query)
            .then(function(response) {
                result = response.result;

                let formattedData = {};

                let referral = 0;
                result.rows.forEach((item) => {
                    if (item[1] === "referral") {
                        referral += Number(item[2]);
                    }
                })
                formattedData["bounces"] = Number(result.totalsForAllResults["ga:bounces"]);
                formattedData["organic"] = Number(result.totalsForAllResults["ga:organicSearches"]);
                formattedData["webVistors"] = Number(result.totalsForAllResults["ga:pageviews"]);
                formattedData["uniqueVistors"] = Number(result.totalsForAllResults["ga:uniquePageviews"]);
                formattedData["referral"] = referral;
                formattedData["direct"] = Number(result.rows[0][0] === "(direct)" ? result.rows[0][2] : 0);

                return formattedData;
            });

        return data;
    }
    async function getGA() {
        const response = await window.gapi.auth.authorize(authData);
        if(response.error) {
            console.log('authorizeResponseError', response)
            return false;
        }
        return true;
    }

    async function handleAccounts(response) {
        // Handles the response from the accounts list method.
        if (response.result.items && response.result.items.length) {
            // Get the first Google Analytics account.
            var firstAccountId = response.result.items[0].id;
            // Query for properties.
            return firstAccountId;
        } else {
            console.log('No accounts found for this user.');
            return null;
        }
        
    };

    async function handleProperties(response) {
        // Handles the response from the webproperties list method.
        
        var firstAccountId = response.result.items[0].accountId;
        
        // Get the first property ID
        var firstPropertyId = response.result.items[0].id;

        // Query for Views (Profiles).
        const profiles = await queryProfiles(firstAccountId, firstPropertyId);
        
        return profiles;
    };

    async function queryProfiles(accountId, propertyId) {
        
        // Get a list of all Views (Profiles) for the first property
        // of the first Account.
        const profiles = await window.gapi.client.analytics.management.profiles.list({
            'accountId': accountId,
            'webPropertyId': propertyId
        })

        return profiles;
    };

    async function handleProfiles(response) {
        // Handles the response from the profiles list method.
        if (response.result.items && response.result.items.length) {
            // Get the first View (Profile) ID.
            var firstProfileId = response.result.items[0].id;
        
            // Query the Core Reporting API.
            return firstProfileId;
        } else {
            console.log('No views (profiles) found for this user.');
        }
    };
};
