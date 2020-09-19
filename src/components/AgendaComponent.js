import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import moment from "moment";
import {FaFilePdf} from 'react-icons/fa'
const format = "YYYY/MM/DD hh:mm A";
const isImage = file => file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".ogg") || file.endsWith(".m4a") || file.endsWith(".oga");
function AgendaComponent({href, name, agenda, date, attachments, status,
    start, SchoolID, SchoolName, audioFile, attachmentLinks = []}) {
    const hasRecording = attachments && attachments.includes("Audio Recording Added");
    if(!start) {
        start = moment(date, format).toDate()
    }
    const upcoming = status === "Scheduled" && (new Date() - start) < 0;
    let heading = "Event Passed";
    let fontClass = "";
    let mp3s = null;
    let embed = audioFile && audioFile.toLowerCase().startsWith("https://drive.google.com/file");
    if(embed) {
        embed = audioFile.replace(/view.*$/i, "preview");
    }
    if(upcoming) {
        heading = "Upcoming Meeting";
        fontClass = "text-primary";
    } else if(status === "Cancelled") {
        heading = "Meeting Cancelled";
        fontClass = "text-warning";
    } else if(hasRecording || audioFile) {
        heading = "Recording Available";
        fontClass = "text-success";
        const possibleFiles = attachmentLinks.concat(embed ? [] : [audioFile]);
        mp3s = possibleFiles.filter(link => {
            const file = (link || "").toLowerCase();
            return isImage(file);
        });
        mp3s.sort();
    }
    const fileAttachments = attachmentLinks.filter(file => !isImage(file));
    return (
        <div className="p-4">
            <strong className={"d-inline-block mb-2 " + fontClass}>{heading}</strong>
            <h3 className="mb-0">{name}</h3>
            <Link to={"/schools/" + SchoolID}><strong className="mb-0">{SchoolName}</strong></Link>
            <div>{date}</div>
            <p className="card-text mb-auto"><pre>{agenda}</pre></p>
            {embed && <p><iframe title={"iframe" + audioFile} src={embed} width="500" height="240"></iframe></p>}
            {!embed && audioFile && <p><a rel="noopener noreferrer" target="_blank" href={audioFile} >Audio File</a></p>}
            {mp3s && mp3s.map(mp3 => <div class="m-3"><AudioPlayer
                        src={mp3.startsWith("/") ? ("https://www.utah.gov" + mp3) : mp3}
                        onPlay={e => console.log("onPlay")}
                        // other props here
                    /></div>)}
            { fileAttachments.map(file => <span><a href={file.startsWith("/") ? ("https://www.utah.gov" + file) : file}><FaFilePdf/></a></span>)}
            <div><a target="_blank" rel="noopener noreferrer"  href={"https://www.utah.gov" + href} className="stetched-link">Source</a></div>
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

