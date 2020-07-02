import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import QRCode from "qrcode";
import copy from "copy-to-clipboard";

import {Button} from "ui/components";

import "./address.scss";

type Props = {
    address: string;
    qrCodeValue?: string;
    note?: string | React.ReactNode;
};

const Address = ({address, qrCodeValue, note}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "address";
    const [copied, setCopied] = useState(false);
    const [qrCodeDataURL, setQRCodeDataURL] = useState(null);

    const copyAddress = () => {
        copy(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateQRCode = async text => {
        const qrCodeDataURL = await QRCode.toDataURL(text);
        setQRCodeDataURL(qrCodeDataURL);
    };

    useEffect(() => {
        if (qrCodeValue) {
            generateQRCode(qrCodeValue);
        }
    }, [qrCodeValue]);

    return (
        <div className="addressComponent">
            <div className="addressCopy">
                <div className="address">{address}</div>
                <Button text={copied ? t(`${TRANSLATE}.copied`) : t(`${TRANSLATE}.copy`)} onClick={copyAddress} />
            </div>
            {(qrCodeDataURL || qrCodeValue) && (
                <div className="qrCodeContainer">
                    {qrCodeDataURL && <img src={qrCodeDataURL || ""} alt={t(`${TRANSLATE}.alts.0.alt`)} />}
                    {qrCodeValue && !qrCodeDataURL && (
                        <div className="generatingText">{t(`${TRANSLATE}.generatingQrCode`)}</div>
                    )}
                </div>
            )}
            {note && (
                <div className="note">
                    <b>{t(`${TRANSLATE}.pleaseNote`)}</b>
                    <br />
                    {note}
                </div>
            )}
        </div>
    );
};
export default Address;
