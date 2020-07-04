import React from "react";
import PropTypes from "prop-types";
import schools from "./../dump.json";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function SchoolTable(props) {
    const percentLicensed = s => 1 - ((s.licenseTypes["No License"] || 0) / (s.licenseTypes.All || 0))
    const temporaryLicensed = s =>  ((s.licenseTypes.Temporary || 0) / (s.licenseTypes.All || 0))
    const leaLicensed = s =>  (((s.licenseTypes["Level 1 LEA-Specific"] || 0) + (s.licenseTypes["Level 2 LEA-Specific"] || 0)) / (s.licenseTypes.All || 0))
    const level2Up = s =>  (((s.licenseTypes["2"] || 0) + (s.licenseTypes["3"] || 0)) / (s.licenseTypes.All || 0))
    schools.sort((s,t) => (percentLicensed(t) - temporaryLicensed(t) + level2Up(t)) -(percentLicensed(s) - temporaryLicensed(s) + level2Up(s)))
  return (
    <div>
      <h4>Most Qualified Charter Schools</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>School</th>
            <th>Licensed</th>
            <th>Level 2+</th>
            <th>Temporary</th>
            
          </tr>
        </thead>
        <tbody>
          {schools.slice(0, 5).map((school, i) => (
            <tr>
              <td>{i+1}</td>
              <td><Link to={"schools/"+school.SchoolID}>{school.SchoolName}</Link></td>
              <td>{(percentLicensed(school) * 100 ).toFixed(2)}%</td>
              <td>{(level2Up(school) * 100 ).toFixed(2)}%</td>
              <td>{(temporaryLicensed(school) * 100 ).toFixed(2)}%</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Most LEA Specific Licenses</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>School</th>
            <th>LEA Licensed </th>
            <th>Licensed</th>
            <th>Temporary</th>
            
          </tr>
        </thead>
        <tbody>
          {schools.sort((s,t) => (leaLicensed(t) -leaLicensed(s))).slice(0, 20).map((school, i) => (
            <tr>
              <td>{i+1}</td>
              <td><Link to={"schools/"+school.SchoolID}>{school.SchoolName}</Link></td>
              <td>{(leaLicensed(school) * 100 ).toFixed(2)}%</td>
              <td>{(percentLicensed(school) * 100 ).toFixed(2)}%</td>
              <td>{(temporaryLicensed(school) * 100 ).toFixed(2)}%</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

SchoolTable.propTypes = {};

export default SchoolTable;
