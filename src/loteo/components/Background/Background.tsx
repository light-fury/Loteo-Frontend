import React from "react";

import "./background.scss";

type Props = {
    showMoon?: boolean;
    showFooterTexture?: boolean;
    showBackgroundTexture?: boolean;
};

const Background = ({showMoon = true, showFooterTexture = false, showBackgroundTexture = false}: Props) => (
    <div className="background">
        {showBackgroundTexture && <img className="backgroundTexture" src="images/background-texture.png" alt="background texture"/>}
        {showFooterTexture && <img className="footerTexture" src="images/footer-texture.png" alt="footer texture"/>}
        {showMoon && <img className="moon" src="images/loteo-moon.png" alt="moon"/>}
    </div>
);
export default Background;
