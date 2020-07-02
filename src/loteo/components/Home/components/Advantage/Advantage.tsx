import React, {forwardRef} from "react";
import {animated} from "react-spring";

type Props = {
    title: string;
    text: string;
    style?: object;
}

const Advantage = ({title, text, style}: Props, ref) => (
    <animated.div ref={ref} className="advantage" style={style}>
        <div className="hexBullet"/>
        <div className="texts">
            <div className="title">{title}</div>
            <p>{text}</p>
        </div>
    </animated.div>
);

export default forwardRef(Advantage);
