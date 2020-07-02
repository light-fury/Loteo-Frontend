import React, {ChangeEventHandler} from "react";

import "./input.scss";

type Props = {
    containerClassName?: string;
    className?: string;
    type?: string | undefined;
    value: string | number;
    onChange: ChangeEventHandler;
    error?: string | null | object;
    [key: string]: any;
};

const Input = ({containerClassName = "", className = "", type, value, error, onChange, ...other}: Props) => (
    <div className={`inputComponent ${error ? "error" : ""} ${containerClassName}`}>
        <input className={`input ${className}`} type={type} value={value} onChange={onChange} {...other}/>
        {error && <div className="error">{error}</div>}
    </div>
);

export default Input;
