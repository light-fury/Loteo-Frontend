import React from "react";
import {useTranslation} from "react-i18next";

import {Button, ButtonStyle} from "ui/components";

import "./messagePanel.scss";

export enum MessageType {
    Success = "icons/success.svg",
    Error = "icons/error.svg"
}

type Props = {
    className?: string;
    type?: MessageType;
    title: string;
    text: string | React.ReactNode;
    ok?();
    okText?: string;
    cancel?();
    cancelText?: string;
    cancelStyle?: ButtonStyle;
};

const MessagePanel = ({className = "", type = MessageType.Success, title, text, ok, okText, cancel, cancelText, cancelStyle}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "messagePanel";

    if (!okText){
        okText = t(`${TRANSLATE}.okText`);
    }

    if (!cancelText){
        cancelText = t(`${TRANSLATE}.cancelText`);
    }

    if (!cancelStyle) {
        cancelStyle = ButtonStyle.Borderless;
    }

    return (
        <div className={`messagePanel ${className}`}>
            <img src={type} alt={t(`${TRANSLATE}.alts.0.alt`)}/>
            <div className="title">{title}</div>
            <div className="text">{text}</div>
            {
                ok && okText &&
                <Button className="okButton" text={okText} onClick={ok}/>
            }
            {
                cancel && cancelText &&
                <Button className="cancelButton" style={cancelStyle} text={cancelText} onClick={cancel}/>
            }
        </div>
    );
};
export default MessagePanel;
