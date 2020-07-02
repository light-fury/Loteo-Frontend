import React, {ReactNode} from "react";

import {useBooleanState} from "hooks";

type Props = {
    picture: string;
    name: string;
    position: string;
    linkedInURL: string;
    children: ReactNode;
}

const TeamMember = ({picture, name, position, linkedInURL, children}: Props) => {
    const [storyExpanded, expandStory, collapseStory] = useBooleanState();

    return (
        <div className="teamMember">
            <img className="profilePicture" src={picture} alt={name}/>
            <div className="name">{name}</div>
            <div className="position">{position}</div>
            <div className={`story ${storyExpanded ? "expanded" : "collapsed"}`}>
                {children}
            </div>
            {storyExpanded && <div className="expandCollapseButton" onClick={collapseStory}>Collapse</div>}
            {!storyExpanded && <div className="expandCollapseButton" onClick={expandStory}>Read more</div>}
            <a className="linkedIn" href={linkedInURL} target="_blank" rel="noreferrer noopener">
                <img src="icons/linkedin.svg" alt="linkedIn"/>
            </a>
        </div>
    );
};

export default TeamMember;
