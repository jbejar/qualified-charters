import React from 'react'
import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";
import {FaRegFileAudio, FaRegFileAlt, FaRegCalendarCheck, FaRegNewspaper} from 'react-icons/fa'
function BoardMeetingComponent({name, pmnId, bodyName, scheduled=0, haveRecordings = 0, haveMinutes = 0, advanceNotice = 0, stateBody = true}) {
    let variant = "warning"
    
    if(haveRecordings > 0) {
        variant = "success";
    } else if(!stateBody) {
        variant = "info"
    }
    else if(haveMinutes > 0) {
        variant = "light"
    }

    return (
        
            <span>
            <Button size="lg" variant={variant} className="ml-md-4 " href={`https://www.utah.gov/pmn/sitemap/publicbody/${pmnId}.html`} target="_blank">Board Meetings</Button>
            <span className="ml-md-4">
            <FaRegCalendarCheck className="mr-1" /><span title="Scheduled Board Meetings">{scheduled}</span>
            <FaRegNewspaper className="ml-4 mr-1"/><span title="Meetings were posted with at least 24 hr advance notice on Public Meeting Notice site">{advanceNotice}</span>
            <FaRegFileAlt className="ml-4 mr-1"/><span title="Meetings that Have Minutes Attached">{haveMinutes}</span>
            <FaRegFileAudio className="ml-4 mr-1"/><span title="Meetings that Have Recordings">{haveRecordings}</span>
            </span>
            </span>
    )
}

BoardMeetingComponent.propTypes = {
    pmnId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bodyName: PropTypes.string.isRequired,
    haveRecordings: PropTypes.number,
    haveMinutes: PropTypes.number,
    scheduled: PropTypes.number,
}

export default BoardMeetingComponent

