import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

import {User} from "auth/types";
import {loadUser} from "auth/actions";
import {Button, Input, Toggle} from "ui/components";
import {getCountryName, login, saveUser} from "auth/api";
import {useInputState, useReduxActions, useReduxLoad} from "hooks";
import {Address} from "loteo/components";
import {getWallet} from "loteo/selectors";
import {loadWallet} from "loteo/actions";
import {Wallet} from "loteo/types";

import "./userForm.scss";

type Props = {
    user: User;
};

const UserForm = ({user}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "userForm";

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [countryName, setCountryName] = useState(t(`${TRANSLATE}.loading`));
    const [telegramUsername, setTelegramUsername, setTelegramUsernameValue] = useInputState(
        user.telegramUsername || ""
    );
    const [useMFA, setUseMFA] = useState(user.useMFA);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [wallet]: [Wallet | null] = useReduxLoad([loadWallet()], [getWallet]);
    const [refreshUser] = useReduxActions([loadUser]);

    useEffect(() => {
        const loadCountryName = async () => {
            const response = await getCountryName(user.country);
            setCountryName(response.name);
        };

        loadCountryName();
    }, [user.country]);
    useEffect(() => {
        setTelegramUsernameValue(user.telegramUsername || "");
    }, [setTelegramUsernameValue, user.telegramUsername]);
    useEffect(() => {
        setUseMFA(user.useMFA);
    }, [user.useMFA]);
    useEffect(() => {
        if (saved) {
            setTimeout(() => setSaved(false), 2000);
        }
    }, [saved]);

    const chooseAvatar = () => {
        const avatarInput = avatarInputRef.current;
        if (avatarInput) {
            avatarInput.click();
        }
    };

    const avatarChosen = e => {
        const avatarFile = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event: any) => setAvatar(event.target.result);
        reader.readAsDataURL(avatarFile);

        e.target.value = "";
    };

    const save = async () => {
        setSaving(true);
        try {
            const updatedUser = {
                ...user,
                telegramUsername,
                useMFA
            };

            if (avatar) {
                updatedUser.avatar = avatar;
            }
            await saveUser(updatedUser);

            setSaved(true);
            refreshUser();
        } catch (e) {
            //
        } finally {
            setSaving(false);
        }
    };

    const mfaChanged = async enabled => {
        setUseMFA(enabled);

        if (!enabled || user.useMFA) {
            return;
        }
        setSaving(true);
        try {
            const updatedUser = {
                ...user,
                useMFA: enabled
            };

            await saveUser(updatedUser);

            login("/user-profile");
        } catch (e) {
            //
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="userForm">
            <div className="avatarSection">
                <img
                    className="avatar"
                    src={avatar || user.avatar || "http://www.gravatar.com/avatar/?d=mp"}
                    alt={t(`${TRANSLATE}.alts.0.alt`)}
                />
                <div className="labelValue">
                    <div className="label">{t(`${TRANSLATE}.form.0.label`)}</div>
                    <Button className="uploadAvatarButton" text={t(`${TRANSLATE}.form.0.btn`)} onClick={chooseAvatar} />
                </div>
                <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    style={{display: "none"}}
                    onChange={avatarChosen}
                />
            </div>
            <div className="labelValue">
                <div className="label">{t(`${TRANSLATE}.form.1.label`)}</div>
                <div className="value">{user.username}</div>
            </div>
            <div className="labelValue">
                <div className="label">{t(`${TRANSLATE}.form.2.label`)}</div>
                <div className="value">{user.email}</div>
            </div>
            <div className="labelValue">
                <div className="label">{t(`${TRANSLATE}.form.3.label`)}</div>
                <div className="value">{countryName}</div>
            </div>
            <div className="labelValue">
                <div className="label">{t(`${TRANSLATE}.form.4.label`)}</div>
                <Input
                    value={telegramUsername}
                    placeholder={t(`${TRANSLATE}.form.4.input`)}
                    onChange={setTelegramUsername}
                />
            </div>
            <div className="mfaSection">
                <img src="icons/mfa.png" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                <div className="label">{t(`${TRANSLATE}.form.5.label`)}</div>
                <Toggle value={useMFA} onChange={mfaChanged} />
            </div>
            <div className="ethAddressSection">
                <div className="label">{t(`${TRANSLATE}.form.6.label`)}</div>
                <Address address={wallet ? wallet.ethDepositAddress : t(`${TRANSLATE}.form.6.loading`)} />
            </div>
            <div className="center">
                <Button
                    className="saveButton"
                    text={
                        saving
                            ? t(`${TRANSLATE}.form.7.saving`)
                            : saved
                                ? t(`${TRANSLATE}.form.7.saved`)
                                : t(`${TRANSLATE}.form.7.save`)
                    }
                    onClick={save}
                    disabled={saving || saved}
                />
            </div>
        </div>
    );
};
export default UserForm;
