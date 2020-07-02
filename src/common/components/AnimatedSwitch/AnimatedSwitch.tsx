import React, {useContext} from "react";
import {__RouterContext, Switch} from "react-router-dom";
import {useTransition, animated} from "react-spring";

type Props = {
    children: React.ReactNode[];
};

const AnimatedSwitch = ({children}: Props) => {
    const {location} = useContext(__RouterContext);
    const transitions = useTransition(location, location => location.pathname, {
        from: {
            transform: "translate(50px, 0)",
            opacity: 0
        },
        enter: {
            transform: "translate(0, 0)",
            opacity: 1
        },
        leave: {
            transform: "translate(-100px, 0)",
            opacity: 0,
            position: "absolute"
        }
    });

    return (
        <>
            {transitions.map(({item, props, key}) => (
                <animated.div key={key} style={props}>
                    <Switch location={item}>{children}</Switch>
                </animated.div>
            ))}
        </>
    );
};

export default AnimatedSwitch;
