import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SchoolMap(props) {
const position = [props.schools[0].Lat, props.schools[0].Lng];
  return (
    <Map center={position} zoom={props.zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {props.schools.map( school => 
        <Marker position={[school.Lat, school.Lng]}>
            <Popup>
                <Link to={"schools/"+school.SchoolID}>{school.SchoolName}</Link><br/>
                
                {school.GradeLow} - {school.GradeHigh}<br/>
                
            </Popup>
        </Marker>
      )}
      
    </Map>
  );
}

SchoolMap.propTypes = {
  schools: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired
};

export default SchoolMap;
