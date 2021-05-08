import React, { useState, useEffect } from "react";
import LegislativeDistrictDropDown from "../components/LegislativeDistrictDropDown";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AgendaComponent from "../components/AgendaComponent";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
const format = "YYYY/MM/DD hh:mm A";

export default function HomePage() {
  const [schools, setSchools] = useState([]);
  const [max, setMax] = useState(4);
  const [futureMeetings, setFutureMeetings] = useState([]);
  const [pastMeetings, setPastMeetings] = useState([]);
  useEffect(() => {
    let meetings = schools.reduce((acc, school) => {
      return acc.concat(
        school.pmn.meetings.map((mtg) => {
          mtg.SchoolName = school.SchoolName;
          mtg.SchoolID = school.SchoolID;
          return mtg;
        })
      );
    }, []);
    meetings = Array.from(new Set(meetings));
    meetings.forEach((mtg) => {
      mtg.start = moment(mtg.date, format).toDate();
      mtg.posted = new Date(mtg.updatedDate);
    });
    const futMeetings = meetings.filter(
      (mtg) => mtg.status === "Scheduled" && mtg.start - new Date() > 0
    );
    futMeetings.sort((a, b) => a.start - b.start);
    setFutureMeetings(top(max,futMeetings));
    let pasMeetings = meetings.filter(
      (mtg) =>
        new Date() - mtg.start > 0 &&
        mtg.attachments.includes("Audio Recording Added")
    );
    pasMeetings.sort((a, b) => b.posted - a.posted);
    pasMeetings = top(max, pasMeetings);
    setPastMeetings(pasMeetings);
  }, [schools, max]);

  const top = (max, arr) => {
    const results = [];
    let hrefs = new Set();
    let i = 0;
    while (arr.length > 0 && results.length < Math.min(arr.length, max) && i < arr.length) {
      let currentMtg = arr[i++];
      if (currentMtg && !hrefs.has(currentMtg.href)) {
        results.push(currentMtg);
        hrefs.add(currentMtg.href);
      }
    }
    return results;
  };
  return (
    <div className="container">
      <div className="jumbotron p-4">
        <h1 className="display-4">Qualified Charters</h1>
        <p className="lead my-4">
          Browse through all of Utah's Charter School to find the most qualified schools with the most qualified
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
              {pastMeetings.map((mtg) => (
                <AgendaComponent key={mtg.href} {...mtg} />
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

        <Col md={6}>
          <Row>
            <Col>
            <InfiniteScroll
          dataLength={max}
          next={() => {
            setMax(max + 10);
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
              {futureMeetings.map((mtg) => (
                <AgendaComponent key={mtg.href} {...mtg} />
              ))}
              </InfiniteScroll>
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
