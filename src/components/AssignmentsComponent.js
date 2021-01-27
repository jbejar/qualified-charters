import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FaRegFileExcel, FaRegFile} from 'react-icons/fa'

export default class AssignmentsComponent extends Component {
  static propTypes = {
    school: PropTypes.object.isRequired,
  };

  // Color Blind 10 -https://help.tableau.com/current/pro/desktop/en-us/formatting_create_custom_colors.htm
  render() {
    const leaSpecificAssignments =
      this.props.school.leaSpecificAssignments || [];
    const noLicenseAssignments = this.props.school.noLicenseAssignments || [];
    const noIssues =
      leaSpecificAssignments.length + noLicenseAssignments.length === 0;
    if (noIssues) {
      return <div></div>;
    }
    leaSpecificAssignments.sort();
    noLicenseAssignments.sort();
    return (
      <div className="align-center mt-3 mb-3">
        <h3>Assignments</h3>
        <Row>  
        {noLicenseAssignments.length > 0 && (
          <Col sm={12} md={6}><div className="card" >
            <div className="card-header">Assignments with Unlicensed Educators</div>
            <ul className="list-group list-group-flush">
              {noLicenseAssignments.map((license) => {
                return <li className="list-group-item"> <FaRegFileExcel className="text-danger  mr-3"/> {license}</li>;
              })}
            </ul>
          </div></Col>
        )}
        {leaSpecificAssignments.length > 0 && (
          <Col sm={12} md={6}><div className="card" >
            <div className="card-header">Assignments with LEA-Specific Licenses</div>
            <ul className="list-group list-group-flush">
              {leaSpecificAssignments.map((license) => {
                return <li className="list-group-item"> <FaRegFile className="text-warning mr-3"/>{license}</li>;
              })}
            </ul>
          </div></Col>
        )}
        
        </Row>
      </div>
    );
  }
}
