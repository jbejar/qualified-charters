import React, {useState, useEffect} from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

function SchoolMap({ schools, zoom = 8, center = [40.7774076, -111.8881773], locate, recenter=false}) {
  const gradeMap = {
    "-1": "P",
    "0": "K"
  }
  const formatGrade = grade => grade <= 0 ? gradeMap[grade + ""] : grade;
  
  const recordings = s => Math.min(s.pmn.haveRecordings / s.pmn.shouldHaveRecordings,1);
  const professionalLicense = s =>  (((s.licenseTypes["1"] || 0) + (s.licenseTypes["1 - Returning"] || 0) + (s.licenseTypes["2"] || 0) + (s.licenseTypes["3"] || 0) + (s.licenseTypes["Professional"] || 0)) / (s.licenseTypes.All || 0))
  const percentExpired = s => ((s.licenseStatus["Expired"] || 0) / (s.licenseTypes.All || 0))
  const [viewport, setViewport] = useState({
    center,
    zoom,
  });
  useEffect(() => {
    recenter && setViewport({
      center,
      zoom,
    })
  },[recenter, center, zoom]);
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
      
      {schools.map((school) => {
        const slug = school.SchoolName.trim().toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-').replaceAll('#', '').replace(/\./g, '');
        return (
        <Marker key={school.SchoolID} position={[school.Lat, school.Lng]}>
          <Popup>
            <Link to={"schools/" + school.SchoolID + "/" + slug}>{school.SchoolName}</Link>
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
            <span>
              Professional Educators Licensed:{" "}
              {(professionalLicense(school) * 100 ).toFixed(0)}%
            </span>{" "}
            <br />
            <span>
              Board Meeting Recordings Posted:{" "}
              {(recordings(school) * 100 ).toFixed(0)}%
            </span>{" "}
            <br />
            <span>
              Educator Licenses Expired:{" "}
              {(percentExpired(school) * 100 ).toFixed(0)}%
            </span>{" "}
            <br />
          </Popup>
        </Marker>
      )})}
      
    </Map>
  );
}

SchoolMap.propTypes = {
  schools: PropTypes.array.isRequired,
  zoom: PropTypes.number,
};

export default SchoolMap;
