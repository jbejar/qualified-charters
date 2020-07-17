import React from 'react'
import PropTypes from 'prop-types'

function BoardMeetingComponent({name, pmnId, bodyName}) {
    return (
        
            
            <a class="btn btn-warning btn-lg ml-4" href={`https://www.utah.gov/pmn/sitemap/publicbody/${pmnId}.html`} target="_blank" role="button">{name} Meetings</a>
        
    )
}

BoardMeetingComponent.propTypes = {
    pmnId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bodyName: PropTypes.string.isRequired,
}

export default BoardMeetingComponent

