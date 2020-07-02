import {STORAGE_PREFIX} from "config";
import Cookies from "js-cookie";
import Bowser from "bowser";

const USE_COOKIE_STORAGE = true;

const browser = Bowser.parse(window.navigator.userAgent);

const defaultStorageProvider = window.localStorage;

class CookieStorageProvider {
    public static setItem(key: string, content: any, options?: Options) {
        Cookies.set(key, content, options);
    }

    public static getItem(key: string): any {
        return Cookies.get(key);
    }

    public static removeItem(key: string) {
        Cookies.remove(key);
    }
}

const storage = USE_COOKIE_STORAGE || browser.browser.name === "Safari" ? CookieStorageProvider : defaultStorageProvider;

interface Options {
    expires: number | Date;
}

// @ts-ignore
export const setItem = (key: string, value: string, options?: Options) => storage.setItem(`${STORAGE_PREFIX}${key}`, value, options);

export const getItem = (key: string) => storage.getItem(`${STORAGE_PREFIX}${key}`);

export const removeItem = (key: string) => storage.removeItem(`${STORAGE_PREFIX}${key}`);
