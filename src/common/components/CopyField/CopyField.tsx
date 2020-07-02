import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import copy from "copy-to-clipboard";

import {Button} from "ui/components";

import "./copyField.scss";

type Props = {
    value: string;
};

type CopyFieldButtonProps = {
    classValue?: string;
    copied: boolean;
    copyValue: () => void;
    textValues: string[];
};

const CopyFieldButton = ({classValue, copied, copyValue, textValues}: CopyFieldButtonProps) => {
    return <Button className={classValue} text={copied ? textValues[0] : textValues[1]} onClick={copyValue}/>;
};

const CopyField = ({value}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "copyField";
    const [copied, setCopied] = useState(false);

    const copyValue = () => {
        copy(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 200);
    };

    const textValues = [t(`${TRANSLATE}.copied`),t(`${TRANSLATE}.copy`)];

    return (
        <div className="copyField">
            <div className="valueField">
                <div className="value">{value}</div>
                <CopyFieldButton copied={copied} copyValue={copyValue} textValues={textValues}/>
            </div>
            <CopyFieldButton classValue="mobileCopyButton" copied={copied} copyValue={copyValue} textValues={textValues}/>
        </div>
    );
};
export default CopyField;
