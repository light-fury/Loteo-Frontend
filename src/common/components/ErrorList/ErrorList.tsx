import React from "react";

import "./errorList.scss";

type Props = {
    errors: string[];
};

const ErrorList = ({errors}: Props) => {
    const toError = (error, index) => (
        <div key={index} className="error">&#8226;{"  "}{error}</div>
    );

    return (
        <div className="errorList">
            {errors.map(toError)}
        </div>
    );
};
export default ErrorList;
