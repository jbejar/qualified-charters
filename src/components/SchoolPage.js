import React from 'react'
import schools from './../dump.json';
import LicenseComponent from './LicenseComponent';

function SchoolPage(props) {
    const id = parseInt(props.match.params.schoolID);
    const school = schools.find(s => s.SchoolID === id);
    
    if(!school) {
        return <div>404 - Could not find school</div>
    }
    return (
        <div class="container">    
            <div class="jumbotron">
                <h1 class="display-3">{school.SchoolName}</h1>
    <p class="lead">{school.SchoolCategory} ({school.GradeLow} - {school.GradeHigh})</p>
                <hr class="my-2"/>
                <p><LicenseComponent types={school.licenseTypes}/></p>
                <p>{school.Address} <br/>{school.City}, UT {school.Zip}</p>
                <p class="lead">
                    <a class="btn btn-primary btn-lg" target="_blank" href={school.URL} role="button">Website</a>
                </p>
            </div>
            <div>
            </div>
        </div>
    )
}
    

export default SchoolPage
