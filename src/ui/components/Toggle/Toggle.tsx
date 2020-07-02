import React from "react";
import Switch from "react-switch";

type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
    [key: string]: any;
};

const Toggle = ({value, onChange, ...other}: Props) => (
    <Switch
        {...other}
        checkedIcon={false}
        uncheckedIcon={false}
        handleDiameter={15}
        height={24}
        width={44}
        offColor="#F5F3F2"
        offHandleColor="#B3ACAB"
        checked={value}
        onChange={onChange}
    />
);
export default Toggle;
