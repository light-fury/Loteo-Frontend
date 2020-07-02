import React from "react";
import {useTranslation} from "react-i18next";
import {FacebookProvider, Share} from "react-facebook";

import {Button, ButtonStyle, Dialog} from "ui/components";

import "./shareDialog.scss";

const shareUrl = "https://www.playloteo.com/moon-of-fortune";

type Props = {
    onShareFacebook();
    onShareTwitter();
    onClose();
    onQuit();
};

const ShareDialog = ({onShareFacebook, onShareTwitter, onClose, onQuit}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "shareMoF";

    const shareTwitter = () => {
        window.open(
            "https://twitter.com/share?url=" +
                shareUrl +
                "&text=" +
                t(`${TRANSLATE}.quote`) +
                "&hashtags=" +
                t(`${TRANSLATE}.hashtags.twitter`)
        );
        onShareTwitter();
    };

    return (
        <Dialog className="mofShare" title={t(`${TRANSLATE}.title`)} hasCloseButton={false}>
            <span className="text1">{t(`${TRANSLATE}.text1`)}</span>
            <br />
            <span className="text2">{t(`${TRANSLATE}.text2`)}</span>
            <div id="tweet-container" />
            <div className="shareButtonGroup">
                <FacebookProvider appId="348338809413141">
                    <Share
                        href={shareUrl}
                        quote={t(`${TRANSLATE}.quote`)}
                        hashtag={t(`${TRANSLATE}.hashtags.facebook`)}
                    >
                        {({handleClick, loading, data}) => {
                            if (data) {
                                onShareFacebook();
                            }
                            return (
                                <Button
                                    iconURL="icons/networks/facebook.svg"
                                    text={t(`${TRANSLATE}.facebook`)}
                                    disabled={loading}
                                    className="shareButton"
                                    style={ButtonStyle.Facebook}
                                    onClick={handleClick}
                                />
                            );
                        }}
                    </Share>
                </FacebookProvider>
                <Button
                    iconURL="icons/networks/twitter.svg"
                    text={t(`${TRANSLATE}.twitter`)}
                    className="shareButton twitter-share"
                    style={ButtonStyle.Twitter}
                    onClick={shareTwitter}
                />
            </div>
            <div className="extraButtonGroup">
                <Button
                    text={t(`${TRANSLATE}.cancel`)}
                    className="extraButton"
                    style={ButtonStyle.Borderless}
                    onClick={onClose}
                />
                <Button text={t(`${TRANSLATE}.quit`)} className="extraButton" onClick={onQuit} />
            </div>
        </Dialog>
    );
};

export default ShareDialog;
