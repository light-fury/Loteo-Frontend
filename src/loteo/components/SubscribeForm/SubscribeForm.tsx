import React, {FormEvent, useState} from "react";
import {useTranslation} from "react-i18next";

import {Button} from "ui/components";
import {subscribeToNews} from "loteo/api";
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

const SubscribeForm = ({placeholder}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "subscribeForm";
    const [email, setEmail] = useInputState("");
    const [status, setStatus] = useState<StatusType>(StatusType.Ready);

    const subscribe = (e: FormEvent) => {
        e.preventDefault();

        setStatus(StatusType.Subscribing);
        subscribeToNews(email)
            .then(() => setStatus(StatusType.Success))
            .catch(error => {
                if (error.status === 409) {
                    // already subscribed - ignoring
                    setStatus(StatusType.Success);
                } else {
                    setStatus(StatusType.Error);
                }
            });
    };

    const getButtonText = () => {
        switch (status) {
            case StatusType.Subscribing:
                return t(`${TRANSLATE}.status.subscribing`);
            case StatusType.Success:
                return t(`${TRANSLATE}.status.success`);
            case StatusType.Error:
                return t(`${TRANSLATE}.status.error`);
            default:
                return t(`${TRANSLATE}.status.default`);
        }
    };

    return (
        <form className="subscribeForm" onSubmit={subscribe}>
            <input
                title={t(`${TRANSLATE}.title`)}
                placeholder={placeholder ? placeholder : t(`${TRANSLATE}.placeholder`)}
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
