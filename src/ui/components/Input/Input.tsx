import React from "react";

import "./input.scss";

type Props = {
    type: string | null;
    value: string;
    onChange: () => void;
};

const Input = ({type, value, onChange, ...other}: Props) => (
    <input type={type} value={value} onChange={onChange} {...other}/>
);

export default Input;
