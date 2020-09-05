import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function AgendaComponent({href, name, agenda, date, attachments, start, SchoolID, SchoolName, attachmentLinks = []}) {
    const hasRecording = attachments && attachments.includes("Audio Recording Added");
    const upcoming = (new Date() - start) < 0;
    let heading = "Event Passed";
    let fontClass = "";
    let mp3s = null;
    if(upcoming) {
        heading = "Upcoming Meeting";
        fontClass = "text-primary";
    } else if(hasRecording) {
        heading = "Recording Available";
        fontClass = "text-success";
        mp3s = attachmentLinks.filter(link => (link || "").toLowerCase().endsWith(".mp3"));
    }
    return (
        <div className="p-4">
            <strong className={"d-inline-block mb-2 " + fontClass}>{heading}</strong>
            <h3 className="mb-0">{name}</h3>
            <Link to={"/schools/" + SchoolID}><strong className="mb-0">{SchoolName}</strong></Link>
            <div>{date}</div>
            <p className="card-text mb-auto"><pre>{agenda}</pre></p>
            {mp3s && mp3s.length > 0 && <AudioPlayer
                        src={"https://www.utah.gov" + mp3s[0]}
                        onPlay={e => console.log("onPlay")}
                        // other props here
                    />}
            <a target="_blank" href={"https://www.utah.gov" + href} className="stetched-link">Continue Reading</a>
        </div>
    )
}

AgendaComponent.propTypes = {
    name: PropTypes.string,
    agenda: PropTypes.string,
    href: PropTypes.string,
    date: PropTypes.string,
    SchoolID: PropTypes.number,
    SchoolName: PropTypes.string,
    attachments: PropTypes.string,
    start: PropTypes.object,
}

export default AgendaComponent

