import React, {useState} from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

function SchoolMap({ schools, zoom = 8, center = [40.7774076, -111.8881773], locate}) {
  const gradeMap = {
    "-1": "P",
    "0": "K"
  }
  const formatGrade = grade => grade <= 0 ? gradeMap[grade + ""] : grade;
  const [viewport, setViewport] = useState({
    center,
    zoom,
  });
  const onViewportChange = viewport => {
    ReactGA.event({
      category: 'Map',
      action: 'UpdateViewport',
      label: JSON.stringify(viewport),
      value: schools.count
    });
  };
  return (
    <Map viewport={viewport} onViewportChanged={onViewportChange} scrollWheelZoom={schools.length !== 1}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      
      {schools.map((school) => (
        <Marker key={school.SchoolID} position={[school.Lat, school.Lng]}>
          <Popup>
            <Link to={"schools/" + school.SchoolID}>{school.SchoolName}</Link>
            <br />
            Grades: {formatGrade(school.GradeLow)} - {formatGrade(school.GradeHigh)}
            <br />
            <span>
              Math:{" "}
              {school.scores.Mathematics &&
                (school.scores.Mathematics["2019"] || "")}
            </span>{" "}
            <br />
            <span>
              Language Arts:{" "}
              {school.scores["Language Arts"] &&
                (school.scores["Language Arts"]["2019"] || "")}
            </span>{" "}
            <br />
            <span>
              Science:{" "}
              {school.scores.Science && (school.scores.Science["2019"] || "")}
            </span>{" "}
            <br />
          </Popup>
        </Marker>
      ))}
      
    </Map>
  );
}

SchoolMap.propTypes = {
  schools: PropTypes.array.isRequired,
  zoom: PropTypes.number,
};

export default SchoolMap;
