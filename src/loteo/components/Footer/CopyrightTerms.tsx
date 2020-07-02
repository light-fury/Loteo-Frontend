import React from "react";
import {useTranslation} from "react-i18next";

const CopyrightTerms = () => {
    const {t} = useTranslation();
    const TRANSLATE = "footer.copyrightTerms";

    return (
        <div className="copyrightTerms">
            <div className="text">{t(`${TRANSLATE}.text`)}</div>
            <div className="links">
                <a className="link" href="documents/loteo-terms.pdf" target="_blank">{t(`${TRANSLATE}.link.terms`)}</a>
                <a className="link" href="documents/loteo-cookie-policy.pdf" target="_blank">{t(`${TRANSLATE}.link.cookie`)}</a>
                <a className="link" href="documents/loteo-disclaimer.pdf" target="_blank">{t(`${TRANSLATE}.link.disclaimer`)}</a>
            </div>
        </div>
    );
};

export default CopyrightTerms;
