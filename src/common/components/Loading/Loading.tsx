import React from "react";

import "./loading.scss";

type Props = {
    message?: string | null;
}

const Loading = ({message}: Props) => (
    <div className="loading">
        <div className="progressMessage">
            <div className="spinner"/>
            {message && <div className="message">{message}</div>}
        </div>
    </div>
);

export default Loading;
