import React from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";

import TeamMember from "./TeamMember";

import "./team.scss";

const Team = () => {
    const {t} = useTranslation();
    const TRANSLATE = "info.team";

    const members = [
        {
            picture: "images/team/rastislav-bakala.png",
            name: t(`${TRANSLATE}.members.0.name`),
            position: t(`${TRANSLATE}.members.0.pos`),
            linkedInURL: "https://www.linkedin.com/in/rastislav-bakala-mba-521092178/",
            text: t(`${TRANSLATE}.members.0.desc`)
        },
        {
            picture: "images/team/juraj-illes.png",
            name: t(`${TRANSLATE}.members.1.name`),
            position: t(`${TRANSLATE}.members.1.pos`),
            linkedInURL: "https://www.linkedin.com/in/juraj-ill%C3%A9%C5%A1-70b89a40/",
            text: t(`${TRANSLATE}.members.1.desc`)
        },
        {
            picture: "images/team/rene-darmos.png",
            name: t(`${TRANSLATE}.members.2.name`),
            position: t(`${TRANSLATE}.members.2.pos`),
            linkedInURL: "https://www.linkedin.com/in/rendolf/",
            text: t(`${TRANSLATE}.members.2.desc`)
        },
        {
            picture: "images/team/jan-lalka.png",
            name: t(`${TRANSLATE}.members.3.name`),
            position: t(`${TRANSLATE}.members.3.pos`),
            linkedInURL: "https://www.linkedin.com/in/jan-lalka-118579177/",
            text: t(`${TRANSLATE}.members.3.desc`)
        },
        {
            picture: "images/team/peter-kris.png",
            name: t(`${TRANSLATE}.members.8.name`),
            position: t(`${TRANSLATE}.members.8.pos`),
            linkedInURL: "https://www.linkedin.com/in/peter-kris-a7274054/",
            text: t(`${TRANSLATE}.members.8.desc`)
        },
        {
            picture: "images/team/nina-bakalova.png",
            name: t(`${TRANSLATE}.members.4.name`),
            position: t(`${TRANSLATE}.members.4.pos`),
            linkedInURL: "https://www.linkedin.com/in/nina-bakalova-64467659/",
            text: t(`${TRANSLATE}.members.4.desc`)
        },
        {
            picture: "images/team/max-zakomoldin.png",
            name: t(`${TRANSLATE}.members.5.name`),
            position: t(`${TRANSLATE}.members.5.pos`),
            linkedInURL: "https://www.linkedin.com/in/max-zakomoldin-784633114/",
            text: t(`${TRANSLATE}.members.5.desc`)
        },
        {
            picture: "images/team/julius-buchel.png",
            name: t(`${TRANSLATE}.members.6.name`),
            position: t(`${TRANSLATE}.members.6.pos`),
            linkedInURL: "https://www.linkedin.com/in/j%C3%BAlius-buchel-2786a865/",
            text: t(`${TRANSLATE}.members.6.desc`)
        },
        {
            picture: "images/team/robert-auxt.png",
            name: t(`${TRANSLATE}.members.7.name`),
            position: t(`${TRANSLATE}.members.7.pos`),
            linkedInURL: "https://www.linkedin.com/in/robert-auxt-1b24799/",
            text: t(`${TRANSLATE}.members.7.desc`)
        },
        {
            picture: "images/team/davidk.png",
            name: t(`${TRANSLATE}.members.9.name`),
            position: t(`${TRANSLATE}.members.9.pos`),
            linkedInURL: "https://www.linkedin.com/in/david-kokavec-061481168/",
            text: t(`${TRANSLATE}.members.9.desc`)
        },
        {
            picture: "images/team/nenad.png",
            name: t(`${TRANSLATE}.members.10.name`),
            position: t(`${TRANSLATE}.members.10.pos`),
            linkedInURL: "https://www.linkedin.com/in/nenadristic94/",
            text: t(`${TRANSLATE}.members.10.desc`)
        },
        {
            picture: "images/team/sapta.png",
            name: t(`${TRANSLATE}.members.11.name`),
            position: t(`${TRANSLATE}.members.11.pos`),
            linkedInURL: "https://www.linkedin.com/in/saptamunggaran/",
            text: t(`${TRANSLATE}.members.11.desc`)
        },
        {
            picture: "images/team/anthony.png",
            name: t(`${TRANSLATE}.members.12.name`),
            position: t(`${TRANSLATE}.members.12.pos`),
            linkedInURL: "https://www.linkedin.com/in/urtuties/",
            text: t(`${TRANSLATE}.members.12.desc`)
        },
        {
            picture: "images/team/husain.png",
            name: t(`${TRANSLATE}.members.13.name`),
            position: t(`${TRANSLATE}.members.13.pos`),
            linkedInURL: "",
            text: t(`${TRANSLATE}.members.13.desc`)
        }
    ];

    return (
        <div className="team">
            <h3>{t(`${TRANSLATE}.t1`)}</h3>
            <p>{t(`${TRANSLATE}.p1`)} </p>
            <p>{t(`${TRANSLATE}.p2`)} </p>
            <p>{t(`${TRANSLATE}.p3`)}</p>
            <Grid wrap align="start" justify="center" className="members">
                {members.map((item, idx) => (
                    <TeamMember
                        key={`teamMembers-item-${idx}`}
                        picture={item.picture}
                        name={item.name}
                        position={item.position}
                        linkedInURL={item.linkedInURL}
                    >
                        {item.text}
                    </TeamMember>
                ))}
                <div className="youMember">
                    <img className="youImage" src="images/team/you.png" alt={t(`${TRANSLATE}.alts.0.alt`)} />
                    <div className="description">
                        <div className="title">{t(`${TRANSLATE}.youMember.title`)}</div>
                        <div className="telegram">
                            <img className="telegramIcon" src="icons/telegram.png" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                            <div className="text">
                                {t(`${TRANSLATE}.youMember.text`)}{" "}
                                <a href="https://t.me/loteomission" target="_blank" rel="noreferrer noopener">
                                    https://t.me/loteomission
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </div>
    );
};
export default Team;
