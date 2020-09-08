import React, { useState } from "react";
import schoolsDump from "../dump.json";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AgendaComponent from "../components/AgendaComponent";
import moment from "moment";
const format = "YYYY/MM/DD hh:mm A";

export default function HomePage() {
    const [schools, setSchools] = useState(schoolsDump);
    const [max, setMax] = useState(4);
    let meetings = schools.reduce(
        (acc, school) => {
          return acc.concat(
            school.pmn.meetings.map(mtg => {
                mtg.SchoolName = school.SchoolName;
                mtg.SchoolID = school.SchoolID;
                return mtg;
            })
          );
        },
        []
      );
    meetings = Array.from(new Set(meetings))
    meetings.forEach(mtg => {
      mtg.start = moment(mtg.date, format).toDate();
      mtg.posted = moment(mtg.updatedDate, format).toDate();
    });
    const futureMeetings = meetings.filter(mtg => mtg.status === "Scheduled" &&  mtg.start - new Date() > 0)
    futureMeetings.sort((a,b) => a.start - b.start);
    const pastMeetings = meetings.filter(mtg => new Date() - mtg.start > 0 && mtg.attachments.includes("Audio Recording Added"))
    pastMeetings.sort((a,b) => b.posted - a.posted);
    const top = (max, arr) => {
      const results = [];
      let hrefs = new Set();
      let i = 0;
      while(results.length < max) {
        let currentMtg = arr[i++];
        if(!hrefs.has(currentMtg.href)) {
          results.push(currentMtg);
          hrefs.add(currentMtg.href);
        }
      }
      return results;
    }
  return (
    <div className="container">
      <div className="jumbotron p-4">
        <h1 className="display-4">Qualified Charters</h1>
        <p className="lead my-4">
          Browse through all of Utah's Charter School to find the most qualified
          teachers
        </p>

        <p className="lead mb-0">
          <Link to={"/qualified"}>Continue Reading...</Link>
        </p>
      </div>
      <Row className="mb-2">
        <Col md={6}>
          <Row>
            <Col>
                {top(max, pastMeetings).map(mtg => <AgendaComponent {...mtg}/>)}
            </Col>
            <Col md="auto"></Col>
          </Row>
          <Button onClick={() => {setMax(max+2)}} variant="warning">Load More</Button>
        </Col>
        
        <Col md={6}>
          <Row>
            <Col>
              {top(max, futureMeetings).map(mtg => <AgendaComponent {...mtg}/>)}
            </Col>
            <Col md="auto"></Col>
          </Row>
        <Button onClick={() => {setMax(max+2)}} variant="warning">Load More</Button>
        </Col>
      </Row>
      {/* <img width="400" src={process.env.PUBLIC_URL + "/Qualified.png"} className="img-fluid rounded" alt="Qualified"/> */}

     
    </div>
  );
}
