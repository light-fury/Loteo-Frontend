import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const LANGUAGES = ["en", "es", "id", "ko", "ru", "tr", "vi", "zh_ch", "zh_tw"];

i18n.use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        whitelist: LANGUAGES,
        nonExplicitWhitelist: true,
        load: "languageOnly",
        debug: false,
        detection: {
            order: ["localStorage", "querystring", "navigator", "htmlTag", "path", "subdomain", "cookie"]
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
            queryStringParams: {v: "1.0"}
        },

        parseMissingKeyHandler: key => {
            window.Rollbar.error(`Missing translation for ${key}`);
            console.error(`Missing translation for ${key}`);
            return "";
        }
    });

export default i18n;
