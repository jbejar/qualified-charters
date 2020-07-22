import React, {useState} from 'react';
import PropTypes from 'prop-types'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReactGA from "react-ga";

const professionalLicense = s =>  (((s.licenseTypes["1"] || 0) + (s.licenseTypes["1 - Returning"] || 0) + (s.licenseTypes["2"] || 0) + (s.licenseTypes["3"] || 0) + (s.licenseTypes["Professional"] || 0)) / (s.licenseTypes.All || 0))
const recordings = s => s.pmn.haveRecordings / s.pmn.scheduled;
const percentExpired = s => ((s.licenseStatus["Expired"] || 0) / (s.licenseTypes.All || 0))
function SchoolFilter(props) {
    
    const [checked, setChecked] = useState({});
    const scoreThreshold = 45;
    const filter = () => {
        let schoolsDump = require("./../dump.json");
        props.setSchools(schoolsDump.filter(school => {
            let match = true;
            if(match && checked.math) {
                if(!school.scores["Mathematics"]) {
                    return false;
                }
                let score = parseFloat(school.scores["Mathematics"]["2019"]);
                match = score >= scoreThreshold;
            }
            if(match && checked.languageArts) {
                if(!school.scores["Language Arts"]) {
                    return false;
                }
                let score = parseFloat(school.scores["Language Arts"]["2019"]);
                match = score >= scoreThreshold;
            }
            if(match && checked.science) {
                if(!school.scores["Science"]) {
                    return false;
                }
                let score = parseFloat(school.scores["Science"]["2019"]);
                match = score >= scoreThreshold;
            }
            if(match && checked.professionalLicenses) {
                let score = professionalLicense(school);
                match = score >= .8;
            }
            if(match && checked.percentExpired) {
                let score = percentExpired(school);
                match = score < .1;
            }
            if(match && checked.recordings) {
                let score = recordings(school);
                match = score >= .8;
            }
            return match;
        }));
    }
    const onChange = evt => {
        const name = evt.target.name;
        ReactGA.event({
            category: 'Search',
            action: 'Filter',
            label: name
          });
        if(checked[name]) {
            checked[name] = false;
        } else {
            checked[name] = true;
        }
        setChecked(checked)
        filter();
    };
    return (
        <div>
            <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
        Filters
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="checkbox"
          label={scoreThreshold + "%+ Proficient Math"}
          name="math"
          id="formHorizontalRadios2"
          onChange={onChange}
        />
        <Form.Check
          type="checkbox"
          label={scoreThreshold + "%+ Proficient Language Arts"}
          name="languageArts"
          id="formHorizontalRadios3"
          onChange={onChange}
        />
        <Form.Check
          type="checkbox"
          label={scoreThreshold + "%+ Proficient Science"}
          name="science"
          id="formHorizontalRadios3"
          onChange={onChange}
        />
        <Form.Check
          type="checkbox"
          label="80%+ Professional Educator Licenses"
          name="professionalLicense"
          id="formHorizontalRadios1"
          onChange={onChange}
        />
        <Form.Check
          type="checkbox"
          label="80%+ Board Meeting Recordings Posted "
          name="recordings"
          id="formHorizontalRadios1"
          onChange={onChange}
        />
        <Form.Check
          type="checkbox"
          label="< 10% Professional Licenses Expired"
          name="percentExpired"
          id="formHorizontalRadios1"
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  </fieldset>
        </div>
    )
}

SchoolFilter.propTypes = {
    setSchools: PropTypes.func.isRequired
}

export default SchoolFilter

