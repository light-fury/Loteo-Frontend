import React, {ChangeEventHandler} from "react";

import "./textArea.scss";

type Props = {
    value: string;
    onChange: ChangeEventHandler;
    [key: string]: any;
};

const TextArea = ({value, onChange, ...other}: Props) => (
    <textarea className="textArea" value={value} onChange={onChange} {...other}/>
);
export default TextArea;
