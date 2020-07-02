import React from "react";
import {useTranslation} from "react-i18next";

import "./backgroundTexture.scss";

type Props = {
    useAdditionalElements?: boolean;
}

const BackgroundTexture = ({useAdditionalElements = false}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "backgroundTexture";

    return (
        <div className="backgroundTexture">
            <img className="elements1" src="images/background-elements-1.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
            <img className="elements2" src="images/background-elements-1.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
            <img className="elements3" src="images/background-elements-2.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
            <img className="elements4" src="images/background-elements-2.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
            {
                useAdditionalElements &&
                <>
                    <img className="elements5" src="images/background-elements-3.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
                    <img className="elements6" src="images/background-elements-4.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
                    <img className="elements7" src="images/background-elements-3.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
                </>
            }
        </div>
    );
};
export default BackgroundTexture;
