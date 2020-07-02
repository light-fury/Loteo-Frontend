import React from "react";
import {useTranslation} from "react-i18next";

type Props = {
    className?: string;
    label: string;
    caret?: boolean;
    value?: string;
    loading: boolean;
    icon?: string | null;
    onClick?();
};

const CurrencyCardSmall = ({className = "", label, caret = false, value = "", icon = null, loading, onClick}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "userInfoComponent";

    if (!value) {
        value = t(`${TRANSLATE}.soon`);
    }    return (
        <div className={`currencyCardSmall ${className}`} onClick={onClick}>
            <div className="label">{label}</div>
            {icon && (<div className="currencyCardSmall__icon"><img src={icon} alt="header-ticket"/></div>)}
            {!caret && (<div className="value">{loading ? t(`${TRANSLATE}.loading`) : value}</div>)}
            {caret && (<div className="arrow-down" />)}
        </div>
    );
};

export default CurrencyCardSmall;
