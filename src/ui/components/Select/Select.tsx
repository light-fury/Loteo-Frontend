import React, {useRef} from "react";

import {useFocusTracker} from "hooks";

import "./select.scss";

export enum SelectStyle {
    TransparentWhite = "transparentWhite"
}

type Props = {
    value: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    className?: string;
    style?: SelectStyle;
    options: string[];
    disabled?: boolean;
    [key: string]: any;
};

const Select = ({
    value,
    placeholder,
    onChange,
    className = "",
    style = SelectStyle.TransparentWhite,
    options,
    disabled,
    ...other
}: Props) => {
    const selectEl = useRef(null);
    const focused = useFocusTracker(selectEl, true);

    return disabled ?
        (
            <div className={`select disabled ${className} ${style}`} {...other}>
                {value
                    ? <div className="select__value">{value}</div>
                    : placeholder
                        ? <div className="select__placeholder">{placeholder}</div>
                        : <div>&nbsp;</div>
                }
            </div>
        ) : (
            <div
                ref={selectEl}
                className={`select ${className} ${style}`}
                {...other}
            >
                {value
                    ? <div className="select__value">{value}</div>
                    : placeholder
                        ? <div className="select__placeholder">{placeholder}</div>
                        : <div>&nbsp;</div>
                }
                {focused && (
                    <div className="select__dropdown">
                        {options.map(item => (
                            <div
                                key={item}
                                className={`
                                    select__dropdown__option
                                    ${item === value ? "active" : ""}
                                    ${options.length > 3 ? "hasScrollbar" : ""}
                                `}
                                onClick={() => onChange && onChange(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
};

export default Select;
