import {STORAGE_PREFIX} from "config";

export const setItem = (key: string, value: string) => localStorage.setItem(`${STORAGE_PREFIX}${key}`, value);

export const getItem = (key: string) => localStorage.getItem(`${STORAGE_PREFIX}${key}`);

export const removeItem = (key: string) => localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
