import React from "react";
import {useTranslation} from "react-i18next";
import {createPortal} from "react-dom";

import {useBodyNoScroll} from "hooks";

import "./dialog.scss";

type Props = {
    className?: string;
    title?: string;
    subTitle?: string;
    hasCloseButton?: boolean;
    onClose?();
    children: React.ReactNode;
};

const Dialog = ({
    className = "",
    title,
    subTitle,
    hasCloseButton = true,
    onClose,
    children
}: Props) => {
    useBodyNoScroll();

    const {t} = useTranslation();
    const TRANSLATE = "dialog";

    return createPortal(
        <div className={`dialog ${className}`}>
            <div className="dialogOverlay"/>
            <div className="dialogScrollContainer">
                <div className="dialogArea">
                    {
                        (title || subTitle) &&
                        <div className="dialogHeader">
                            <div className="titleSubTitle">
                                {title && <div className="title">{title}</div>}
                                {subTitle && <div className="subTitle">{subTitle}</div>}
                            </div>
                            {hasCloseButton && (
                                <img className="closeButton" src="icons/close.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} onClick={onClose}/>
                            )}
                        </div>
                    }
                    <div className="dialogContent">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
export default Dialog;
