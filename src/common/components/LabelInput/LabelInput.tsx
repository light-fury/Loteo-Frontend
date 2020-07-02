import React, {ChangeEventHandler} from "react";

import {Input} from "ui/components";

import "./labelInput.scss";

type Props = {
    className?: string;
    label: string;
    value: string | number;
    onChange: ChangeEventHandler;
    [key: string]: any;
};

const LabelInput = ({className = "", label, value, onChange, ...other}: Props) => (
    <div className={`labelInput ${className}`}>
        <Input
            value={value}
            onChange={onChange}
            {...other}
        />
        <div className="label">{label}</div>
    </div>
);
export default LabelInput;
