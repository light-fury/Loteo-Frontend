import React from "react";
import {useTranslation} from "react-i18next";

import "./faq.scss";
import Question from "loteo/components/FAQ/Question";

const FAQ = () => {
    const {t} = useTranslation();
    const TRANSLATE = "info.faq";

    return (
        <div className="faq">
            <h3>{t(`${TRANSLATE}.t2`)}</h3>
            <div className="questions">
                <Question question={t(`${TRANSLATE}.questions.game.0.q`)}>
                    {t(`${TRANSLATE}.questions.game.0.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.1.q`)}>
                    {t(`${TRANSLATE}.questions.game.1.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.2.q`)}>
                    {t(`${TRANSLATE}.questions.game.2.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.3.q`)}>
                    {t(`${TRANSLATE}.questions.game.3.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.4.q`)}>
                    {t(`${TRANSLATE}.questions.game.4.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.5.q`)}>
                    {t(`${TRANSLATE}.questions.game.5.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.6.q`)}>
                    {t(`${TRANSLATE}.questions.game.6.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.7.q`)}>
                    {t(`${TRANSLATE}.questions.game.7.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.8.q`)}>
                    {t(`${TRANSLATE}.questions.game.8.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.9.q`)}>
                    {t(`${TRANSLATE}.questions.game.9.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.10.q`)}>
                    {t(`${TRANSLATE}.questions.game.10.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.11.q`)}>
                    {t(`${TRANSLATE}.questions.game.11.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.12.q`)}>
                    {t(`${TRANSLATE}.questions.game.12.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.13.q`)}>
                    {t(`${TRANSLATE}.questions.game.13.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.game.14.q`)}>
                    {t(`${TRANSLATE}.questions.game.14.a`)}
                </Question>
            </div>
            <h3>{t(`${TRANSLATE}.t3`)}</h3>
            <div className="questions">
                <Question question={t(`${TRANSLATE}.questions.legal.0.q`)}>
                    {t(`${TRANSLATE}.questions.legal.0.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.legal.1.q`)}>
                    {t(`${TRANSLATE}.questions.legal.1.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.legal.2.q`)}>
                    {t(`${TRANSLATE}.questions.legal.2.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.legal.3.q`)}>
                    {t(`${TRANSLATE}.questions.legal.3.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.legal.4.q`)}>
                    {t(`${TRANSLATE}.questions.legal.4.a`)}
                </Question>
            </div>
            <h3>{t(`${TRANSLATE}.t4`)}</h3>
            <div className="questions">
                <Question question={t(`${TRANSLATE}.questions.crypto.0.q`)}>
                    {t(`${TRANSLATE}.questions.crypto.0.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.crypto.1.q`)}>
                    {t(`${TRANSLATE}.questions.crypto.1.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.crypto.2.q`)}>
                    {t(`${TRANSLATE}.questions.crypto.2.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.crypto.3.q`)}>
                    {t(`${TRANSLATE}.questions.crypto.3.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.crypto.4.q`)}>
                    {t(`${TRANSLATE}.questions.crypto.4.a`)}
                </Question>
                <Question question={t(`${TRANSLATE}.questions.crypto.5.q`)}>
                    {t(`${TRANSLATE}.questions.crypto.5.a`)}
                </Question>
            </div>
        </div>
    );
};
export default FAQ;
