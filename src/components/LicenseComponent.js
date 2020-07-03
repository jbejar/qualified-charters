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
          <Accordion defaultActiveKey="1">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Level 1 License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>A standard Level 1 license is a Utah professional educator license
            issued upon completion of an approved preparation program, an
            alternative preparation program, or pursuant to an agreement under
            the National Association of State Directors of Teacher Education and
            Certification (NASDTEC) Interstate Contract, to candidates who have
            also met all ancillary requirements established by law or rule.
			<p>Now Level 1 license will convert to a Professional Educator License.</p>
			</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                Level 2 License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>A standard Level 2 license is a Utah professional educator license
            issued after satisfactory completion of all requirements for a Level
            1 license as well as the Entry Years Enhancement (E.Y.E.)
            requirements established by law or rule relating to professional
            preparation or experience.
			<p>Now Level 2 license will convert to a Professional Educator License.</p>
			</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                Level 3 License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>A standard Level 3 license is a Utah professional educator license
            issued to an educator who holds a current Utah Level 2 license and
            has also received, in the educator’s field of practice,
            certification from the National Board for Professional Teaching
            Standards (NBPTS), a doctorate from a regionallyaccredited
            institution, or a Certificate of Clinical Competence (CCC) from the
            American SpeechLanguage-Hearing Association (ASHA).
			<p>Now Level 2 license will convert to a Professional Educator License.</p>
			</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="APT">
                APT - Academic Pathway to Teaching 
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="APT">
                <Card.Body>The APT is an alternative pathway to a Utah Educator License approved by the Utah State Board of Education (USBE) in
June 2016. It allows an individual with a bachelor’s degree or
higher from a regionally accredited university to pass the appropriate Board approved content knowledge test to apply
for and receive a Level 1 – APT license with an Elementary (K-6) or Secondary (6-12) area of concentration.
			<p> Will convert to an <a href="https://www.schools.utah.gov/curr/licensing/earning?mid=2465&aid=1">Associate Educator License (AEL)</a>.</p></Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="ARL">
                ARL - Alternative Routes to Licensure 
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="ARL">
                <Card.Body>Former Pathway to obtain license. Will convert to an <a href="https://www.schools.utah.gov/curr/licensing/earning?mid=2465&aid=1">Associate Educator License (AEL)</a>.</Card.Body>
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
