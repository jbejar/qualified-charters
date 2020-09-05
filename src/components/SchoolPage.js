import React from 'react'
import schools from './../dump.json';
import LicenseComponent from './LicenseComponent';
import SchoolMap from './SchoolMap';
import SchoolRadarComponent from "./SchoolRadarComponent";
import BoardMeetingComponent from "./BoardMeetingComponent"
import EnrollmentComponent from "./EnrollmentComponent"
import FirstLicensedHistogram from "./FirstLicensedHistogram"
import GoogleReviews from "./GoogleReviews";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function SchoolPage(props) {
    const id = parseInt(props.match.params.schoolID);
    const school = schools.find(s => s.SchoolID === id);
    const gradeMap = {
        "-1": "Preschool",
        "0": "K"
      }
    const formatGrade = grade => grade <= 0 ? gradeMap[grade + ""] : grade;
    
    if(!school) {
        return <div>404 - Could not find school</div>
    }
    return (
        <div className="container">    
            <div className="jumbotron">
                <h1 className="display-3">{school.SchoolName}</h1>
                <hr className="my-2"/>
                <Row>  
                <Col sm={12} md={6}>
                <p className="lead">{school.SchoolCategory} ({formatGrade(school.GradeLow)} - {school.GradeHigh})</p>
                </Col>
                <Col>
                <p className="lead">Opened {school.YearOpened} by {school.CharteredBy}</p>
                </Col>
                </Row>
                <Row>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer" href={school.URL} role="button">Website</a>
                    <BoardMeetingComponent {...school.pmn} stateBody={school.CharteredBy === "State Charter School Board (SCSB)"}/>
                </p>
                </Row>
                
                
                <p/>
                <Row>
                    <Col sm={12} md={6}>
                    <p>{school.Address} <br/>{school.City}, UT {school.Zip}</p>
                    <SchoolMap recenter schools={[school]} zoom={12} center={[school.Lat, school.Lng]}/>    
                    
                    </Col>
                    <Col>
                    <h3>Student Proficiency</h3>

                    <SchoolRadarComponent school={school}/>
                    <a target="_blank" rel="noopener noreferrer" href={"https://datagateway.schools.utah.gov/Assessment/StudentProficiencyHistory?leaNum=" + school.DistrictNumber} role="button"><span>From USBE Data Gateway</span></a>
                    </Col>
                </Row>
                
            </div>
            <EnrollmentComponent elsi={school.elsi}/>
            <LicenseComponent school={school}/>
            <FirstLicensedHistogram schools={[school]} averages/>
                {/* <GoogleReviews placeId="ChIJQQf6dCiETYcRwCybJ-7XgzY "/> */}
            <div>
            </div>
        </div>
    )
}
    

export default SchoolPage
