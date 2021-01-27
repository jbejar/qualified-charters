import React, { Component } from "react";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
} from "recharts";

export default class LicenseComponent extends Component {
  static propTypes = {
    school: PropTypes.object.isRequired,
  };

  // Color Blind 10 -https://help.tableau.com/current/pro/desktop/en-us/formatting_create_custom_colors.htm
  render() {
    const types = this.props.school.licenseTypes || {};
	const statuses = this.props.school.licenseStatus || {};
	const statusColor = {
		"No License": "#343A40",
		"Reinstated": "#F8F9FA",
		"Student": "#6C757C",
		"New": "#18A2B8",
		"Renewed": "#28A744",
		"Expired": "#DD3446",
	  };
    const color = {
      Temporary: "#ffbc79",
      "Level 1 LEA-Specific": "#898989",
      "Level 2 LEA-Specific": "#898989",
      "LEA-Specific": "#898989",
      Associate: "#c85200",
      Professional: "#5f9ed1",
      "No License": "#343A40",
      "1": "#a0a0a0",
      "2": "#ababab",
    };
    const dataPoints = Object.keys(types)
      .filter((k) => k !== "All")
      .map((key) => ({ name: key, y: types[key] }))
      .filter((row) => row.y);
    const statusData = Object.keys(statuses)
      .filter((k) => k !== "All")
      .map((key) => ({ name: key, y: statuses[key] }))
      .filter((row) => row.y);
    const oldLicenses = this.props.school.oldAllLicenses;
    return (
      <div className="align-center mb-3">
        <h3>Educator Licenses</h3>
        <ResponsiveContainer height={400} width="100%">
          <PieChart width={400} height={400}>
            <Tooltip />
            <Legend />
            <Pie
              data={statusData}
              dataKey="y"
              outerRadius="60%"
              fill="#8884d8"
            >
				{statusData.map((entry, index) => (
                <Cell
                  key={`slice-${index}`}
                  fill={statusColor[entry.name] || "#cfcfcf"}
                />
              ))}
			</Pie>
            <Pie
              data={dataPoints}
              dataKey="y"
              innerRadius="63%"
              outerRadius="80%"
              label
            >
              {dataPoints.map((entry, index) => (
                <Cell
                  key={`slice-${index}`}
                  fill={color[entry.name] || "#cfcfcf"}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div>
          <b>Total Assigned:</b> {types.All}
          { oldLicenses && <span className={types.All >= oldLicenses ? "text-success": "text-danger"}> ({types.All >= oldLicenses ? "+": "" }{((1-oldLicenses/types.All) * 100 ).toFixed(0)}%  since Feb)</span>}
        </div>

        <form
          method="post"
          action="https://cactus.schools.utah.gov/PersonSearch/SearchResults"
        >
          <input
            type="hidden"
            className="form-control"
            name="District"
            value={this.props.school.DistrictID}
          />
          <input
            type="hidden"
            className="form-control"
            name="School"
            value={this.props.school.SchoolID}
          />
          {/* <Button variant="link">From USBE Educator Lookup Tool</Button> */}
          <button type="submit" className="btn btn-link">
            From USBE Educator Lookup Tool
          </button>
        </form>

        <div>
          <Accordion defaultActiveKey="Professional">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="Professional">
                Professional License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="Professional">
                <Card.Body>
                  Standard professional license issued to educators that have
                  completed a Utah education program, traditional or
                  alternative, or transferred an educator license from another
                  state or country and met Utah’s licensure requirements. Valid
                  for 5 years, renewable.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="Associate">
                Associate License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="Associate">
                <Card.Body>
                  Temporary license issued to an individual earning their
                  professional educator license through a Utah university-based
                  or alternate education preparation program as defined in Utah
                  Administrative Rule R277-301. Valid for 3 years.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="LEA">
                LEA Specific License
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="LEA">
                <Card.Body>
                  LEAs can create programs to license their teachers for up to
                  two years with a one year possible extension. See{" "}
                  <a href="https://www.schools.utah.gov/curr/licensing/appel">
                    LEA Alternate Pathway to Professional Educator License
                    (APPEL)
                  </a>{" "}
                  for more information
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    );
  }
}
