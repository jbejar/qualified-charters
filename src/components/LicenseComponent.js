import React, { Component } from "react";
import PropTypes from "prop-types";
import CanvasJSReact from "../lib/canvasjs.react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class LicenseComponent extends Component {
  static propTypes = {
    types: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  render() {
    const dataPoints = Object.keys(this.props.types)
      .filter((k) => k != "All")
      .map((key) => ({ label: [key], y: this.props.types[key] }))
      .filter((row) => row.y);
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "License Types",
        fontFamily: "verdana",
      },
      axisY: {
        title: "Educators",
      },
      toolTip: {
        shared: true,
        reversed: true,
      },
      legend: {
        verticalAlign: "center",
        horizontalAlign: "right",
        reversed: true,
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
      },
      data: [
        {
          type: "stackedColumn",
          name: "General",
          // showInLegend: true,
          dataPoints,
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        <div>
          <Accordion defaultActiveKey="Professional">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="Professional">
                Professional License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="Professional">
                <Card.Body>Standard professional license issued to educators that have completed a Utah education program, traditional or alternative, or transferred an educator license from another state or country and met Utah’s licensure requirements. Valid for 5 years, renewable.
			</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="Associate">
                Associate License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="Associate">
                <Card.Body>Temporary license issued to an individual earning their professional educator license through a Utah university-based or alternate education preparation program as defined in Utah Administrative Rule R277-301. Valid for 3 years.
			</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Level 1 License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Standard initial license issued to individuals that have completed a Utah education program, traditional or alternative, or transferred an educator license from another state or country and met Utah’s licensure requirements.  Valid for 3 years, renewable.
			<p>Now Level 1 license will convert to a Professional Educator License.</p>
			</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                Level 2 License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>Standard professional license issued to educators that held a Level 1 license and have met the Entry Years Enhancement program requirements for upgrade.  Valid for 5 years, renewable.
			<p>Now Level 2 license will convert to a Professional Educator License.</p>
			</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                Level 3 License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>Standard professional license issued to educators that held a Level 2 license and that have completed a doctorate level degree, National Board Certification, or holds a Speech-Language Pathology license area of concentration and holds ASHA certification.  Valid for 7 years, renewable.
			<p>Now Level 2 license will convert to a Professional Educator License.</p>
			</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="APT">
                APT - Academic Pathway to Teaching 
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="APT">
                <Card.Body>License issued to an individual that has met the requirements of Utah Administrative Rule R277-511 which provides for an LEA to hire and create a preparation program specific to the individual educator.  If all requirements of the rule are met, the educator may be upgraded to a standard Level 2 license after a minimum of 3 years of full-time teaching experience or 4 years of at least 0.4 Full-Time-Equivalent (FTE) teaching experience.
			<p> Will convert to an <a href="https://www.schools.utah.gov/curr/licensing/earning?mid=2465&aid=1">Associate Educator License (AEL)</a>.</p></Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="ARL">
                ARL - Alternative Routes to Licensure 
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="ARL">
                <Card.Body>Temporary license issued to an individual earning their initial educator license through the USOE Alternative Routes to Licensure program under Utah Administrative Rule R277-503.  Valid 1 year, renewable for up to 3 years. Will convert to an <a href="https://www.schools.utah.gov/curr/licensing/earning?mid=2465&aid=1">Associate Educator License (AEL)</a>.</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="LEA">
                LEA Specific License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="LEA">
                <Card.Body>LEAs can create programs to license their teachers for up to two years with a one year possible extension. See <a href="https://www.schools.utah.gov/curr/licensing/appel">LEA Alternate Pathway to Professional Educator License (APPEL)</a> for more information</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="TEMP">
                Temporary
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="TEMP">
                <Card.Body>A temporary license is issued for teachers who are working on earning their license for up to 3 years. Now to obtain a temporary license teachers will have to either get an LEA specific license or apply for an <a href="https://www.schools.utah.gov/curr/licensing/earning?mid=2465&aid=1">Associate Educator License (AEL)</a></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    );
  }
}
