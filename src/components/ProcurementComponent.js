import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

function ProcurementComponent({title, open, close, status, description, href, SchoolID, SchoolName}) {
    let fontClass = {
        "Closed" :"text-info",
        "Cancelled" :"text-warning",
        "Open" :"text-secondary",
        "Awarded" :"text-success",
        "Upcoming" :"text-primary",
    }[status];
    const slug = (SchoolName || "").trim().toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-').replaceAll('#', '').replace(/\./g, '');
    return (
        <div className="p-4">
             <strong className={"d-inline-block mb-2 " + fontClass}>{status}</strong>
                <h3 className="mb-0">RFP - {title}</h3>
            <Link to={"/schools/" + SchoolID + "/" + slug}><strong className="mb-0">{SchoolName}</strong></Link>
            <div>{open} - {close}</div>
            <p className="card-text mb-auto">{description}</p>
            {href && <div className="float-sm-right pt-2"><a  target="_blank" rel="noopener noreferrer"  href={href} className="stetched-link">Source</a></div>}
        </div>
    )
}

ProcurementComponent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    open: PropTypes.object,
    close: PropTypes.object,
    href: PropTypes.string,
}

export default ProcurementComponent

