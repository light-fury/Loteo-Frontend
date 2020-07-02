import React from "react";
import {useTranslation} from "react-i18next";

import "./downloads.scss";

const Downloads = () => {
    const {t} = useTranslation();
    const TRANSLATE = "info.downloads";
    const renderDownloadLink = (languageIcon, language, url) => (
        <a key={language} href={url} className="downloadLink" target="_blank" rel="noopener noreferrer">
            <img className="languageIcon" src={languageIcon} alt={t(`${TRANSLATE}.alts.0.alt`)} />
            <div className="language">{language}</div>
            <img className="downloadIcon" src="icons/download.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
        </a>
    );

    return (
        <div className="downloads">
            <div className="documents">
                <div className="document">
                    <div className="name">{t(`${TRANSLATE}.documents.0.name`)}</div>
                    <div className="downloadLinks">
                        {renderDownloadLink(
                            "icons/languages/en.png",
                            t(`${TRANSLATE}.english`),
                            "documents/loteo-wp-en.pdf"
                        )}
                        {renderDownloadLink(
                            "icons/languages/ru.png",
                            t(`${TRANSLATE}.russian`),
                            "documents/loteo-wp-ru.pdf"
                        )}
                        {renderDownloadLink(
                            "icons/languages/es.png",
                            t(`${TRANSLATE}.spanish`),
                            "documents/loteo-wp-es.pdf"
                        )}
                    </div>
                </div>
                <div className="document">
                    <div className="name">{t(`${TRANSLATE}.documents.1.name`)}</div>
                    <div className="downloadLinks">
                        {renderDownloadLink(
                            "icons/languages/en.png",
                            t(`${TRANSLATE}.english`),
                            "documents/loteo-wp-short-en.pdf"
                        )}
                        {renderDownloadLink(
                            "icons/languages/ru.png",
                            t(`${TRANSLATE}.russian`),
                            "documents/loteo-wp-short-ru.pdf"
                        )}
                        {renderDownloadLink(
                            "icons/languages/sk.png",
                            t(`${TRANSLATE}.slovak`),
                            "documents/loteo-wp-short-sk.pdf"
                        )}
                    </div>
                </div>
                <div className="document">
                    <div className="name">{t(`${TRANSLATE}.documents.2.name`)}</div>
                    <div className="downloadLinks">
                        {renderDownloadLink(
                            "icons/languages/en.png",
                            t(`${TRANSLATE}.english`),
                            "documents/loteo-affiliate-info.jpg"
                        )}
                        {renderDownloadLink(
                            "icons/languages/en.png",
                            t(`${TRANSLATE}.englishPdf`),
                            "documents/loteo-affiliate-prez.pdf"
                        )}
                        {renderDownloadLink(
                            "icons/languages/ru.png",
                            t(`${TRANSLATE}.russian`),
                            "documents/loteo-wp-affiliate-ru.pdf"
                        )}
                        {renderDownloadLink(
                            "icons/languages/sk.png",
                            t(`${TRANSLATE}.slovak`),
                            "documents/loteo-wp-affiliate-sk.pdf"
                        )}
                    </div>
                </div>
                <div className="document">
                    <div className="name">{t(`${TRANSLATE}.documents.3.name`)}</div>
                    <div className="downloadLinks">
                        {renderDownloadLink(
                            "icons/languages/en.png",
                            t(`${TRANSLATE}.english`),
                            "documents/rng-evaluation-report-v1.0.pdf"
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Downloads;
