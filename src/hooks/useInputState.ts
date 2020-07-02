import {ChangeEventHandler} from "react";
import React from "react";

const {useState} = React;

export default (initialState = ""): [string, ChangeEventHandler, (value: string) => void] => {
    const [value, setValue] = useState<string>(initialState);
    const setInputValue = e => setValue(e.target.value);

    return [value, setInputValue, setValue];
};
