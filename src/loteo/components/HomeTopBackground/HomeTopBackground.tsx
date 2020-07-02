import React, {useRef, lazy} from "react";

const Background =  lazy(() => import("loteo/components/Background"));

import "./homeTopBackground.scss";

type Props = {
    children?: React.ReactNode;
};

const HomeTopBackground = ({children}: Props) => {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={componentRef} className="homeTopBackground">
            <Background hideBackgroundEnd banners={true} className="background-height">
                {children}
            </Background>
        </div>
    );
};
export default HomeTopBackground;
