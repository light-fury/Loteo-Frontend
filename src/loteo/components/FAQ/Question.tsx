import React, {ReactNode, useState} from "react";
import {useTranslation} from "react-i18next";

type Props = {
    question: string;
    children: ReactNode;
}

const Question = ({question, children}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "question";

    const [expanded, setExpanded] = useState(false);

    const toggleExpandCollapse = () => setExpanded(!expanded);

    return (
        <div className={`question ${expanded ? "expanded" : "collapsed"}`} onClick={toggleExpandCollapse}>
            <img className="expandCollapseButton" src="icons/chevron-down.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
            <div className="text">{question}</div>
            <p className="answer">{children}</p>
        </div>
    );
};

export default Question;
