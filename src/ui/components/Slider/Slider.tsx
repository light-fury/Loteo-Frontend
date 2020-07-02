import React, {useEffect, useRef, useState} from "react";
import {animated, useSpring} from "react-spring";

import "./slider.scss";

type Props = {
    className?: string;
    min: number;
    max: number;
    step?: number;
    isNumberVisible?: (value: number) => boolean;
    formatAdjustingValue?: (value: number) => string;
    value: number;
    onChange: (value: number) => void;
};

const Slider = ({className = "", min, max, step = 1, isNumberVisible, formatAdjustingValue = value => value.toString(), value, onChange}: Props) => {
    const slideRef = useRef<HTMLDivElement>(null);
    const bulletRef = useRef<HTMLDivElement>(null);
    const [adjustingValue, setAdjustingValue] = useState<number | null>(null);
    const adjustingValueRef = useRef<number | null>(null);
    const calculateLeft = value => `${(value - min) / (max - min) * 100}%`;
    const [bulletStyle, setBulletStyle] = useSpring(() => ({left: calculateLeft(value)}));

    const move = x => {
        const slide = slideRef.current;
        if (slide) {
            const tickWidth = slide.clientWidth / (max - min) * step;
            const rect = slide.getBoundingClientRect();
            const left = Math.min(rect.width, Math.max(0, x - rect.left));
            const previousTickX = Math.floor(left / tickWidth) * tickWidth;
            const isNextValue = (left - previousTickX) / tickWidth > 0.5;
            const previousValue = Math.round((previousTickX / tickWidth * step + min) * 100) / 100;

            setAdjustingValue(previousValue + (isNextValue ? step : 0));
            setBulletStyle({left: `${(previousTickX + (isNextValue ? tickWidth : 0)) / slide.clientWidth * 100}%`});
        }
    };

    useEffect(() => {
        adjustingValueRef.current = adjustingValue;
    }, [adjustingValue]);

    useEffect(() => {
        const element = bulletRef.current;

        if (element) {
            const onPress = e => {
                e.preventDefault();
                window.addEventListener("mousemove", onMove);
                window.addEventListener("touchmove", onMove);
                setAdjustingValue(value);
            };

            const onMove = e => {
                move(e.pageX || e.touches && e.touches[0] && e.touches[0].pageX || 0);
            };

            const onRelease = e => {
                e.preventDefault();
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("touchmove", onMove);
                const adjustingValue = adjustingValueRef.current;
                if (adjustingValue) {
                    onChange(adjustingValue);
                }
                setAdjustingValue(null);
            };

            element.addEventListener("mousedown", onPress);
            element.addEventListener("touchstart", onPress);
            window.addEventListener("mouseup", onRelease);
            element.addEventListener("touchend", onRelease);

            return () => {
                element.removeEventListener("mousedown", onPress);
                element.removeEventListener("touchstart", onPress);
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("touchmove", onMove);
                window.removeEventListener("mouseup", onRelease);
                element.removeEventListener("touchend", onRelease);
            };

        }
    }, [value]);

    const toVisibleNumber = value => (
        <div
            key={value}
            className="number"
            style={{left: `${(value - min) / (max - min) * 100}%`}}
        >
            {value}
        </div>
    );

    return (
        <div className={`slider ${className}`}>
            {
                isNumberVisible &&
                <div className="visibleNumbers">
                    {
                        Array.from(new Array(max - min + 1).keys())
                            .map((item, index) => index + min)
                            .filter(isNumberVisible)
                            .map(toVisibleNumber)
                    }
                </div>
            }
            <div ref={slideRef} className="slide">
                <animated.div ref={bulletRef} className="bullet" style={bulletStyle}>
                    {adjustingValue && <div className="value">{formatAdjustingValue(adjustingValue)}</div>}
                </animated.div>
            </div>
        </div>
    );
};
export default Slider;
