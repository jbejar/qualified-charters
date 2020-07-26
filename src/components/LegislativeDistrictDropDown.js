import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import schoolsDump from "./../dump.json";
import Form from "react-bootstrap/Form";
import { useLocation, useHistory } from "react-router-dom";

function LegislativeDistrictDropDown({setSchools}) {
    const { search } = useLocation();
    const history = useHistory();
    const value = (search && new URLSearchParams(search).get("district")) || "";
    useEffect(() => {
        const schools = schoolsDump.filter(s => {
            if(!value || value === "") {
                return true;
            }
            if(value.startsWith("sd")) {
                return parseInt(value.slice(2)) === s.UtahLeg.senate;
            }
            if(value.startsWith("hd")) {
                return parseInt(value.slice(2)) === s.UtahLeg.house;
            }
            return false;
        });
        setSchools(schools);
    },[setSchools, value]);
  
    const handleChange = (evt) => {
        history.push("?district=" + evt.target.value);
      };
    return (
        <Form>
        <Form.Group>
          <Form.Label>Legislative District</Form.Label>
          <Form.Control as="select" value={value} onChange={handleChange}>
            <option value="">All</option>
            {Array.from(Array(29).keys()).map((i) => (
              <option value={"sd" + (i + 1)}>
                {"Senate District " + (i + 1)}
              </option>
            ))}
            {Array.from(Array(75).keys()).map((i) => (
              <option value={"hd" + (i + 1)}>
                {"House District " + (i + 1)}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    )
}

LegislativeDistrictDropDown.propTypes = {
    setSchools: PropTypes.func.isRequired
}

export default LegislativeDistrictDropDown

