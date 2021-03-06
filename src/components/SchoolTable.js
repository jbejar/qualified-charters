import React from "react";
import PropTypes from "prop-types";

import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function SchoolTable({schools, sort, limit = 10, columns=[], summary=false, debug}) {
  const schoolsInOrder = [...schools]  
  if(sort) {
        schoolsInOrder.sort(sort);
    }
  
    const summaryStats = {};
    if(summary) {
      ["Language Arts", "Mathematics", "Science"].forEach(subject => {
        summaryStats[subject] = schoolsInOrder.reduce((acc, school) => {
          if(!school.scores[subject]) {
            return acc;
          }
          const num = parseFloat(school.scores[subject]["2019"]);
          if(isNaN(num)) {
            return acc;
          }
          return num + acc;
        }, 0) / schoolsInOrder.length;
      });
      columns.forEach(col => {
        summaryStats[col.name] = schoolsInOrder.reduce((acc, school) => {
          const result = col.func(school);
          if(!result) {
            return acc;
          }
          const num = parseFloat(result);
          if(isNaN(num) || !isFinite(num)) {
            return acc;
          }
          return num + acc;
        }, 0)/schoolsInOrder.length;
      });
      
    }
  return (
    <div>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>School</th>
            {columns.map(col => 
                <th key={col.name}>{col.name}</th>
            )}
            <th>Language Arts</th>
            <th>Math</th>
            <th>Science</th>
            
          </tr>
        </thead>
        <tbody>
          {schoolsInOrder.slice(0, limit).map((school, i) => {
            const slug = (school.SchoolName || "").trim().toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-').replaceAll('#', '').replace(/\./g, '');
            return (
            <tr key={school.SchoolID}>
              <td>{i+1}</td>
              <td><Link to={"schools/"+school.SchoolID + "/" + slug}>{school.SchoolName}</Link></td>
              {columns.map( col => {
                const val = col.func(school);
                if(typeof val !== "number") {
                return <td key={col.name}>{val}</td>  
                }
                return <td key={col.name}>{(val * 100 ).toFixed(2)}%</td>
              }  
              )}
              <td>{school.scores["Language Arts"] && school.scores["Language Arts"]["2019"]}</td>
              <td>{school.scores["Mathematics"] && school.scores["Mathematics"]["2019"]}</td>
              <td>{school.scores["Science"] && school.scores["Science"]["2019"]}</td>
              
            </tr>
          )})}
          {summary && <tr>
            <td>Summary</td>
            <td></td>
            {columns.map(col => {
              if(!col.summary) {
                return <td key={col.name} />;
              }
              const val = summaryStats[col.name];
              if(typeof val === "string") {
              return <td key={col.name}>{val}</td>  
              }
              return <td key={col.name}>{(val * 100 ).toFixed(2)}%</td>
            })}
            <td>{summaryStats["Language Arts"] && summaryStats["Language Arts"].toFixed(2)}%</td>
              <td>{summaryStats["Mathematics"] && summaryStats["Mathematics"].toFixed(2)}%</td>
              <td>{summaryStats["Science"] && summaryStats["Science"].toFixed(2)}%</td>
            </tr>}
        </tbody>
      </Table>
      
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
