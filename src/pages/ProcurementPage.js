import React, { useState, useEffect } from "react";
import LegislativeDistrictDropDown from "../components/LegislativeDistrictDropDown";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProcurementComponent from "../components/ProcurementComponent";
import moment from "moment";
const format = "M/D/YYYY h:mm A";

export default function HomePage() {
  const [schools, setSchools] = useState([]);
  const [max, setMax] = useState(10);
  const [pastMeetings, setPastMeetings] = useState([]);
  useEffect(() => {
    let meetings = schools.reduce((acc, school) => {
      return acc.concat(
        school.procurement.map((procurement) => {
          procurement.SchoolName = school.SchoolName;
          procurement.SchoolID = school.SchoolID;
          return procurement;
        })
      );
    }, []);
    meetings = Array.from(new Set(meetings));
    meetings.forEach((mtg) => {
      mtg.closed = moment(mtg.close, format).toDate();
    });
    let pasMeetings = meetings;
    pasMeetings.sort((a, b) => b.closed - a.closed);
    pasMeetings = top(max, pasMeetings);
    setPastMeetings(pasMeetings);
  }, [schools, max]);

  const top = (max, arr) => {
    const results = [];
    let hrefs = new Set();
    let i = 0;
    while (arr.length > 0 && results.length < Math.min(arr.length, max)) {
      let currentMtg = arr[i++];
      if (!hrefs.has(currentMtg.description + currentMtg.open)) {
        results.push(currentMtg);
        hrefs.add(currentMtg.description + currentMtg.open);
      }
    }
    return results;
  };
  return (
    <div className="container">
      <h1 className="display-4">Recent Charter School Procurement</h1>
      <Row className="mb-2">
        <Col md={12}>
          <Row>
            <Col>
              {pastMeetings.map((procurement) => (
                <ProcurementComponent {...procurement}/>
              ))}
            </Col>
            <Col md="auto"></Col>
          </Row>
          <Button
            onClick={() => {
              setMax(max + 2);
            }}
            variant="warning"
          >
            Load More
          </Button>
        </Col>

        
      </Row>
      <LegislativeDistrictDropDown setSchools={setSchools} />
      {/* <img width="400" src={process.env.PUBLIC_URL + "/Qualified.png"} className="img-fluid rounded" alt="Qualified"/> */}
    </div>
  );
}
