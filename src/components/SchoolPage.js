import React from 'react'
import schools from './../dump.json';
import LicenseComponent from './LicenseComponent';
import SchoolMap from './SchoolMap';

function SchoolPage(props) {
    const id = parseInt(props.match.params.schoolID);
    const school = schools.find(s => s.SchoolID === id);
    
    if(!school) {
        return <div>404 - Could not find school</div>
    }
    return (
        <div className="container">    
            <div className="jumbotron">
                <h1 className="display-3">{school.SchoolName}</h1>
                <p className="lead">{school.SchoolCategory} ({school.GradeLow} - {school.GradeHigh})</p>
                <hr className="my-2"/>
                <SchoolMap schools={[school]} zoom={13}/>
                <p/>
                <LicenseComponent types={school.licenseTypes}/>

                <p>{school.Address} <br/>{school.City}, UT {school.Zip}</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" target="_blank" href={school.URL} role="button">Website</a>
                </p>
                <p className="lead">
                    <a className="btn btn-warning btn-lg" target="_blank" href={"https://datagateway.schools.utah.gov/Assessment/StudentProficiencyHistory?leaNum=" + school.DistrictNumber} role="button">Proficiency Results</a>
                </p>
            </div>
            <div>
            </div>
        </div>
    )
}
    

export default SchoolPage
