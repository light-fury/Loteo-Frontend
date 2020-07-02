import {RefObject, useCallback, useEffect} from "react";
import {AnimatedValue, config, ForwardedProps, useSprings} from "react-spring";
import throttle from "lodash/throttle";

import {isElementVisible} from "common/utils";

export default (elements: RefObject<Element>[], getStyle: (elementVisible: boolean) => object, visiblePercentage: number = 2 / 3, throttleDelay: number = 100) => {
    const calculateStyle = useCallback(
        (index: number) => {
            const element = elements[index].current;

            if (!element) {
                return {
                    to: getStyle(false),
                    config: config.default
                };
            }
            return {
                to: getStyle(isElementVisible(element, visiblePercentage)),
                config: {
                    ...config.default,
                    mass: 2
                }
            };
        },
        [elements, getStyle, visiblePercentage]
    );

    const [styles, setStyles]: [AnimatedValue<ForwardedProps<object>>[], any] = useSprings(elements.length, calculateStyle);

    const scrollChanged = useCallback(throttle(() => setStyles(calculateStyle), throttleDelay), [setStyles]);

    useEffect(() => {
        setStyles(calculateStyle);
    }, [calculateStyle, elements, setStyles]);

    useEffect(() => {
        window.addEventListener("scroll", scrollChanged);

        return () => window.removeEventListener("scroll", scrollChanged);
    }, [scrollChanged]);

    return styles;
};
