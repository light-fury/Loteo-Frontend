import React from "react";
import {useTranslation} from "react-i18next";

import "./balanceCard.scss";

type Props = {
    className?: string;
    icon: string;
    name: string;
    value?: string;
    onClick?();
    showRedValue?: boolean | null;
    comingSoon?: boolean;
    active?: boolean;
    description?: boolean;
    loading?: boolean;
};

const BalanceCard = ({
    className = "",
    icon,
    name,
    value,
    onClick,
    showRedValue = false,
    comingSoon = false,
    active = !!onClick,
    description = false,
    loading = false
}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "balanceCard";

    return (
        <div
            className={`balanceCard ${className} ${active ? "active" : "inactive"} ${loading ? "isLoading" : ""}`}
            onClick={() => !loading && onClick && onClick()}
        >
            <div className="icon">
                <img src={icon} alt={t(`${TRANSLATE}.alts.0.alt`)} />
            </div>
            <div className="currency">
                <div className="name">{name}</div>
                {value && (
                    <div className={`info ${showRedValue ? "red" : ""}`}>
                        {!description && `${t(`${TRANSLATE}.balance`)}: `}<b>{value}</b>
                    </div>
                )}
            </div>
            {loading ? (
                <div className="metaText">{t(`${TRANSLATE}.loading`)}</div>
            ) : (
                comingSoon && <div className="metaText">{t(`${TRANSLATE}.comingSoon`)}</div>
            )}
            {onClick && !loading && (
                <img className="arrowIcon" src="icons/chevron-right.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
            )}
        </div>
    );
};
export default BalanceCard;
