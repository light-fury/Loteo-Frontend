import React, {useState, useEffect} from "react";
import i18next from "i18next";

import {useLocalStorage} from "hooks";
import {LANGUAGES} from "app/i18n/i18n";

import "./langSwitcher.scss";

const LangSwitcher = () => {
    const [showLangs, setShowLangs] = useState<boolean>(false);
    const [LSLang, setLSLang] = useLocalStorage("selectedLang");

    const changeLang = (lang: string) => {
        toggleLangs();
        setLSLang(lang);
        i18next.changeLanguage(lang);
        location.reload();
    };

    const toggleLangs = () => {
        setShowLangs(!showLangs);
    };

    useEffect(() => {
        if (LSLang) {
            i18next.changeLanguage(LSLang);
        } else {
            const parsedLang = i18next.language.split("-")[0];
            if (LANGUAGES.includes(parsedLang)) {
                i18next.changeLanguage(parsedLang);
                setLSLang(parsedLang);
            } else {
                i18next.changeLanguage(LANGUAGES[0]);
                setLSLang(LANGUAGES[0]);
            }
        }
    }, []);

    return (
        <div className={`langSwitcher ${showLangs ? "langSwitcher--expanded" : ""}`} onClick={toggleLangs}>
            <div className="header">
                <p className="visibleLang">{LSLang}</p>
                <div className={`arrow ${showLangs ? "arrow--open" : ""}`} />
            </div>
            {showLangs && (
                <div className="items">
                    <ul>
                        {LANGUAGES.map(
                            item =>
                                item !== LSLang && (
                                    <li key={item} onClick={() => changeLang(item)}>
                                        {item}
                                    </li>
                                )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LangSwitcher;
