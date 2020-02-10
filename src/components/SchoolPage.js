import React from 'react'

function SchoolPage(props) {
    return (
        <div>
            <h2>Users {props.match.params.schoolID}</h2>;
        </div>
    )
}
    

export default SchoolPage
