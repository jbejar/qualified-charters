import React, { useState } from "react";
import SchoolMap from "../components/SchoolMap";
import SchoolTable from "../components/SchoolTable";
import LegislativeDistrictDropDown from "../components/LegislativeDistrictDropDown";
import LicenseComponent from "../components/LicenseComponent";
import NoticeHistogram from "../components/NoticeHistogram"

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function ReportsPage(props) {
  const [schools, setSchools] = useState([]);
  const recordings = (s) => s.pmn.haveRecordings / s.pmn.scheduled;
  const minutes = (s) => s.pmn.haveMinutes / s.pmn.scheduled;
  const properNotice = (s) => s.pmn.advanceNotice / s.pmn.scheduled;
  const recordingsSort = (s, t) =>
    recordings(t) + minutes(t) - recordings(s) - minutes(s);

  const licenseStatus = schools.reduce(
    (acc, s) => {
      Object.keys(acc).forEach((k) => {
        acc[k] += s.licenseStatus[k] || 0;
      });
      return acc;
    },
    {
      Expired: 0,
      New: 0,
      "No License": 0,
      Reinstated: 0,
      Renewed: 0,
      Student: 0,
      All: 0,
    }
  );
  const licenseTypes = schools.reduce(
    (acc, s) => {
      Object.keys(acc).forEach((k) => {
        acc[k] += s.licenseTypes[k] || 0;
      });
      return acc;
    },
    {
      "1": 0,
      "1 - Returning": 0,
      "2": 0,
      "3": 0,
      "Alt. Route to Licensure": 0,
      Associate: 0,
      "Level 1 APT": 0,
      "Level 1 LEA-Specific": 0,
      "Level 2 LEA-Specific": 0,
      "No License": 0,
      Professional: 0,
      Temporary: 0,
      All: 0,
    }
  );
  const summarySchool = {
    licenseTypes,
    licenseStatus,
  };

  return (
    <div className="container">
      <LegislativeDistrictDropDown setSchools={setSchools} />
      {schools && schools.length > 0 && (
        <SchoolMap
          recenter
          schools={schools}
          center={[schools[0].Lat, schools[0].Lng]}
        />
      )}

      <SchoolTable
        summary
        sort={recordingsSort}
        schools={schools}
        columns={[
          {
            name: "City",
            func: (s) => titleCase(s.City),
          },
          { name: "Recordings Avail", func: recordings, summary: true },
          { name: "Minutes Avail", func: minutes, summary: true },
          { name: "<= 24 hr notice", func: properNotice, summary: true },
        ]}
      />
      <NoticeHistogram schools={schools}/>
      <LicenseComponent school={summarySchool} />
    </div>
  );
}

export default ReportsPage;
