import React from "react";
import PropTypes from "prop-types";

import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function SchoolTable({schools, sort, limit = 10, columns=[]}) {
    if(sort) {
        schools.sort(sort);
    }
  return (
    <div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>School</th>
            {columns.map(col => 
                <th>{col.name}</th>
            )}
            <th>Language Arts</th>
            <th>Math</th>
            <th>Science</th>
            
          </tr>
        </thead>
        <tbody>
          {schools.slice(0, limit).map((school, i) => (
            <tr>
              <td>{i+1}</td>
              <td><Link to={"schools/"+school.SchoolID}>{school.SchoolName}</Link></td>
              {columns.map( col =>
                <td>{(col.func(school) * 100 ).toFixed(2)}%</td>
              )}
              <td>{school.scores["Language Arts"]["2019"]}</td>
              <td>{school.scores["Mathematics"]["2019"]}</td>
              <td>{school.scores["Science"]["2019"]}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>School</th>
            <th>LEA Licensed </th>
            <th>Licensed</th>
            <th>Temporary</th>
            <th>Language Arts</th>
            <th>Math</th>
            <th>Science</th>

            
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
              <td>{school.scores["Language Arts"]["2019"]}</td>
              <td>{school.scores["Mathematics"]["2019"]}</td>
              <td>{school.scores["Science"]["2019"]}</td>
              
            </tr>
          ))}
        </tbody>
      </Table> */}
    </div>
  );
}

SchoolTable.propTypes = {
    schools:PropTypes.array,
    sort: PropTypes.func,
    limit: PropTypes.number,
    columns: PropTypes.arrayOf(PropTypes.object),
};

export default SchoolTable;
