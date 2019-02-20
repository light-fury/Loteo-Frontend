import React, {FormEvent, useState} from "react";

import {Button} from "ui/components";
import {subscribeToNews} from "common/aws";
import {useInputState} from "hooks";

import "./subscribeForm.scss";

enum StatusType {
    Ready,
    Subscribing,
    Success,
    Error
}

type Props = {
    placeholder?: string;
};

const SubscribeForm = ({placeholder = "Join our newsletter"}: Props) => {
    const [email, setEmail] = useInputState("");
    const [status, setStatus] = useState<StatusType>(StatusType.Ready);

    const subscribe = (e: FormEvent) => {
        e.preventDefault();

        setStatus(StatusType.Subscribing);
        subscribeToNews(email)
            .then(() => setStatus(StatusType.Success))
            .catch(statusCode => {
                if (statusCode === 400) {
                    setStatus(StatusType.Success);
                } else {
                    setStatus(StatusType.Error);
                }
            });
    };

    const getButtonText = () => {
        switch (status) {
            case StatusType.Subscribing:
                return "Subscribing...";
            case StatusType.Success:
                return "Successfully subscribed";
            case StatusType.Error:
                return "Error occurred";
            default:
                return "Subscribe";
        }
    };

    return (
        <form className="subscribeForm" onSubmit={subscribe}>
            <input
                title="Enter your email address"
                placeholder={placeholder}
                type="email"
                value={email}
                onChange={setEmail}
                disabled={status !== StatusType.Ready}
                required
            />
            <Button
                text={getButtonText()}
                type="submit"
                disabled={status !== StatusType.Ready}
            />
        </form>
    );
};

export default SubscribeForm;
