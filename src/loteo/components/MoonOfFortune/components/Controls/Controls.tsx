import React from "react";
import {useTranslation, Trans} from "react-i18next";

import {useBooleanState} from "hooks";
import {Grid, Select, Button, ButtonStyle, Dialog} from "ui/components";
import {MoreInfo} from "common/components";

import "./controls.scss";

type Props = {
    betAmount: number;
    setBetAmount: (value: React.ChangeEvent) => void;
    setBetAmountDirectly: (value: number) => void;
    maxBet: number;
    risk: string;
    onRiskChange: (value: string) => void;
    segmentsAmount: string;
    onSegmentsAmountChange: (value: string) => void;
    onStartClicked();
    gameStarted: boolean;
};

const MoonOfFortuneControls = ({
    betAmount,
    setBetAmount,
    setBetAmountDirectly,
    maxBet,
    risk,
    onRiskChange,
    segmentsAmount,
    onSegmentsAmountChange,
    onStartClicked,
    gameStarted
}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "moonOfFortuneControls";

    const [rulesVisible, showRules, hideRules] = useBooleanState();
    // const [startAvailable, allowStart, denyStart] = useBooleanState(true);

    const rules = [...Array(4)].map((_, idx) => t(`${TRANSLATE}.rules.${idx}`));

    // useDidUpdateEffect(() => {
    //     if (gameStarted) {
    //         denyStart();
    //     } else {
    //         // setTimeout(() => {
    //         allowStart();
    //         // }, 0);
    //     }
    // }, [gameStarted]);

    const divideBetAmount = () => {
        if (betAmount / 2 >= 10) {
            setBetAmountDirectly(Math.ceil(betAmount / 20) * 10);
        } else {
            setBetAmountDirectly(0);
        }
    };

    const multiplyBetAmount = () => {
        if (betAmount === 0) {
            setBetAmountDirectly(10);
        } else {
            if (betAmount * 2 <= maxBet) {
                setBetAmountDirectly(betAmount * 2);
            } else {
                setBetAmountDirectly(maxBet);
            }
        }
    };

    const handleSetFocus = () => {
        // console.log("handleSetFocus");

        if (betAmount === 0) {
            setBetAmountDirectly(-1);
        }
    };
    // console.log(betAmount);

    return (
        <div className="mofControls">
            <h1>
                <Trans i18nKey={`${TRANSLATE}.title`} />
            </h1>
            <span>{t(`${TRANSLATE}.betAmount`)}</span>
            <Grid align="center" className="mofControls__betAmount">
                <Grid
                    align="center"
                    className={`mofControls__betAmount__input
                        ${betAmount > 0 ? "hasValue" : ""}`}
                >
                    <input value={betAmount === -1 ? "" : betAmount} onChange={setBetAmount} onFocus={handleSetFocus} />
                    <div>{t(`${TRANSLATE}.loteu`)}</div>
                </Grid>
                <button onClick={divideBetAmount}>{t(`${TRANSLATE}.btnHalf`)}</button>
                <button onClick={multiplyBetAmount}>{t(`${TRANSLATE}.btnTwo`)}</button>
                <button onClick={() => setBetAmountDirectly(maxBet)}>{t(`${TRANSLATE}.max`)}</button>
            </Grid>
            <Grid wrap className="mofControls__selects" noWidth>
                <div className="mofControls__selects__item">
                    <span>{t(`${TRANSLATE}.risk.title`)}</span>
                    <Select
                        options={[
                            t(`${TRANSLATE}.risk.options.0.value`),
                            t(`${TRANSLATE}.risk.options.1.value`),
                            t(`${TRANSLATE}.risk.options.2.value`)
                        ]}
                        value={risk}
                        onChange={onRiskChange}
                        disabled={gameStarted}
                    />
                </div>
                <div className="mofControls__selects__item">
                    <span>{t(`${TRANSLATE}.segments`)}</span>
                    <Select
                        options={[
                            t(`${TRANSLATE}.segOpt.0.v`),
                            t(`${TRANSLATE}.segOpt.1.v`),
                            t(`${TRANSLATE}.segOpt.2.v`),
                            t(`${TRANSLATE}.segOpt.3.v`),
                            t(`${TRANSLATE}.segOpt.4.v`)
                        ]}
                        value={segmentsAmount}
                        onChange={onSegmentsAmountChange}
                        disabled={gameStarted}
                    />
                </div>
            </Grid>
            <div className="mofControls__startButton">
                <Button
                    text={t(`${TRANSLATE}.bet`)}
                    style={ButtonStyle.Gold}
                    onClick={onStartClicked}
                    disabled={!betAmount.toString().length || betAmount > maxBet || gameStarted}
                />
            </div>
            <div className="mofControls__rules">
                <MoreInfo text={t(`${TRANSLATE}.showRules`)} onClick={showRules} />
                {rulesVisible && (
                    <Dialog className="mofControls__rules__dialog" title="Rules" onClose={hideRules}>
                        {rules.map(item => (
                            <span key={item}>{item}</span>
                        ))}
                    </Dialog>
                )}
            </div>
        </div>
    );
};

export default MoonOfFortuneControls;
