import {ChangeEventHandler} from "react";
import React from "react";

const {useState} = React;

export default (initialState = 0): [number, ChangeEventHandler, (value: number) => void] => {
    const [value, setValue] = useState<number>(initialState);
    const setInputValue = e => {
        const newValue = e.target.value;
        setValue(newValue.split(/ /)[0].replace(/[^\d\\.,]/g, ""));
    };

    return [value, setInputValue, setValue];
};
