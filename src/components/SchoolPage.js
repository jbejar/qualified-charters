import React from 'react'
import schools from './../dump.json';
import LicenseComponent from './LicenseComponent';
import SchoolMap from './SchoolMap';
import SchoolRadarComponent from "./SchoolRadarComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
                <p className="lead">
                    <a className="btn btn-primary btn-lg" target="_blank" href={school.URL} role="button">Website</a>
                </p>
                
                
                <p/>
                <Row>
                    <Col sm={12} md={6}>
                    <p>{school.Address} <br/>{school.City}, UT {school.Zip}</p>
                    <SchoolMap schools={[school]} zoom={12} center={[school.Lat, school.Lng]}/>    
                    
                    </Col>
                    <Col>
                    <h3>Student Proficiency</h3>

                    <SchoolRadarComponent school={school}/>
                    <a target="_blank" href={"https://datagateway.schools.utah.gov/Assessment/StudentProficiencyHistory?leaNum=" + school.DistrictNumber} role="button"><span>From USBE Data Gateway</span></a>
                    </Col>
                </Row>
                <LicenseComponent types={school.licenseTypes}/>

                
                
            </div>
            <div>
            </div>
        </div>
    )
}
    

export default SchoolPage
