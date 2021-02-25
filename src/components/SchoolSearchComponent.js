import React, { useState } from 'react';
import schools from './../dump.json';
import { PowerSelect } from 'react-power-select';
import 'react-power-select/dist/react-power-select.css';
import { Redirect } from "react-router-dom";
import ReactGA from "react-ga";

export default function SchoolSearchComponent() {
  const [school, setSchool] = useState();
  const onChange = ({option}) => {
    if(!option) {
      return;
    }
    setSchool(option);
    ReactGA.event({
      category: 'Search',
      action: 'By Name',
      label: option.SchoolName
    });
  };
  const slug = !school ? "" : school.SchoolName.trim().toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-').replaceAll('#', '').replace(/\./g, '');
  return (
    <div style={{width: 500}} className="md-4">
      {(school) &&
     (<Redirect to={ "/schools/" + school.SchoolID + "/" + slug}/>)}
         <PowerSelect
          options={schools}
          optionLabelPath="SchoolName"
          selected={school}
          onChange={onChange}
          placeholder="Search..."
          searchIndices={["SchoolName", "SchoolName2", "SchoolShort"]}
        />
    </div>
  );
}
