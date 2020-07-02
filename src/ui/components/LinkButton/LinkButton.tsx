import React from "react";
import {withRouter} from "react-router";
import SVG from "react-inlinesvg";

import "./linkButton.scss";

type Props = {
    text: string;
    icon?: string;
    className?: string;
    path?: string;
    url?: string;
    onClick?();
    location: Location;
    history: {push: Function};
};

const LinkButton = ({text, icon, className = "", path, url, onClick, location, history}: Props) => {
    const active = path === "/" ? location.pathname === path : path && location.pathname.startsWith(path);
    const goToPath = () => history.push(path);

    if (onClick) {
        return (
            <div onClick={onClick} className={`linkButton ${className} ${active ? "active" : ""}`}>
                {icon && (
                    <SVG src={icon} className="linkButton__icon">
                        <img src={icon} alt={text} />
                    </SVG>
                )}
                {text}
            </div>
        );
    }

    if (url) {
        return (
            <a href={url} target="_blank" rel="noreferrer noopener">
                <div className={`linkButton ${className} ${active ? "active" : ""}`}>
                    {icon && (
                        <SVG src={icon} className="linkButton__icon">
                            <img src={icon} alt={text} />
                        </SVG>
                    )}
                    {text}
                </div>
            </a>
        );
    }

    return (
        <div className={`linkButton ${className} ${active ? "active" : ""}`} onClick={goToPath}>
            {icon && (
                <SVG src={icon} className="linkButton__icon">
                    <img src={icon} alt={text} />
                </SVG>
            )}
            {text}
        </div>
    );
};
export default withRouter(LinkButton);
