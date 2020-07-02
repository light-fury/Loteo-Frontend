import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import ReactDOMServer from "react-dom/server";

import {sendMessage} from "common/aws";
import {Header} from "loteo/components";
import {Button, Input, TextArea} from "ui/components";
import {useInputState} from "hooks";
import {MessageContext, NavigationContext} from "app/contexts";

import "./contactUs.scss";

const ContactUs = () => {
    const {t} = useTranslation();
    const TRANSLATE = "contactUs";
    const [name, setName] = useInputState();
    const [email, setEmail] = useInputState();
    const [message, setMessage] = useInputState();
    const [investment, setInvestment] = useState<number | null>(null);
    const [sending, setSending] = useState<boolean>(false);
    const valid = name && email && message && investment;
    const {showSuccess} = useContext(MessageContext);
    const {showHome} = useContext(NavigationContext);

    const Investments = {
        [0]: <span><b>{t(`${TRANSLATE}.investments.0.value`)}</b> €</span>,
        [1]: <span><b>{t(`${TRANSLATE}.investments.1.value`)}</b> €</span>,
        [2]: <span><b>{t(`${TRANSLATE}.investments.2.value`)}</b> €</span>,
        [3]: <span><b>{t(`${TRANSLATE}.investments.3.value`)}</b> € {t(`${TRANSLATE}.andMore`)}</span>
    };


    const investmentChanged = investment => () => setInvestment(investment);

    const send = async () => {
        setSending(true);

        try {
            await sendMessage(name, email, message, ReactDOMServer.renderToString(investment ? Investments[investment] : ""));
            showSuccess({
                title: t(`${TRANSLATE}.messageSent`),
                text: t(`${TRANSLATE}.thankYou`),
                ok: showHome,
                okText: t(`${TRANSLATE}.okText`),
                cancel: null
            });
        } finally {
            setSending(false);
        }
    };

    const renderInvestmentButton = (key, text) => (
        <div key={key} className={`investment ${key === investment ? "selected" : ""}`} onClick={sending ? undefined : investmentChanged(key)}>
            {text}
        </div>
    );

    return (
        <div className="contactUsComponent">
            <Header/>
            <div className="content">
                <div className="title">Contact us</div>
                <div className="form">
                    <Input placeholder={t(`${TRANSLATE}.yourName`)} value={name} onChange={setName} disabled={sending}/>
                    <Input placeholder={t(`${TRANSLATE}.email`)} value={email} onChange={setEmail} disabled={sending}/>
                    <TextArea placeholder={t(`${TRANSLATE}.message`)} value={message} onChange={setMessage} rows={5} disabled={sending}/>
                    <div className="label">{t(`${TRANSLATE}.investing`)}:</div>
                    <div className="investments">
                        {Object.keys(Investments).map(key => renderInvestmentButton(key, Investments[key]))}
                    </div>
                </div>
                <Button text={sending ? t(`${TRANSLATE}.sending`) : t(`${TRANSLATE}.send`)} onClick={send} disabled={!valid || sending}/>
            </div>
        </div>
    );
};
export default ContactUs;
