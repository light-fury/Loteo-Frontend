import React from "react";

type Props = {
    value: number;
    text: string;
};

const Number = ({value, text}: Props) => {
    return (
        <div className="number">
            <div className="values">
                <div className="value">{value.toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>
            </div>
            <div className="text">{text}</div>
        </div>
    );
};

export default React.memo(Number);
